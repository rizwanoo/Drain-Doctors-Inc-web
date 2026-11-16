import {useEffect, useRef} from 'react';
import {useSearchParams} from 'react-router-dom';
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {BUSINESS_INFO} from '../data/businessData';
import {useGsapScroll} from '../utils/useGsapScroll';
import ServiceRequestForm from '../components/ServiceRequestForm';

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || 'Drain Cleaning';

  useGsapScroll(pageRef, []);

  useEffect(() => {
    document.title =
      'Contact & Request Service — Drain Doctors Inc. | (661) 874-6424';
  }, []);

  return (
    <div ref={pageRef} className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC CONTACT HERO */}
      <section className="relative min-h-[62vh] flex items-end bg-[#172631] overflow-hidden">
        <img
          src="/assets/images/drain-doctors/team/drain-doctors-technician-consultation.png"
          alt="Drain Doctors Inc. technician consulting with Southern California homeowners"
          data-parallax
          className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#0B1823]/92 via-[#0B1823]/55 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B1823]/45 to-transparent"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-16">
          <p
            data-hero-reveal
            className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#D7F34A] mb-3"
          >
            {BUSINESS_INFO.positioning} · CA License #{BUSINESS_INFO.licenseNumber}
          </p>
          <h1
            data-hero-reveal
            className="font-display font-extrabold text-white text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.0] tracking-[-0.02em] max-w-3xl mb-5"
          >
            Contact Drain Doctors Inc.
          </h1>
          <p
            data-hero-reveal
            className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed mb-8"
          >
            Call us directly for urgent drain backups or submit your service inquiry below
            for Lancaster, the Antelope Valley, Santa Clarita Valley, and San Fernando
            Valley.
          </p>
          <div data-hero-reveal>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="cta-borderless text-lg sm:text-xl text-[#D7F34A]"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span className="tabular-nums">CALL {BUSINESS_INFO.phoneDisplay}</span>
              <ArrowUpRight className="w-5 h-5 cta-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFO & BORDERLESS SERVICE REQUEST FORM — Warm Ivory (#FFF8ED) */}
      <section className="bg-[#FFF8ED] text-[#30414B] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          {/* Left Column: Verified Contact Details */}
          <div data-reveal className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-3">
                Direct Channels
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] mb-4">
                Talk directly with a local drain specialist.
              </h2>
              <p className="text-base text-[#30414B]/80 leading-relaxed">
                Reach out by phone, email, or through the service request form. We serve
                residential homes, landlords, property managers, and commercial properties.
              </p>
            </div>

            <div className="divide-y divide-[#30414B]/20 border-t border-b border-[#30414B]/20">
              <div className="py-5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#075BFF] block mb-1">
                  Telephone Dispatch
                </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 font-display text-2xl sm:text-3xl font-extrabold text-[#30414B] hover:text-[#075BFF] transition-colors tabular-nums"
                >
                  <Phone className="w-5 h-5 text-[#075BFF]" aria-hidden="true" />
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="py-5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#00BDB5] block mb-1">
                  Official Email
                </span>
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold text-[#30414B] hover:text-[#075BFF] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#00BDB5] shrink-0" aria-hidden="true" />
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="py-5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#FF795B] block mb-1">
                  Based In &amp; Service Territory
                </span>
                <div className="flex items-start gap-2.5 text-base font-medium text-[#30414B]">
                  <MapPin className="w-4 h-4 text-[#FF795B] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Lancaster, CA · Southern California</p>
                    <p className="text-sm text-[#30414B]/75 mt-1">
                      Serving Antelope Valley, Santa Clarita Valley &amp; San Fernando
                      Valley
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#075BFF] block mb-1">
                  Contractor License
                </span>
                <a
                  href={BUSINESS_INFO.cslbVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#30414B] hover:text-[#075BFF] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#075BFF]" aria-hidden="true" />
                  <span>CA C-36 Plumbing Contractor #{BUSINESS_INFO.licenseNumber}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-sm text-[#075BFF]"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>INSTAGRAM @DRAINDRINC</span>
                <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-sm text-[#30414B]"
              >
                <span>THREADS @DRAINDRINC</span>
                <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Borderless Underline Service Request Form */}
          <div data-reveal className="lg:col-span-7">
            <div className="pb-6 mb-8 border-b-2 border-[#30414B]">
              <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#FF795B] block mb-2">
                Service Inquiry Form
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#30414B]">
                Request Drain &amp; Sewer Service
              </h2>
            </div>

            <ServiceRequestForm defaultService={preselectedService} />
          </div>
        </div>
      </section>

      {/* 3. LANCASTER & SOCAL SERVICE AREA GOOGLE MAP — Sky Blue (#E2F1FF) */}
      <section className="bg-[#E2F1FF] text-[#30414B] py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#30414B]/20 mb-10">
            <div data-reveal>
              <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] block mb-2">
                Service Area Coverage
              </span>
              <h2 className="font-display font-bold text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.08]">
                Lancaster, CA &amp; Surrounding Southern California Valleys
              </h2>
            </div>

            <a
              href={BUSINESS_INFO.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-borderless text-sm text-[#075BFF]"
            >
              <span>OPEN LANCASTER AREA IN GOOGLE MAPS</span>
              <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
            </a>
          </div>

          <div data-reveal className="w-full h-[380px] sm:h-[440px] bg-[#30414B]/10">
            <iframe
              title="Drain Doctors Inc. Lancaster CA Service Area Map"
              src={BUSINESS_INFO.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
