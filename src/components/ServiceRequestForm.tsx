import {useEffect, useState} from 'react';
import {AlertCircle, CheckCircle2, Phone} from 'lucide-react';
import {BUSINESS_INFO} from '../data/businessData';

interface FormValues {
  name: string;
  phone: string;
  email: string;
  serviceAddress: string;
  plumbingIssue: string;
  drainProblemType: string;
  preferredContactMethod: 'Phone Call' | 'Text Message' | 'Email';
  message: string;
  companyWebsite: string; // honeypot
}

interface ServiceRequestFormProps {
  defaultService?: string;
}

const PLUMBING_ISSUES = [
  'Drain Cleaning',
  'Rooter & Cable Clearing',
  'High-Pressure Hydro Jetting',
  'Sewer Camera Inspection',
  'Sewer Line Repair / Trenchless Replacement',
  'General Drain Consultation',
];

const DRAIN_PROBLEM_TYPES = [
  'Kitchen Sink / Disposal Drain',
  'Bathroom Sink, Tub or Shower Drain',
  'Main Sewer Line Backup',
  'Floor Drain / Commercial Drain',
  'Recurring Slow Drains',
  'Tree Root Intrusion / Suspected Pipe Damage',
];

export default function ServiceRequestForm({
  defaultService = 'Drain Cleaning',
}: ServiceRequestFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    serviceAddress: '',
    plumbingIssue: PLUMBING_ISSUES.includes(defaultService)
      ? defaultService
      : 'Drain Cleaning',
    drainProblemType: 'Main Sewer Line Backup',
    preferredContactMethod: 'Phone Call',
    message: '',
    companyWebsite: '',
  });

  const [csrfToken, setCsrfToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean;
    message: string;
    referenceId?: string;
    deliveryMode?: string;
  } | null>(null);

  const fetchToken = async () => {
    try {
      setTokenError('');
      const res = await fetch('/api/csrf-token', {cache: 'no-store'});
      if (!res.ok) {
        throw new Error('Unable to initialize form security token.');
      }
      const data = await res.json();
      setCsrfToken(data.token || '');
    } catch {
      setTokenError(
        'Security token could not be initialized. Please refresh or call (661) 874-6424 directly.',
      );
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (defaultService && PLUMBING_ISSUES.includes(defaultService)) {
      setValues((prev) => ({...prev, plumbingIssue: defaultService}));
    }
  }, [defaultService]);

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (values.name.trim().length < 2) {
      errors.name = 'Please enter your full name.';
    }
    if (values.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (values.serviceAddress.trim().length < 4) {
      errors.serviceAddress = 'Please enter your service street address or city.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...values,
          csrfToken,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitResult({
          ok: false,
          message:
            data.error ||
            'Unable to submit your request. Please call (661) 874-6424 directly.',
        });
        if (response.status === 403) {
          fetchToken();
        }
      } else {
        setSubmitResult({
          ok: true,
          message: data.message,
          referenceId: data.referenceId,
          deliveryMode: data.deliveryMode,
        });
        setValues((prev) => ({
          ...prev,
          name: '',
          phone: '',
          email: '',
          serviceAddress: '',
          message: '',
        }));
        fetchToken();
      }
    } catch {
      setSubmitResult({
        ok: false,
        message:
          'Network error while submitting your request. Please call (661) 874-6424 for immediate help.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    'w-full bg-transparent border-0 border-b-2 border-[#30414B]/30 focus:border-[#075BFF] py-3 px-0 text-base text-[#30414B] placeholder:text-[#30414B]/45 outline-none transition-colors rounded-none';
  const labelBase =
    'block font-sans text-xs font-semibold tracking-[0.06em] uppercase text-[#30414B] mb-1';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot field for bot deterrence */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) =>
            setValues({...values, companyWebsite: e.target.value})
          }
        />
      </div>

      {tokenError && (
        <div
          role="alert"
          className="py-3 border-b-2 border-[#FF795B] text-sm font-medium text-[#30414B] flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-[#FF795B] shrink-0" />
          <span>{tokenError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="dd-name" className={labelBase}>
            Customer Name *
          </label>
          <input
            id="dd-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => setValues({...values, name: e.target.value})}
            className={inputBase}
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs font-semibold text-[#C43E22]">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dd-phone" className={labelBase}>
            Phone Number *
          </label>
          <input
            id="dd-phone"
            name="phone"
            type="tel"
            required
            placeholder="(661) 555-0199"
            value={values.phone}
            onChange={(e) => setValues({...values, phone: e.target.value})}
            className={inputBase}
          />
          {fieldErrors.phone && (
            <p className="mt-1.5 text-xs font-semibold text-[#C43E22]">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="dd-email" className={labelBase}>
            Email Address *
          </label>
          <input
            id="dd-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues({...values, email: e.target.value})}
            className={inputBase}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs font-semibold text-[#C43E22]">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dd-address" className={labelBase}>
            Service Address or City *
          </label>
          <input
            id="dd-address"
            name="serviceAddress"
            type="text"
            required
            placeholder="Street address or city (e.g. Lancaster, CA)"
            value={values.serviceAddress}
            onChange={(e) =>
              setValues({...values, serviceAddress: e.target.value})
            }
            className={inputBase}
          />
          {fieldErrors.serviceAddress && (
            <p className="mt-1.5 text-xs font-semibold text-[#C43E22]">
              {fieldErrors.serviceAddress}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="dd-issue" className={labelBase}>
            Plumbing / Drain Service Needed *
          </label>
          <select
            id="dd-issue"
            name="plumbingIssue"
            value={values.plumbingIssue}
            onChange={(e) =>
              setValues({...values, plumbingIssue: e.target.value})
            }
            className={inputBase}
          >
            {PLUMBING_ISSUES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dd-problem" className={labelBase}>
            Type of Drain Problem *
          </label>
          <select
            id="dd-problem"
            name="drainProblemType"
            value={values.drainProblemType}
            onChange={(e) =>
              setValues({...values, drainProblemType: e.target.value})
            }
            className={inputBase}
          >
            {DRAIN_PROBLEM_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Borderless typographic preferred contact selector */}
      <div>
        <span className={labelBase}>Preferred Contact Method *</span>
        <div className="flex flex-wrap items-center gap-6 pt-2 border-b-2 border-[#30414B]/20 pb-3">
          {(['Phone Call', 'Text Message', 'Email'] as const).map((method) => {
            const active = values.preferredContactMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() =>
                  setValues({...values, preferredContactMethod: method})
                }
                aria-pressed={active}
                className={`bg-transparent border-none p-0 text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-[#075BFF] underline underline-offset-8 decoration-2'
                    : 'text-[#30414B]/65 hover:text-[#30414B]'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="dd-message" className={labelBase}>
          Additional Details
        </label>
        <textarea
          id="dd-message"
          name="message"
          rows={3}
          placeholder="Describe what you are experiencing (slow drains, gurgling, cleanout access, residential or commercial property)..."
          value={values.message}
          onChange={(e) => setValues({...values, message: e.target.value})}
          className={`${inputBase} resize-y`}
        />
      </div>

      {submitResult && (
        <div
          role={submitResult.ok ? 'status' : 'alert'}
          className={`py-4 border-t-2 border-b-2 ${
            submitResult.ok
              ? 'border-[#00BDB5] text-[#30414B]'
              : 'border-[#FF795B] text-[#30414B]'
          } flex items-start gap-3`}
        >
          {submitResult.ok ? (
            <CheckCircle2 className="w-5 h-5 text-[#00BDB5] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#FF795B] shrink-0 mt-0.5" />
          )}
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">{submitResult.message}</p>
            {submitResult.referenceId && (
              <p className="mt-1 text-xs text-[#30414B]/75 tabular-nums">
                Reference ID: {submitResult.referenceId}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="pt-2 flex flex-wrap items-center justify-between gap-6">
        <button
          type="submit"
          disabled={submitting || !csrfToken}
          className="cta-borderless text-base sm:text-lg text-[#075BFF] disabled:opacity-50"
        >
          <span>{submitting ? 'SENDING REQUEST...' : 'SUBMIT SERVICE REQUEST'}</span>
          <span className="cta-arrow" aria-hidden="true">→</span>
        </button>

        <a
          href={BUSINESS_INFO.phoneHref}
          className="cta-borderless text-sm text-[#30414B] hover:text-[#075BFF]"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>NEED IMMEDIATE DISPATCH? CALL {BUSINESS_INFO.phoneDisplay}</span>
        </a>
      </div>
    </form>
  );
}
