import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    const getNavbarOffset = () => {
      const navbar = document.getElementById('site-navbar');
      if (!navbar) return 96;
      return Math.ceil(navbar.getBoundingClientRect().bottom + 16);
    };

    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      lenis.scrollTo(target, {
        offset: -getNavbarOffset(),
        duration: 1.35,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
