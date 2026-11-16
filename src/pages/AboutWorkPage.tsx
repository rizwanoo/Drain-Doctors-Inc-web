import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ArrowUpRight, Instagram, Phone, ShieldCheck} from 'lucide-react';
import {BUSINESS_INFO, PROJECT_GALLERY} from '../data/businessData';
import {useGsapScroll} from '../utils/useGsapScroll';
import ServiceRequestForm from '../components/ServiceRequestForm';

type WorkCategory = 'All Work' | 'Drain & Rooter' | 'Hydro Jetting' | 'Sewer & Camera';

const CATEGORIES: WorkCategory[] = [
  'All Work',
  'Drain & Rooter',
  'Hydro Jetting',
  'Sewer & Camera',
];

export default function AboutWorkPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const {hash} = useLocation();
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All Work');

  useGsapScroll(pageRef, []);

  useEffect(() => {
    document.title =
      'About & Our Work — Drain Doctors Inc. | CA License #1112197';
  }, []);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }, [hash]);

  const filteredGallery =
    activeCategory === 'All Work'
      ? PROJECT_GALLERY
      : PROJECT_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <div ref={pageRef} className="w-full overflow-x-hidden">
      {/* 1. CINEMATIC HERO — Authentic Spartan Soldier Hydro-Jetter Rig */}
      <section className="relative min-h-[76vh] flex items-end bg-[#17252F] overflow-hidden">
        <img
          src="/assets/images/drain-doctors/equipment/spartan-jetter-trailer.jpg"
          alt="Drain Doctors Inc. Spartan Soldier trailer-mounted hydro jetter displaying License #1112197"
          data-parallax
          className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#0B1823]/90 via-[#0B1823]/45 to-transparent"
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
            About Drain Doctors Inc. · {BUSINESS_INFO.baseCity}
          </p>
          <h1
            data-hero-reveal
            className="font-display font-extrabold text-white text-[clamp(2.4rem,5vw,4.3rem)] leading-[1.0] tracking-[-0.02em] max-w-3xl mb-5"
          >
            Family-owned drain specialists built on honest diagnostics.
          </h1>
          <p
            data-hero-reveal
            className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed mb-8"
          >
            We focus on resolving stubborn residential and commercial drainage issues
            across Southern California with commercial-grade equipment and clean
            workmanship.
          </p>
          <div data-hero-reveal className="flex flex-wrap items-center gap-8">
            <a href="#our-work" className="cta-borderless text-base text-[#D7F34A]">
              <span>EXPLORE PROJECT PHOTOGRAPHY</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </a>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="cta-borderless text-base text-white hover:text-[#00BDB5]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="tabular-nums">CALL {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY — Warm Ivory (#FFF8ED) */}
      <section className="bg-[#FFF8ED] text-[#30414B] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div data-reveal className="lg:col-span-6 min-h-[360px] lg:min-h-[480px]">
            <img
              src="/assets/images/drain-doctors/team/drain-doctors-technician-consultation.png"
              alt="Drain Doctors Inc. technician discussing drain diagnostics with homeowners"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div data-reveal className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-3">
                Our Approach
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.06] mb-6">
                Solutions designed to last — never a quick patch.
              </h2>
              <p className="text-base sm:text-lg text-[#30414B]/85 leading-relaxed mb-5">
                Drain Doctors Inc. is a family-owned and operated Southern California
                plumbing and drain company based in Lancaster, California. Whether we are
                clearing a kitchen sink trap, hydro jetting a commercial grease line, or
                running a Ridgid SeeSnake sewer camera through a residential lateral, our
                goal is straightforward: identify the exact cause of the backup and clear
                it cleanly.
              </p>
              <p className="text-base text-[#30414B]/80 leading-relaxed">
                We protect indoor floors with clean tarping, show customers what our
                diagnostics uncover, and serve homeowners, landlords, and property
                managers across the Antelope Valley, Santa Clarita Valley, and San
                Fernando Valley.
              </p>
            </div>

            <div className="pt-6 border-t border-[#30414B]/20 flex flex-wrap items-center gap-8">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-sm text-[#075BFF]"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>FOLLOW @DRAINDRINC</span>
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
        </div>
      </section>

      {/* 3. LICENSE & BRAND IDENTITY — Electric Blue (#075BFF) */}
      <section className="bg-[#075BFF] text-white py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div data-reveal className="lg:col-span-4 flex justify-start lg:justify-center">
            <img
              src={BUSINESS_INFO.logos.stacked}
              alt="Drain Doctors Inc. Official Shield Emblem and Wordmark"
              className="h-[220px] sm:h-[260px] w-auto object-contain drop-shadow-[0_6px_24px_rgba(255,255,255,0.45)]"
              loading="lazy"
            />
          </div>

          <div data-reveal className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[#D7F34A] mb-3">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-[0.12em] uppercase">
                Verified Contractor Credentials
              </span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.06] mb-5">
              California C-36 Plumbing Contractor — License #{BUSINESS_INFO.licenseNumber}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
              Drain Doctors Inc. operates under California Contractor License #1112197
              (C-36 Plumbing). Homeowners and property managers can verify current active
              license status directly on the official California Contractors State License
              Board (CSLB) portal at any time.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <a
                href={BUSINESS_INFO.cslbVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-borderless text-sm sm:text-base text-[#D7F34A]"
              >
                <span>VERIFY #1112197 AT CSLB.CA.GOV</span>
                <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                className="cta-borderless text-sm sm:text-base text-white"
              >
                <span>REQUEST LICENSED SERVICE</span>
                <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTHENTIC PROJECT GALLERY — Soft Mint (#E5F5EE) */}
      <section id="our-work" className="bg-[#E5F5EE] text-[#30414B] py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#30414B]/20">
            <div data-reveal>
              <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#00BDB5] mb-3">
                Authentic Field Photography
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.06]">
                Our Work in Action
              </h2>
            </div>

            {/* Interactive Category Filter Controls (Zero Pill Enclosure) */}
            <div
              role="tablist"
              aria-label="Filter project photographs by service category"
              className="flex flex-wrap items-center gap-6"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`bg-transparent border-none p-0 pb-2 text-sm font-semibold tracking-[0.04em] uppercase cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'text-[#075BFF] border-b-2 border-[#075BFF]'
                        : 'text-[#30414B]/65 hover:text-[#30414B]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open Borderless Editorial Gallery Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {filteredGallery.map((item, idx) => (
              <figure
                key={item.id}
                className={`${idx % 3 === 0 ? 'md:col-span-2 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center' : ''}`}
              >
                <div
                  className={`${
                    idx % 3 === 0 ? 'lg:col-span-7 aspect-[16/10]' : 'aspect-[16/10]'
                  } overflow-hidden bg-[#30414B]/10`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <figcaption
                  className={`${
                    idx % 3 === 0 ? 'lg:col-span-5 pt-5 lg:pt-0' : 'pt-4'
                  } border-b border-[#30414B]/20 pb-5`}
                >
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#075BFF]">
                    {item.category} · {item.locationLabel}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#30414B] mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#30414B]/80 leading-relaxed">
                    {item.summary}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EASY-TO-FIND BOOKING SECTION — Sky Blue (#E2F1FF) */}
      <section className="bg-[#E2F1FF] text-[#30414B] py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div data-reveal className="lg:col-span-4">
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-3">
              Book With Drain Doctors Inc.
            </span>
            <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.08] mb-5">
              Need a technician on site?
            </h2>
            <p className="text-base text-[#30414B]/80 leading-relaxed mb-6">
              Schedule drain cleaning, hydro jetting, or sewer camera diagnostics directly
              below, or call{' '}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="font-bold text-[#075BFF] underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
              .
            </p>
          </div>
          <div data-reveal className="lg:col-span-8">
            <ServiceRequestForm />
          </div>
        </div>
      </section>
    </div>
  );
}
