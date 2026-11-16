import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const CSRF_SECRET =
  process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex');

const INQUIRY_LOG_DIR = path.join(__dirname, 'data');
const INQUIRY_LOG_FILE = path.join(INQUIRY_LOG_DIR, 'inquiries.json');

// Simple in-memory rate limiting map (IP -> timestamps)
const submissionLog = new Map<string, number[]>();

function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function createCsrfToken(): string {
  const issuedAt = Date.now().toString(36);
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${issuedAt}.${nonce}`;
  const sig = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

function verifyCsrfToken(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }
  const [issuedAt, nonce, sig] = parts;
  const payload = `${issuedAt}.${nonce}`;
  const expectedSig = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(payload)
    .digest('hex');

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) {
    return false;
  }
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  const timestamp = parseInt(issuedAt, 36);
  if (Number.isNaN(timestamp)) {
    return false;
  }
  const ageMs = Date.now() - timestamp;
  // Valid for 4 hours, must be at least 1.5s old to deter instant bot posts
  return ageMs >= 1000 && ageMs <= 4 * 60 * 60 * 1000;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const entries = (submissionLog.get(ip) || []).filter(
    (ts) => now - ts < windowMs,
  );
  if (entries.length >= 6) {
    submissionLog.set(ip, entries);
    return true;
  }
  entries.push(now);
  submissionLog.set(ip, entries);
  return false;
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '32kb'}));

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({status: 'ok'});
  });

  app.get('/api/csrf-token', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({token: createCsrfToken()});
  });

  app.post('/api/contact', async (req, res) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        ok: false,
        error:
          'Too many service requests received from this connection. Please call (661) 874-6424 directly for immediate assistance.',
      });
    }

    const body = req.body ?? {};

    // Honeypot check
    if (typeof body.companyWebsite === 'string' && body.companyWebsite.trim() !== '') {
      return res.status(400).json({
        ok: false,
        error: 'Submission rejected by automated spam protection.',
      });
    }

    // CSRF validation
    const csrfToken = typeof body.csrfToken === 'string' ? body.csrfToken : '';
    if (!verifyCsrfToken(csrfToken)) {
      return res.status(403).json({
        ok: false,
        error:
          'Security verification expired or invalid. Please refresh the form token and try again.',
      });
    }

    const name = sanitizeText(body.name, 120);
    const phone = sanitizeText(body.phone, 40);
    const email = sanitizeText(body.email, 160);
    const serviceAddress = sanitizeText(body.serviceAddress, 240);
    const plumbingIssue = sanitizeText(body.plumbingIssue, 120);
    const drainProblemType = sanitizeText(body.drainProblemType, 120);
    const preferredContactMethod = sanitizeText(body.preferredContactMethod, 40);
    const message = sanitizeText(body.message, 2000);

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      fieldErrors.phone = 'Please enter a valid 10-digit US phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      fieldErrors.email = 'Please enter a valid email address.';
    }

    if (serviceAddress.length < 4) {
      fieldErrors.serviceAddress =
        'Please enter your service street address or city in Southern California.';
    }

    if (!plumbingIssue) {
      fieldErrors.plumbingIssue = 'Please select the primary plumbing or drain service needed.';
    }

    if (!drainProblemType) {
      fieldErrors.drainProblemType = 'Please select the type of drain issue.';
    }

    if (!['Phone Call', 'Text Message', 'Email'].includes(preferredContactMethod)) {
      fieldErrors.preferredContactMethod = 'Please choose a preferred contact method.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(422).json({
        ok: false,
        error: 'Please review the highlighted form fields.',
        fieldErrors,
      });
    }

    const inquiryRecord = {
      id: `DD-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      name,
      phone,
      email,
      serviceAddress,
      plumbingIssue,
      drainProblemType,
      preferredContactMethod,
      message,
    };

    // Persist locally in server-side data log
    try {
      fs.mkdirSync(INQUIRY_LOG_DIR, {recursive: true});
      const existing = fs.existsSync(INQUIRY_LOG_FILE)
        ? JSON.parse(fs.readFileSync(INQUIRY_LOG_FILE, 'utf-8'))
        : [];
      const list = Array.isArray(existing) ? existing : [];
      list.push(inquiryRecord);
      fs.writeFileSync(INQUIRY_LOG_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Failed to record inquiry locally:', fsErr);
    }

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim();

    if (smtpHost && smtpUser && smtpPass && recipient) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM?.trim() || smtpUser,
          to: recipient,
          replyTo: email,
          subject: `New Drain Service Request (${inquiryRecord.id}) — ${name}`,
          text: [
            `Reference: ${inquiryRecord.id}`,
            `Submitted: ${inquiryRecord.submittedAt}`,
            `Customer Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Service Location: ${serviceAddress}`,
            `Service Requested: ${plumbingIssue}`,
            `Drain Problem Type: ${drainProblemType}`,
            `Preferred Contact: ${preferredContactMethod}`,
            `Details: ${message || 'None provided'}`,
          ].join('\n'),
        });

        return res.status(200).json({
          ok: true,
          referenceId: inquiryRecord.id,
          deliveryMode: 'smtp',
          message:
            'Your service inquiry has been validated and transmitted to our dispatch inbox. For immediate help, call (661) 874-6424.',
        });
      } catch (mailErr) {
        console.error('SMTP delivery error:', mailErr);
        return res.status(502).json({
          ok: false,
          error:
            'We recorded your request locally, but outbound SMTP mail delivery encountered a server error. Please call (661) 874-6424 so our team can assist right away.',
        });
      }
    }

    return res.status(200).json({
      ok: true,
      referenceId: inquiryRecord.id,
      deliveryMode: 'recorded',
      message:
        'Your request has been validated and saved on our dispatch server (Reference ' +
        inquiryRecord.id +
        '). Outbound SMTP mail relay is not configured on this preview server—please call (661) 874-6424 directly if you need immediate dispatch.',
    });
  });

  if (!IS_PROD) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Drain Doctors Inc. server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
