import {Link} from 'react-router-dom';
import {ArrowUpRight, Instagram, Mail, MapPin, Phone, ShieldCheck} from 'lucide-react';
import {BUSINESS_INFO, SERVICES} from '../data/businessData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#30414B] text-white border-t-4 border-[#075BFF]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 border-b border-white/15">
          {/* Brand Column with Large Original Stacked Logo */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <Link to="/" aria-label="Drain Doctors Inc. Home" className="inline-block">
              <img
                src={BUSINESS_INFO.logos.stacked}
                alt="Drain Doctors Inc. Emblem and Wordmark"
                className="h-[132px] sm:h-[148px] w-auto object-contain drop-shadow-[0_2px_18px_rgba(255,255,255,0.45)]"
              />
            </Link>
            <p className="font-display text-xl font-bold text-[#D7F34A] tracking-tight">
              {BUSINESS_INFO.positioning}
            </p>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Residential and commercial drain cleaning, mechanical rooter clearing,
              high-pressure hydro jetting, sewer camera diagnostics, and sewer line repair
              serving Lancaster and Southern California.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h2 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-[#00BDB5] mb-2">
              Navigation
            </h2>
            <Link
              to="/"
              className="text-sm font-medium text-white/85 hover:text-[#D7F34A] transition-colors py-1"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium text-white/85 hover:text-[#D7F34A] transition-colors py-1"
            >
              Drain Services
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white/85 hover:text-[#D7F34A] transition-colors py-1"
            >
              About &amp; Our Work
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-white/85 hover:text-[#D7F34A] transition-colors py-1"
            >
              Contact &amp; Request Service
            </Link>
          </div>

          {/* Verified Services Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h2 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-[#00BDB5] mb-2">
              Core Specialties
            </h2>
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                to={`/services#${service.slug}`}
                className="text-sm font-medium text-white/85 hover:text-[#D7F34A] transition-colors py-1"
              >
                {service.shortTitle}
              </Link>
            ))}
          </div>

          {/* Direct Contact & License Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h2 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-[#00BDB5] mb-1">
              Direct Contact
            </h2>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2.5 text-lg font-bold text-[#D7F34A] hover:text-white transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              {BUSINESS_INFO.phoneDisplay}
            </a>

            <a
              href={BUSINESS_INFO.emailHref}
              className="inline-flex items-center gap-2.5 text-sm font-medium text-white/85 hover:text-white transition-colors break-all"
            >
              <Mail className="w-4 h-4 shrink-0 text-[#00BDB5]" aria-hidden="true" />
              {BUSINESS_INFO.email}
            </a>

            <div className="flex items-start gap-2.5 text-sm text-white/80">
              <MapPin className="w-4 h-4 shrink-0 text-[#FF795B] mt-0.5" aria-hidden="true" />
              <span>
                Lancaster, CA — Antelope Valley, Santa Clarita Valley &amp; San Fernando Valley
              </span>
            </div>

            <a
              href={BUSINESS_INFO.cslbVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-[#D7F34A] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#00BDB5]" aria-hidden="true" />
              <span>CA C-36 License #{BUSINESS_INFO.licenseNumber}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <div className="pt-2 flex items-center gap-6">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-xs text-white hover:text-[#D7F34A]"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                INSTAGRAM
              </a>
              <a
                href={BUSINESS_INFO.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-xs text-white hover:text-[#D7F34A]"
              >
                THREADS @DRAINDRINC
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright & Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/65">
          <p>
            © {currentYear} {BUSINESS_INFO.name} All rights reserved. California C-36 Plumbing Contractor #{BUSINESS_INFO.licenseNumber}.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Request Drain Service
            </Link>
            <a
              href={BUSINESS_INFO.cslbVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Verify License at CSLB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
