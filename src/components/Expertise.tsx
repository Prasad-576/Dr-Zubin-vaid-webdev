import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Activity, HeartPulse, Heart, 
  ShieldAlert, ShieldPlus, ActivitySquare, Brain, Wind
} from 'lucide-react';

const expertiseList = [
  { icon: Stethoscope, title: "Internal Medicine" },
  { icon: Activity, title: "Diabetology" },
  { icon: Heart, title: "Lifestyle Disease" },
  { icon: ActivitySquare, title: "Critical Care Medicine" },
  { icon: ShieldAlert, title: "Infectious Disease" },
  { icon: Wind, title: "Tuberculosis" },
  { icon: ShieldPlus, title: "HIV Medicine" },
  { icon: HeartPulse, title: "Cardiology" },
  { icon: Activity, title: "Thyroidology & Endocrinology" },
  { icon: Activity, title: "Rheumatology" },
  { icon: Wind, title: "Pulmonology" },
  { icon: Activity, title: "Gastroenterology" },
  { icon: Brain, title: "Neurology" },
  { icon: Activity, title: "Nephrology" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Expertise() {
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

  return (
    <section className="relative w-full py-16 md:py-28 lg:py-36 overflow-hidden bg-pure-white z-20">
      {/* Immersive Premium Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pure-white via-[#F4F9FF] to-pure-white"></div>
        
        {/* Low opacity medical grid pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#3A7BFF 1px, transparent 1px), linear-gradient(90deg, #3A7BFF 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Smoother Cursor Glow */}
        <motion.div 
          animate={{ x: mousePosition.x - 400, y: mousePosition.y - 400 }}
          transition={{ type: "spring", damping: 40, stiffness: 100, mass: 0.5 }}
          className="fixed top-0 left-0 w-[800px] h-[800px] bg-medical-blue/[0.04] blur-[150px] rounded-full pointer-events-none z-0"
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Fields of Expertise Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="text-medical-blue text-[11px] font-bold uppercase tracking-[0.25em]">
              Specialized Care
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[2rem] md:text-[3.25rem] leading-[1.2] font-heading font-semibold text-dark-text mb-4 md:mb-6 tracking-tight max-w-[650px]"
          >
            Fields of Expertise
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-soft-gray text-[14px] md:text-[18px] leading-relaxed max-w-[600px] font-sans font-normal"
          >
            Comprehensive diagnosis and treatment across a wide spectrum of complex medical conditions, prioritizing long-term wellness.
          </motion.p>
        </div>

        {/* Expertise Cards Grid - Exactly matching original structure */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 lg:gap-8 justify-center"
        >
          {expertiseList.map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="group relative p-2 sm:p-4 md:p-8 h-full rounded-2xl md:rounded-[2rem] bg-pure-white border border-light-border/40 shadow-[0_4px_20px_rgba(30,58,95,0.02)] transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(58,123,255,0.08)] hover:border-medical-blue/20 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Soft Hover Tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-light-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                {/* Original Circular Medical Icon Style */}
                <div className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] mb-3 md:mb-6 rounded-full bg-medical-blue flex items-center justify-center text-white group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(58,123,255,0.4)] transition-all duration-500">
                  <item.icon className="w-5 h-5 md:w-9 md:h-9" strokeWidth={1.5} />
                </div>
                
                <h4 className="text-[9px] sm:text-[11px] md:text-[15px] font-heading font-semibold text-dark-text group-hover:text-medical-blue transition-colors duration-300 leading-tight">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
