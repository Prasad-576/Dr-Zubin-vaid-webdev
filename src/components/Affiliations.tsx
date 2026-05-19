import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const affiliations = [
  "Nanavati Multispeciality Hospital",
  "BSES MG Global Hospital, Andheri W",
  "Arogya Nidhi Hospital",
  "Criticare Hospital and Research Centre (West and East)",
  "Sujay Hospital",
  "KLS Memorial Hospital",
  "Advance Hospital"
];

// Duplicate the array to ensure seamless infinite marquee looping
const repeatedAffiliations = [...affiliations, ...affiliations, ...affiliations];

export default function Affiliations() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 1, ease: "easeOut" as const } 
    }
  };

  return (
    <section className="relative w-full py-16 md:py-28 lg:py-36 overflow-hidden bg-pure-white z-10">
      {/* Immersive Premium Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-[#F4F9FF] to-soft-white"></div>
        
        {/* Low opacity medical grid pattern */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#3A7BFF 1px, transparent 1px), linear-gradient(90deg, #3A7BFF 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        {/* Floating Ambient Elements */}
        <motion.div 
          animate={{ y: [0, -40, 0], x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-light-blue blur-[100px] pointer-events-none mix-blend-multiply"
        />
        <motion.div 
          animate={{ y: [0, 50, 0], x: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[0%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-sky-blue/15 blur-[120px] pointer-events-none"
        />

        {/* Cursor Responsive Glow */}
        <motion.div 
          animate={{ x: mousePosition.x - 400, y: mousePosition.y - 400 }}
          transition={{ type: "spring", damping: 40, stiffness: 100, mass: 0.5 }}
          className="fixed top-0 left-0 w-[800px] h-[800px] bg-medical-blue/[0.04] blur-[150px] rounded-full pointer-events-none z-0"
        />
      </div>

      <div className="relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-5"
          >
            <span className="px-4 py-1.5 rounded-full bg-light-blue/80 border border-medical-blue/10 text-medical-blue text-[10px] font-bold uppercase tracking-widest">
              Medical Affiliations
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-heading font-semibold text-dark-text mb-4 md:mb-6 tracking-tight max-w-[700px]"
          >
            Trusted Across Leading <br className="hidden md:block" /> Healthcare Institutions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-soft-gray text-[15px] md:text-[16px] leading-relaxed max-w-[580px] font-sans font-normal"
          >
            Associated with reputed hospitals and medical centers delivering advanced patient-focused healthcare and clinical excellence.
          </motion.p>
        </div>

        {/* Marquee Rows Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full overflow-hidden relative"
        >
          {/* Gradient Fades for Marquee Edges */}
          <div className="absolute top-0 left-0 w-[10%] md:w-[15%] h-full bg-gradient-to-r from-pure-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[10%] md:w-[15%] h-full bg-gradient-to-l from-pure-white to-transparent z-20 pointer-events-none"></div>

          {/* Top Marquee Row (Moves Left) */}
          <div className="group flex w-[200vw] lg:w-[150vw] hover:[animation-play-state:paused]">
            <div className="flex animate-marquee-left w-full hover:[animation-play-state:paused]">
              {repeatedAffiliations.map((hospital, index) => (
                <div key={`top-${index}`} className="flex-shrink-0 w-[220px] md:w-[350px] px-2 md:px-3 lg:px-4">
                  <AffiliationCard hospital={hospital} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee Row (Moves Right) */}
          <div className="group flex w-[200vw] lg:w-[150vw] hover:[animation-play-state:paused] -ml-[100vw] lg:-ml-[75vw]">
            <div className="flex animate-marquee-right w-full hover:[animation-play-state:paused]">
              {repeatedAffiliations.map((hospital, index) => (
                <div key={`bottom-${index}`} className="flex-shrink-0 w-[220px] md:w-[350px] px-2 md:px-3 lg:px-4">
                  <AffiliationCard hospital={hospital} />
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

// Internal Card Component for Affiliations
function AffiliationCard({ hospital }: { hospital: string }) {
  return (
    <div className="group/card relative w-full h-[160px] md:h-[240px] p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(30,58,95,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(58,123,255,0.08)] hover:border-medical-blue/30 overflow-hidden flex flex-col justify-between items-center text-center">
      
      {/* Soft Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-blue/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center h-full w-full">
        {/* Top: Icon */}
        <div className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 rounded-full bg-soft-white border border-light-border/50 flex items-center justify-center text-medical-blue group-hover/card:scale-110 group-hover/card:bg-light-blue group-hover/card:shadow-[0_0_15px_rgba(58,123,255,0.2)] transition-all duration-500">
          <Building2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
        </div>
        
        {/* Center: Hospital Name */}
        <h3 className="text-[13px] md:text-[18px] font-heading font-semibold text-dark-text leading-snug flex-grow flex items-center justify-center">
          {hospital}
        </h3>
        
        {/* Bottom: Role Label */}
        <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-light-border/40 w-full">
          <span className="text-[9px] md:text-[11px] font-sans font-medium text-soft-gray uppercase tracking-[0.2em] group-hover/card:text-medical-blue transition-colors duration-300">
            Hon. Physician
          </span>
        </div>
      </div>
    </div>
  );
}
