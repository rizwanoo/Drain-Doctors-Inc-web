import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight, Phone, ShieldCheck} from 'lucide-react';
import {BUSINESS_INFO, PROJECT_GALLERY, SERVICES} from '../data/businessData';
import {useGsapScroll} from '../utils/useGsapScroll';
import ServiceRequestForm from '../components/ServiceRequestForm';

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScroll(pageRef, []);

  useEffect(() => {
    document.title =
      'Drain Doctors Inc. — Drain Cleaning & Rooter Services | Lancaster & SoCal';
  }, []);

  return (
    <div ref={pageRef} className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC FULL-BLEED HERO — Photograph extends cleanly behind transparent navbar */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-end bg-[#1B2B34] overflow-hidden">
        <img
          src="/assets/images/drain-doctors/sewer-and-drainage/hydro-jetting-operation.webp"
          alt="Drain Doctors Inc. technician operating a trailer-mounted high-pressure hydro-jetter"
          data-parallax
          className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-center"
        />

        {/* Measured bottom-left scrim for crisp 4.5:1 typography legibility without darkening the full header */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#0E1E2B]/90 via-[#0E1E2B]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0E1E2B]/45 to-transparent"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-16 lg:pb-24">
          <div className="max-w-3xl">
            <p
              data-hero-reveal
              className="font-sans text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#D7F34A] mb-4"
            >
              {BUSINESS_INFO.positioning} · CA License #{BUSINESS_INFO.licenseNumber}
            </p>

            <h1
              data-hero-reveal
              className="font-display font-extrabold text-white text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[0.98] tracking-[-0.02em] mb-6"
            >
              Drain problems?
              <br />
              We know the way through.
            </h1>

            <p
              data-hero-reveal
              className="font-sans text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mb-10"
            >
              Professional drain cleaning, mechanical rooter clearing, high-pressure hydro
              jetting, and sewer camera diagnostics across Lancaster and Southern California.
            </p>

            <div
              data-hero-reveal
              className="flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <a
                href="#home-request-service"
                className="cta-borderless text-base sm:text-lg text-[#D7F34A]"
              >
                <span>REQUEST SERVICE</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </a>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="cta-borderless text-base sm:text-lg text-white hover:text-[#00BDB5]"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">CALL {BUSINESS_INFO.phoneDisplay}</span>
                <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION — Warm Ivory (#FFF8ED) Asymmetric Editorial Split */}
      <section className="bg-[#FFF8ED] text-[#30414B] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div
            data-reveal
            className="lg:col-span-6 flex flex-col justify-between gap-8"
          >
            <div>
              <span className="inline-block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-4">
                Lancaster &amp; Southern California
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06] tracking-[-0.015em] text-[#30414B] mb-6">
                A clogged drain is a symptom. We find and clear the root cause.
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#30414B]/85 leading-relaxed mb-5">
                When residential sinks, main building drains, or commercial sewer lines slow
                down or back up, temporary chemical pours rarely solve the underlying
                obstruction. Drain Doctors Inc. focuses on doing the job thoroughly from
                cleanout entry to final flow check.
              </p>
              <p className="font-sans text-base text-[#30414B]/80 leading-relaxed">
                Serving homeowners, landlords, property managers, and commercial facilities
                throughout Lancaster, the Antelope Valley, Santa Clarita Valley, and San
                Fernando Valley.
              </p>
            </div>

            <div className="pt-6 border-t border-[#30414B]/20 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#30414B]">
                <ShieldCheck className="w-5 h-5 text-[#075BFF] shrink-0" aria-hidden="true" />
                <span>
                  {BUSINESS_INFO.licenseClassification} · #{BUSINESS_INFO.licenseNumber}
                </span>
              </div>
              <Link
                to="/about"
                className="cta-borderless text-sm text-[#075BFF]"
              >
                <span>ABOUT DRAIN DOCTORS</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div data-reveal className="lg:col-span-6 min-h-[360px] lg:min-h-[520px]">
            <img
              src="/assets/images/drain-doctors/team/drain-doctors-technician-consultation.png"
              alt="Drain Doctors Inc. technician speaking with homeowners at their front door"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 3. CORE DRAIN & ROOTER EXPERTISE — Electric Blue (#075BFF) Editorial List + Cleanout Photo */}
      <section className="bg-[#075BFF] text-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-12 border-b border-white/25">
            <div data-reveal className="lg:col-span-7">
              <span className="inline-block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#D7F34A] mb-3">
                Verified Drain &amp; Sewer Capabilities
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.04] tracking-[-0.015em] text-white">
                Precision clearing, diagnostics, and line restoration.
              </h2>
            </div>
            <div data-reveal className="lg:col-span-5 lg:text-right">
              <Link
                to="/services"
                className="cta-borderless text-sm sm:text-base text-[#D7F34A]"
              >
                <span>EXPLORE ALL SERVICES</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-14 items-stretch">
            <div data-reveal className="lg:col-span-5 min-h-[340px] lg:min-h-[540px]">
              <img
                src="/assets/images/drain-doctors/drain-cleaning/cast-iron-cleanout-rooter.jpg"
                alt="Mechanical rooter cable clearing a cast-iron drain cleanout"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div data-stagger-list className="lg:col-span-7 flex flex-col divide-y divide-white/25">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  data-stagger-row
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#D7F34A] tabular-nums shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D7F34A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/services#${service.slug}`}
                    className="cta-borderless text-xs text-white hover:text-[#D7F34A] self-start sm:self-center shrink-0"
                  >
                    <span>DETAILS</span>
                    <span className="cta-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTHENTIC FIELD WORK GALLERY — Soft Mint (#E5F5EE) Open Asymmetric Layout */}
      <section className="bg-[#E5F5EE] text-[#30414B] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#30414B]/20">
            <div data-reveal className="max-w-2xl">
              <span className="inline-block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#00BDB5] mb-3">
                Authentic Company Equipment &amp; Jobsite Work
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06] text-[#30414B]">
                Real tools, clean workspaces, documented diagnostics.
              </h2>
            </div>

            <Link
              to="/about#our-work"
              className="cta-borderless text-sm text-[#075BFF]"
            >
              <span>VIEW OUR WORK</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Open borderless asymmetric visual grid — zero rounded corners or boxes */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <figure data-reveal className="lg:col-span-7">
              <div className="overflow-hidden aspect-[4/3] bg-[#30414B]/10">
                <img
                  src={PROJECT_GALLERY[0].image}
                  alt={PROJECT_GALLERY[0].alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <figcaption className="pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#30414B]/15 pb-4">
                <div>
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#075BFF]">
                    {PROJECT_GALLERY[0].category} · {PROJECT_GALLERY[0].locationLabel}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#30414B] mt-1">
                    {PROJECT_GALLERY[0].title}
                  </h3>
                </div>
                <p className="text-sm text-[#30414B]/80 max-w-sm">
                  {PROJECT_GALLERY[0].summary}
                </p>
              </figcaption>
            </figure>

            <div className="lg:col-span-5 flex flex-col gap-12">
              <figure data-reveal>
                <div className="overflow-hidden aspect-[16/10] bg-[#30414B]/10">
                  <img
                    src={PROJECT_GALLERY[3].image}
                    alt={PROJECT_GALLERY[3].alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="pt-3 border-b border-[#30414B]/15 pb-4">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#00BDB5]">
                    {PROJECT_GALLERY[3].category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#30414B] mt-1">
                    {PROJECT_GALLERY[3].title}
                  </h3>
                  <p className="text-sm text-[#30414B]/80 mt-1">
                    {PROJECT_GALLERY[3].summary}
                  </p>
                </figcaption>
              </figure>

              <figure data-reveal>
                <div className="overflow-hidden aspect-[16/10] bg-[#30414B]/10">
                  <img
                    src={PROJECT_GALLERY[5].image}
                    alt={PROJECT_GALLERY[5].alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="pt-3 border-b border-[#30414B]/15 pb-4">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#FF795B]">
                    {PROJECT_GALLERY[5].category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#30414B] mt-1">
                    {PROJECT_GALLERY[5].title}
                  </h3>
                  <p className="text-sm text-[#30414B]/80 mt-1">
                    {PROJECT_GALLERY[5].summary}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE DRAIN DOCTORS + SERVICE AREA — Sky Blue (#E2F1FF) */}
      <section className="bg-[#E2F1FF] text-[#30414B] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div data-reveal className="lg:col-span-5">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-3">
              Why Southern California Calls Us
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] text-[#30414B] mb-6">
              Licensed workmanship with clear answers at every step.
            </h2>
            <p className="text-base text-[#30414B]/85 leading-relaxed mb-8">
              Based in Lancaster, CA, Drain Doctors Inc. dispatches across the Antelope
              Valley, Santa Clarita Valley, and San Fernando Valley for residential
              homeowners, landlords, and commercial properties.
            </p>

            <div className="border-t border-[#30414B]/20 pt-6">
              <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#075BFF] mb-3">
                Verified Service Corridors
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-semibold text-[#30414B]">
                {BUSINESS_INFO.serviceAreas.map((area) => (
                  <span key={area} className="border-b border-[#30414B]/15 pb-2">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            data-stagger-list
            className="lg:col-span-7 divide-y divide-[#30414B]/20 border-t border-b border-[#30414B]/20"
          >
            <div data-stagger-row className="py-7">
              <h3 className="font-display text-2xl font-bold text-[#30414B] mb-2">
                01. Root-Cause Drain Diagnostics
              </h3>
              <p className="text-base text-[#30414B]/80 leading-relaxed">
                Instead of simply poking a hole through a blockage, we assess line layout,
                cleanout access, and video inspection findings to help stop repeat backups.
              </p>
            </div>
            <div data-stagger-row className="py-7">
              <h3 className="font-display text-2xl font-bold text-[#30414B] mb-2">
                02. Mechanical Rooter &amp; High-Pressure Hydro Jetting
              </h3>
              <p className="text-base text-[#30414B]/80 leading-relaxed">
                From heavy-duty drum cable clearing to our trailer-mounted Spartan hydro
                jetter, we match the equipment to your pipe material and clog severity.
              </p>
            </div>
            <div data-stagger-row className="py-7">
              <h3 className="font-display text-2xl font-bold text-[#30414B] mb-2">
                03. California C-36 Licensed Contractor (#1112197)
              </h3>
              <p className="text-base text-[#30414B]/80 leading-relaxed">
                Work is performed under active C-36 Plumbing Contractor classification
                standards, with clean drop-cloth protection and transparent communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VIBRANT AQUA DIRECT CONVERSION BAND (#00BDB5) */}
      <section className="flow-motion-band bg-gradient-to-r from-[#00BDB5] via-[#05A8B8] to-[#075BFF] text-white py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div data-reveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#D7F34A] mb-2">
              Direct Dispatch · Lancaster &amp; SoCal
            </p>
            <h2 className="font-display font-extrabold text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.08]">
              Backed-up drain or sewer line? Speak directly with Drain Doctors Inc.
            </h2>
          </div>

          <div data-reveal className="flex flex-wrap items-center gap-8 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="cta-borderless text-lg sm:text-xl text-[#D7F34A]"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span className="tabular-nums">CALL {BUSINESS_INFO.phoneDisplay}</span>
              <ArrowUpRight className="w-5 h-5 cta-arrow" aria-hidden="true" />
            </a>
            <Link
              to="/contact"
              className="cta-borderless text-base text-white"
            >
              <span>FULL CONTACT PAGE</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. INLINE EASY-TO-FIND BOOKING FORM — Warm Ivory (#FFF8ED) */}
      <section
        id="home-request-service"
        className="bg-[#FFF8ED] text-[#30414B] py-20 lg:py-28"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div data-reveal className="lg:col-span-4">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.12em] uppercase text-[#FF795B] mb-3">
              Request Service Online
            </span>
            <h2 className="font-display font-bold text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] text-[#30414B] mb-5">
              Book drain or sewer service in minutes.
            </h2>
            <p className="text-base text-[#30414B]/80 leading-relaxed mb-8">
              Tell us what is backing up and where your property is located in Southern
              California. Prefer to speak right now? Call{' '}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="font-bold text-[#075BFF] underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
              .
            </p>
            <div className="border-t border-[#30414B]/20 pt-5 space-y-2 text-sm text-[#30414B]/80">
              <p className="font-semibold text-[#30414B]">
                {BUSINESS_INFO.name}
              </p>
              <p>CA License #{BUSINESS_INFO.licenseNumber} (C-36 Plumbing)</p>
              <p>{BUSINESS_INFO.baseCity} · Southern California</p>
            </div>
          </div>

          <div data-reveal className="lg:col-span-8">
            <ServiceRequestForm />
          </div>
        </div>
      </section>
    </div>
  );
}
