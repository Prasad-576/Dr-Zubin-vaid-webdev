import { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '#' },
  { name: 'Patient Corner', href: '#' },
  { name: 'Testimonials', href: '#' },
  { name: 'Contact Us', href: '#contact' },
];

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => void;
};

type SidebarScrollItem = {
  label: string;
  kind: 'scroll';
  matchers?: readonly string[];
  targetId?: string;
};

type SidebarRouteItem = {
  label: string;
  kind: 'route';
  href: string;
  hash?: string;
};

const sidebarItems: readonly (SidebarScrollItem | SidebarRouteItem)[] = [
  { label: 'Philosophy', kind: 'scroll', matchers: ['why choose dr. zubin', 'personalized approach'] },
  { label: 'Field of Expertise', kind: 'scroll', matchers: ['fields of expertise'] },
  { label: 'Current Affiliations', kind: 'scroll', matchers: ['medical affiliations'] },
  { label: 'Contact Us', kind: 'scroll', targetId: 'contact' },
  { label: 'Past Affiliations', kind: 'route', href: '/about', hash: 'past-affiliations' },
  { label: 'Teaching Experience', kind: 'route', href: '/about', hash: 'teaching-experience' },
  { label: 'Awards and Distinctions', kind: 'route', href: '/about', hash: 'awards-and-distinctions' },
  { label: 'Association and Publications', kind: 'route', href: '/about', hash: 'association-and-publications' },
  { label: 'Extra Curricular Activity', kind: 'route', href: '/about', hash: 'extra-curricular-activity' },
] as const;

const sidebarContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}

function findSectionByMatchers(matchers: readonly string[]) {
  const sections = Array.from(document.querySelectorAll('section'));

  return (
    sections.find((section) => {
      const text = section.textContent?.toLowerCase() ?? '';
      return matchers.every((matcher) => text.includes(matcher));
    }) ||
    sections.find((section) => {
      const text = section.textContent?.toLowerCase() ?? '';
      return matchers.some((matcher) => text.includes(matcher));
    }) ||
    null
  );
}

function getNavbarOffset() {
  const navbar = document.getElementById('site-navbar');
  if (!navbar) return 96;
  return Math.ceil(navbar.getBoundingClientRect().bottom + 16);
}

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const offset = getNavbarOffset();
  const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -offset,
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Philosophy');
  const [cursorPosition, setCursorPosition] = useState({ x: 220, y: 220 });
  const [contactActive, setContactActive] = useState(false);
  const currentPath = normalizePath(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (currentPath === '/about') {
      setActiveItem((prev) => (prev === 'Philosophy' ? 'Past Affiliations' : prev));
    }
  }, [currentPath]);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (currentPath !== '/') {
      setContactActive(false);
      return;
    }

    const section = document.getElementById('contact');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: `-${getNavbarOffset()}px 0px -35% 0px`,
        threshold: 0.2,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [currentPath]);

  const handleNavLinkClick = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    if (href !== '#contact') return;

    event.preventDefault();

    if (currentPath !== '/') {
      window.location.assign('/#contact');
      return;
    }

    scrollToSection('contact');
  };

  const handleSidebarItemClick = (item: (typeof sidebarItems)[number]) => {
    setActiveItem(item.label);

    if (item.kind === 'scroll' && item.targetId) {
      if (currentPath !== '/') {
        window.location.assign(`/#${item.targetId}`);
      } else {
        scrollToSection(item.targetId);
      }
      setSidebarOpen(false);
      return;
    }

    if (item.kind === 'scroll' && item.matchers) {
      const target = findSectionByMatchers(item.matchers);
      if (target) {
        scrollToSection(target.id || '');
        if (!target.id) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setSidebarOpen(false);
      return;
    }

    if (item.kind === 'route' && item.href) {
      const destination = `${item.href}${item.hash ? `#${item.hash}` : ''}`;

      if (normalizePath(window.location.pathname) === normalizePath(item.href)) {
        const anchor = item.hash ? document.getElementById(item.hash) : null;
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setSidebarOpen(false);
        return;
      }

      window.location.assign(destination);
      return;
    }

    setSidebarOpen(false);
  };

  return (
    <>
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
      >
        <nav
          id="site-navbar"
          className={`transition-all duration-500 ease-in-out flex items-center justify-between px-4 md:px-8 ${
            scrolled 
              ? 'w-full max-w-[1050px] h-[60px] bg-white/70 backdrop-blur-md border border-light-border/50 rounded-full shadow-[0_4px_20px_rgba(30,58,95,0.04)]' 
              : 'w-full max-w-7xl h-[70px] bg-transparent'
          }`}
        >
          <div className="flex items-center gap-4 md:gap-5">
            <motion.button
              type="button"
              aria-label="Open sidebar menu"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSidebarOpen(true)}
              className="group relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-medical-blue/25 bg-white/75 text-medical-blue shadow-[0_12px_26px_rgba(58,123,255,0.16)] backdrop-blur-xl transition-all duration-500 hover:border-medical-blue/40 hover:shadow-[0_0_0_1px_rgba(58,123,255,0.2),0_16px_35px_rgba(58,123,255,0.28)]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/90 via-white/55 to-light-blue/40" />
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-medical-blue/25" />
              <Menu size={18} className="relative z-10" strokeWidth={2} />
            </motion.button>

            {/* Logo Area */}
            <div className="flex flex-col justify-center">
              <h1 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-dark-text leading-tight flex items-baseline">
                Dr. Zubin Vaid<span className="text-medical-blue ml-0.5 text-xl">.</span>
              </h1>
              <span className="text-[9px] md:text-[10px] font-sans text-soft-gray uppercase tracking-widest mt-0.5 font-medium">
                
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavLinkClick(event, link.href)}
                className={`text-[13px] font-medium transition-colors relative group py-2 ${
                  (currentPath === '/about' && link.name === 'About') || (contactActive && link.href === '#contact')
                    ? 'text-medical-blue'
                    : 'text-dark-text/70 hover:text-medical-blue'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-1 left-0 h-[1.5px] bg-medical-blue transition-all duration-300 rounded-full ${
                    (currentPath === '/about' && link.name === 'About') || (contactActive && link.href === '#contact')
                      ? 'w-full opacity-100 shadow-[0_0_10px_rgba(58,123,255,0.55)]'
                      : 'w-0 opacity-40 group-hover:w-full'
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:block">
            <button
              className="px-6 py-2 rounded-full bg-medical-blue text-white text-[12px] font-medium tracking-wide hover:bg-[#2A65E0] transition-all duration-300 shadow-[0_2px_10px_rgba(58,123,255,0.2)] hover:shadow-[0_4px_15px_rgba(58,123,255,0.3)] hover:-translate-y-0.5"
            >
              Book Consultation
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(7px)' }}
              exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-[#10203B]/35"
            />

            <motion.aside
              initial={{ x: '-102%', opacity: 0.8, filter: 'blur(10px)' }}
              animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ x: '-104%', opacity: 0.9, filter: 'blur(8px)', transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                setCursorPosition({
                  x: event.clientX - bounds.left,
                  y: event.clientY - bounds.top,
                });
              }}
              className="fixed left-0 top-0 z-[70] h-screen w-[85vw] sm:w-[22rem] md:w-[28rem] lg:w-[30rem] border-r border-white/65 bg-white/62 shadow-[0_28px_80px_rgba(16,42,88,0.22)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/62 to-[#F2F7FF]/75" />
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-medical-blue/20 blur-[90px]" />
                <motion.div
                  animate={{ x: [0, 36, 0], y: [0, -28, 0], opacity: [0.18, 0.32, 0.18] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-[24%] right-[-28%] h-[23rem] w-[23rem] rounded-full bg-sky-blue/20 blur-[120px]"
                />
                <motion.div
                  animate={{ x: [0, -26, 0], y: [0, 24, 0], opacity: [0.14, 0.28, 0.14] }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                  className="absolute bottom-[8%] left-[-16%] h-[18rem] w-[18rem] rounded-full bg-medical-blue/15 blur-[110px]"
                />
                <div
                  className="absolute inset-0 opacity-[0.1]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(58,123,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(58,123,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '34px 34px',
                  }}
                />
                <motion.div
                  aria-hidden
                  animate={{
                    x: cursorPosition.x - 260,
                    y: cursorPosition.y - 260,
                  }}
                  transition={{ type: 'spring', damping: 32, stiffness: 170, mass: 0.7 }}
                  className="absolute h-[32rem] w-[32rem] rounded-full bg-medical-blue/20 blur-[120px]"
                />
              </div>

              <div data-lenis-prevent className="premium-scrollbar relative z-10 flex h-full flex-col overflow-y-auto px-5 py-6 sm:px-8">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <h2
                      className="font-heading text-[1.75rem] font-semibold leading-tight text-[#11284A] sm:text-[2.3rem]"
                      style={{ textShadow: '0 6px 24px rgba(58,123,255,0.2)' }}
                    >
                      Dr. Zubin Vaid
                    </h2>
                    <div className="mt-3 h-px w-48 bg-gradient-to-r from-medical-blue/45 via-sky-blue/25 to-transparent" />
                  </div>
                  <button
                    type="button"
                    aria-label="Close sidebar menu"
                    onClick={() => setSidebarOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-medical-blue/20 bg-white/70 text-medical-blue shadow-[0_10px_24px_rgba(58,123,255,0.18)] transition-all duration-300 hover:bg-white hover:shadow-[0_16px_32px_rgba(58,123,255,0.28)]"
                  >
                    <X size={17} />
                  </button>
                </div>

                <motion.div
                  variants={sidebarContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-1 md:gap-2 pb-8"
                >
                  {sidebarItems.map((item) => {
                    const isActive = activeItem === item.label;

                    return (
                      <motion.button
                        key={item.label}
                        variants={sidebarItemVariants}
                        type="button"
                        onClick={() => handleSidebarItemClick(item)}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative flex w-full items-center rounded-2xl px-3 py-3 md:px-4 md:py-4 text-left font-heading text-[0.95rem] sm:text-[1.08rem] transition-all duration-500 ${
                          isActive
                            ? 'bg-white/70 text-[#0E2C57] shadow-[0_16px_34px_rgba(35,96,210,0.16)]'
                            : 'text-[#24436C]/86 hover:bg-white/58 hover:text-[#123866]'
                        }`}
                      >
                        <span className="pointer-events-none absolute left-2 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-medical-blue/85 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0 }} />
                        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-medical-blue/10 via-sky-blue/5 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="relative pl-4 tracking-[0.01em]">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
