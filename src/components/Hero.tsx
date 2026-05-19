import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutImage from '../assets/about.png';
import { Check } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '4%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const revealVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const
      } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] lg:min-h-[100vh] w-full overflow-hidden bg-pure-white pt-[90px] lg:pt-[110px] pb-12 lg:pb-20 flex items-center"
    >
      {/* Soft, Airy Premium Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pure-white via-soft-white to-light-blue/40"></div>
        
        {/* Large soft organic shape behind image to anchor it */}
        <div className="absolute top-[10%] right-[-10%] w-[60vw] h-[70vw] lg:w-[45vw] lg:h-[55vw] rounded-full bg-light-blue blur-[80px] opacity-70 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[0%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-sky-blue/10 blur-[90px] pointer-events-none"></div>
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="max-w-[1250px] mx-auto px-6 md:px-12 w-full h-full flex flex-col lg:flex-row items-center relative z-10"
      >
        {/* Left Typography Section - Clean, Calmer, More Breathing Space */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[48%] flex flex-col justify-center relative z-20 pt-10 lg:pt-0 pr-0 lg:pr-10"
        >
          
          {/* Top Label */}
          <motion.div variants={revealVariants} className="flex items-center gap-3 mb-5">
            <span className="px-3.5 py-1.5 rounded-full bg-light-blue border border-medical-blue/10 text-medical-blue text-[10px] font-bold uppercase tracking-widest">
              Consulting Physician & Diabetologist
            </span>
          </motion.div>

          {/* Main Professional Heading - Reduced weight, refined width */}
          <motion.h1 
            variants={revealVariants}
            className="text-[2rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.15] font-heading font-semibold text-dark-text mb-4 lg:mb-6 tracking-tight max-w-[480px]"
          >
            Modern Aesthetic Care Designed Around <span className="text-medical-blue">Natural Confidence</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={revealVariants}
            className="text-soft-gray text-[14px] md:text-[16px] leading-relaxed max-w-[440px] font-sans mb-8 lg:mb-10 font-normal"
          >
            Dr. Zubin Vaid combines advanced aesthetic expertise with personalized wellness care to create refined, natural-looking transformations in a professional clinical environment.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={revealVariants} className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-8 lg:mb-12">
            <button className="px-6 py-3 lg:px-8 lg:py-3.5 rounded-full bg-medical-blue text-white text-[13px] font-medium tracking-wide transition-all duration-300 shadow-[0_4px_14px_rgba(58,123,255,0.2)] hover:shadow-[0_6px_20px_rgba(58,123,255,0.3)] hover:-translate-y-0.5">
              Book Consultation
            </button>
            <button className="px-6 py-3 lg:px-8 lg:py-3.5 rounded-full border border-light-border bg-transparent text-dark-text text-[13px] font-medium tracking-wide transition-all duration-300 hover:bg-light-blue/50 hover:text-medical-blue hover:border-medical-blue/30">
              Explore Treatments
            </button>
          </motion.div>

          {/* Bottom Trust Info */}
          <motion.div variants={revealVariants} className="flex flex-wrap items-center gap-5 mt-auto pt-6 border-t border-light-border/60">
            {[
              'Personalized Wellness Care',
              'Advanced Expertise',
              'Trusted Clinical Experience'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-light-blue text-medical-blue">
                  <Check strokeWidth={3} className="w-[10px] h-[10px]" />
                </div>
                <span className="text-[12px] font-medium text-soft-gray">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Image Section - Naturally Blended, Lower Right Position */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-[52%] h-[40vh] md:h-[46vh] lg:h-[78vh] relative mt-10 lg:mt-0 flex items-end justify-center lg:justify-end pointer-events-none"
        >
          {/* Ambient blends keep the framed image integrated with the hero background */}
          <div className="pointer-events-none absolute right-[4%] top-[18%] h-[52%] w-[60%] rounded-full bg-medical-blue/14 blur-[86px]" />
          <div className="pointer-events-none absolute right-[22%] bottom-[14%] h-[34%] w-[42%] rounded-full bg-sky-blue/22 blur-[78px]" />
          <motion.div
            animate={{ y: [-6, 0, -6], x: [0, 3, 0], opacity: [0.55, 0.7, 0.55] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-[0%] top-[10%] h-24 w-24 rounded-full bg-light-blue/45 blur-[48px]"
          />
          <motion.div
            animate={{ y: [0, -5, 0], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="pointer-events-none absolute right-[46%] bottom-[8%] h-20 w-20 rounded-full bg-medical-blue/12 blur-[44px]"
          />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[84%] max-w-[460px] sm:max-w-[470px] md:max-w-[500px] lg:max-w-[470px] xl:max-w-[500px] max-h-[680px] translate-x-0 sm:translate-x-2 lg:translate-x-7 translate-y-4 lg:translate-y-10"
          >
            <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-medical-blue/16 via-sky-blue/12 to-transparent blur-[52px]" />
            <div className="pointer-events-none absolute -right-7 top-12 h-44 w-44 rounded-full bg-sky-blue/24 blur-[72px]" />
            <div className="pointer-events-none absolute -left-8 bottom-10 h-36 w-36 rounded-full bg-white/70 blur-[52px]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/95 bg-white/88 p-[5px] shadow-[0_30px_76px_rgba(29,78,216,0.18)]">
              <img
                src={aboutImage}
                alt="Dr. Zubin Vaid"
                className="h-[260px] w-full rounded-[1.7rem] object-contain object-center sm:h-[410px] md:h-[450px] lg:h-[500px]"
              />
              <div className="pointer-events-none absolute inset-[5px] rounded-[1.7rem] bg-gradient-to-tr from-white/20 via-transparent to-sky-blue/12" />
            </div>

            <div className="pointer-events-none absolute -bottom-8 left-[14%] h-16 w-[72%] rounded-full bg-medical-blue/20 blur-[30px]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
