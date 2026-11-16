import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll(scopeRef: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Hero entrance animations (above the fold, immediate)
      const heroItems = scope.querySelectorAll('[data-hero-reveal]');
      if (heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          {y: 28, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform',
          },
        );
      }

      // Subtle background parallax on hero & full-bleed photos
      const parallaxItems = scope.querySelectorAll('[data-parallax]');
      parallaxItems.forEach((el) => {
        gsap.to(el, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });

      // Editorial section reveals
      const revealItems = scope.querySelectorAll('[data-reveal]');
      revealItems.forEach((el) => {
        gsap.fromTo(
          el,
          {y: 32, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });

      // Line-by-line hairline list stagger
      const listContainers = scope.querySelectorAll('[data-stagger-list]');
      listContainers.forEach((container) => {
        const rows = container.querySelectorAll('[data-stagger-row]');
        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            {y: 20, opacity: 0},
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                once: true,
              },
            },
          );
        }
      });
    }, scope);

    return () => {
      ctx.revert();
    };
  }, deps);
}
