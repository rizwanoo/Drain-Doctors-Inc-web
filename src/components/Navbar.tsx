import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ArrowUpRight, ChevronDown, Menu, Phone, X} from 'lucide-react';
import {BUSINESS_INFO, SERVICES} from '../data/businessData';

export default function Navbar() {
  const {pathname} = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const openDropdown = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 140);
  };

  const navLinkBase =
    'relative py-2 text-[13px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200';
  const textClass = scrolled
    ? 'text-[#30414B] hover:text-[#075BFF]'
    : 'text-white hover:text-[#D7F34A] [text-shadow:0_1px_10px_rgba(15,23,42,0.75)]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#30414B]/15 py-2'
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Large Original Drain Doctors Inc. Logo */}
        <Link
          to="/"
          aria-label="Drain Doctors Inc. Home"
          className="shrink-0 flex items-center focus-visible:outline-2"
        >
          <img
            src={BUSINESS_INFO.logos.horizontal}
            alt="Drain Doctors Inc. Official Logo"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled
                ? 'h-[62px] sm:h-[72px] lg:h-[80px]'
                : 'h-[68px] sm:h-[82px] lg:h-[94px] drop-shadow-[0_2px_18px_rgba(255,255,255,0.82)]'
            }`}
          />
        </Link>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          <Link
            to="/"
            className={`${navLinkBase} ${textClass} ${
              pathname === '/' ? 'underline underline-offset-8 decoration-2' : ''
            }`}
          >
            HOME
          </Link>

          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <div className="flex items-center gap-1">
              <Link
                to="/services"
                className={`${navLinkBase} ${textClass} flex items-center gap-1.5 ${
                  pathname === '/services'
                    ? 'underline underline-offset-8 decoration-2'
                    : ''
                }`}
                aria-expanded={servicesOpen}
              >
                DRAIN SERVICES
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Seamless hover bridge submenu with sharp architectural geometry */}
            {servicesOpen && (
              <div
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
                className="absolute left-0 top-full pt-2 w-[320px] z-50"
              >
                <div className="bg-[#FFF8ED] border-t-2 border-[#075BFF] shadow-xl py-4 px-5 flex flex-col">
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#075BFF] pb-2 border-b border-[#30414B]/15">
                    Verified Drain &amp; Sewer Services
                  </span>
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services#${service.slug}`}
                      className="py-2.5 border-b border-[#30414B]/10 last:border-b-0 flex items-baseline justify-between gap-3 text-sm font-semibold text-[#30414B] hover:text-[#075BFF] transition-colors"
                    >
                      <span>{service.shortTitle}</span>
                      <span className="text-xs font-medium text-[#00BDB5] tabular-nums">
                        {service.number}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`${navLinkBase} ${textClass} ${
              pathname === '/about'
                ? 'underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            ABOUT
          </Link>

          <Link
            to="/about#our-work"
            className={`${navLinkBase} ${textClass}`}
          >
            OUR WORK
          </Link>

          <Link
            to="/contact"
            className={`${navLinkBase} ${textClass} ${
              pathname === '/contact'
                ? 'underline underline-offset-8 decoration-2'
                : ''
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Zone 3: Single Primary Borderless Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-5 shrink-0">
          <a
            href={BUSINESS_INFO.phoneHref}
            className={`hidden sm:inline-flex cta-borderless text-[13px] tracking-[0.05em] ${
              scrolled
                ? 'text-[#075BFF]'
                : 'text-[#D7F34A] [text-shadow:0_1px_10px_rgba(15,23,42,0.85)]'
            }`}
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
            <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden p-2 border-none bg-transparent cursor-pointer ${
              scrolled ? 'text-[#30414B]' : 'text-white'
            }`}
          >
            {mobileOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Full-width Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFF8ED] border-t border-[#30414B]/15 px-6 py-8">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-[#30414B]/15"
          >
            <Link
              to="/"
              className="py-4 font-display text-2xl font-bold text-[#30414B] hover:text-[#075BFF]"
            >
              HOME
            </Link>
            <Link
              to="/services"
              className="py-4 font-display text-2xl font-bold text-[#30414B] hover:text-[#075BFF]"
            >
              DRAIN SERVICES
            </Link>
            <Link
              to="/about"
              className="py-4 font-display text-2xl font-bold text-[#30414B] hover:text-[#075BFF]"
            >
              ABOUT
            </Link>
            <Link
              to="/about#our-work"
              className="py-4 font-display text-2xl font-bold text-[#30414B] hover:text-[#075BFF]"
            >
              OUR WORK
            </Link>
            <Link
              to="/contact"
              className="py-4 font-display text-2xl font-bold text-[#30414B] hover:text-[#075BFF]"
            >
              CONTACT
            </Link>
          </nav>

          <div className="mt-6 pt-6 border-t border-[#30414B]/20 flex flex-col gap-4">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="cta-borderless text-base text-[#075BFF] w-fit"
            >
              CALL {BUSINESS_INFO.phoneDisplay}
              <ArrowUpRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
            </a>
            <Link
              to="/contact"
              className="cta-borderless text-base text-[#30414B] w-fit"
            >
              REQUEST DRAIN SERVICE
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
