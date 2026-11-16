import {useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ArrowUpRight, Phone} from 'lucide-react';
import {BUSINESS_INFO, SERVICES} from '../data/businessData';
import {useGsapScroll} from '../utils/useGsapScroll';
import ServiceRequestForm from '../components/ServiceRequestForm';

const THEME_CLASSES: Record<
  (typeof SERVICES)[number]['themeBg'],
  {bg: string; text: string; muted: string; accent: string; border: string; cta: string}
> = {
  ivory: {
    bg: 'bg-[#FFF8ED]',
    text: 'text-[#30414B]',
    muted: 'text-[#30414B]/80',
    accent: 'text-[#075BFF]',
    border: 'border-[#30414B]/20',
    cta: 'text-[#075BFF]',
  },
  sky: {
    bg: 'bg-[#E2F1FF]',
    text: 'text-[#30414B]',
    muted: 'text-[#30414B]/80',
    accent: 'text-[#075BFF]',
    border: 'border-[#30414B]/20',
    cta: 'text-[#075BFF]',
  },
  blue: {
    bg: 'bg-[#075BFF]',
    text: 'text-white',
    muted: 'text-white/85',
    accent: 'text-[#D7F34A]',
    border: 'border-white/25',
    cta: 'text-[#D7F34A]',
  },
  mint: {
    bg: 'bg-[#E5F5EE]',
    text: 'text-[#30414B]',
    muted: 'text-[#30414B]/80',
    accent: 'text-[#00BDB5]',
    border: 'border-[#30414B]/20',
    cta: 'text-[#075BFF]',
  },
  aqua: {
    bg: 'bg-[#00BDB5]',
    text: 'text-[#0E2430]',
    muted: 'text-[#0E2430]/85',
    accent: 'text-[#FFF8ED]',
    border: 'border-[#0E2430]/20',
    cta: 'text-[#0E2430]',
  },
};

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const {hash} = useLocation();
  useGsapScroll(pageRef, []);

  useEffect(() => {
    document.title =
      'Drain & Sewer Services — Drain Cleaning, Rooter & Hydro Jetting | Drain Doctors Inc.';
  }, []);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }, [hash]);

  return (
    <div ref={pageRef} className="w-full overflow-x-hidden">
      {/* Cinematic Services Hero */}
      <section className="relative min-h-[72vh] flex items-end bg-[#182732] overflow-hidden">
        <img
          src="/assets/images/drain-doctors/drain-cleaning/cast-iron-cleanout-rooter.jpg"
          alt="Mechanical drain cleaning cable entering a residential cast-iron cleanout"
          data-parallax
          className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0D1C28]/90 via-[#0D1C28]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D1C28]/45 to-transparent"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-16">
          <p
            data-hero-reveal
            className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#D7F34A] mb-3"
          >
            {BUSINESS_INFO.positioning}
          </p>
          <h1
            data-hero-reveal
            className="font-display font-extrabold text-white text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.0] tracking-[-0.02em] max-w-3xl mb-5"
          >
            Drain cleaning, rooter clearing, hydro jetting &amp; sewer solutions.
          </h1>
          <p
            data-hero-reveal
            className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed mb-8"
          >
            Every service listed here reflects Drain Doctors Inc.’s verified field
            specialties in Lancaster, Antelope Valley, Santa Clarita Valley, and San
            Fernando Valley.
          </p>

          {/* Horizontal in-page quick jump links */}
          <div
            data-hero-reveal
            className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-white/25"
          >
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="text-xs sm:text-sm font-semibold tracking-[0.06em] uppercase text-white hover:text-[#D7F34A] transition-colors whitespace-nowrap"
              >
                {s.number}. {s.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Full-Width Editorial Service Bands — Each with Unique Composition */}
      {SERVICES.map((service, index) => {
        const theme = THEME_CLASSES[service.themeBg];
        const imageFirst = index % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.slug}
            className={`${theme.bg} ${theme.text} py-20 lg:py-28 scroll-mt-24`}
          >
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Copy Column */}
                <div
                  data-reveal
                  className={`lg:col-span-6 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className={`font-display text-4xl sm:text-5xl font-extrabold tabular-nums ${theme.accent}`}
                    >
                      {service.number}
                    </span>
                    <span
                      className={`text-xs font-semibold tracking-[0.12em] uppercase ${theme.accent}`}
                    >
                      Verified Specialty
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-[clamp(2rem,3.4vw,3.15rem)] leading-[1.06] tracking-[-0.015em] mb-5">
                    {service.title}
                  </h2>

                  <p className={`text-base sm:text-lg leading-relaxed mb-8 ${theme.muted}`}>
                    {service.description}
                  </p>

                  <ul
                    className={`divide-y ${theme.border} border-t border-b mb-10`}
                  >
                    {service.highlights.map((point) => (
                      <li
                        key={point}
                        className="py-3.5 text-sm sm:text-base font-medium"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-8">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.shortTitle)}`}
                      className={`cta-borderless text-sm sm:text-base ${theme.cta}`}
                    >
                      <span>REQUEST {service.shortTitle.toUpperCase()}</span>
                      <span className="cta-arrow" aria-hidden="true">→</span>
                    </Link>

                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className={`cta-borderless text-sm ${theme.text}`}
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-nums">CALL {BUSINESS_INFO.phoneDisplay}</span>
                      <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Editorial Multi-Photo Asymmetric Column */}
                <div
                  data-reveal
                  className={`lg:col-span-6 ${
                    imageFirst ? 'lg:order-1' : 'lg:order-2'
                  } flex flex-col gap-6`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={service.primaryImage}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  {service.secondaryImage && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-7 aspect-[16/10] overflow-hidden">
                        <img
                          src={service.secondaryImage}
                          alt={service.secondaryImageAlt || service.imageAlt}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <p className={`sm:col-span-5 text-xs sm:text-sm leading-relaxed ${theme.muted}`}>
                        {service.secondaryImageAlt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Booking Section on Services Page */}
      <section className="bg-[#FFF8ED] text-[#30414B] py-20 lg:py-24 border-t border-[#30414B]/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div data-reveal className="lg:col-span-4">
            <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#075BFF] mb-3">
              Schedule Dispatch
            </span>
            <h2 className="font-display font-bold text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.08] mb-5">
              Ready to clear your line?
            </h2>
            <p className="text-base text-[#30414B]/80 leading-relaxed mb-6">
              Submit your drain or sewer issue below or call{' '}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="font-bold text-[#075BFF] underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>{' '}
              for immediate dispatch across Lancaster and Southern California.
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
