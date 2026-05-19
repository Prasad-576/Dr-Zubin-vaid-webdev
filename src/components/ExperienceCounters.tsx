import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const counters = [
  { value: 20, suffix: "+", title: "Years Experience" },
  { value: 5000, suffix: "+", title: "Happy Patients" },
  { value: 14, suffix: "+", title: "Expertise Areas" }
];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
    mass: 1
  });
  
  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.round(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function ExperienceCounters() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

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
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const heartbeatVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 0.3, 
      transition: { duration: 2.5, ease: "easeInOut" as const, delay: 0.5 } 
    }
  };

  return (
    <section className="relative w-full py-16 md:py-28 lg:py-36 overflow-hidden bg-pure-white z-10" ref={ref}>
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-white via-pure-white to-light-blue/20"></div>

        {/* Cursor Responsive Glow */}
        <motion.div 
          animate={{ x: mousePosition.x - 500, y: mousePosition.y - 500 }}
          transition={{ type: "spring", damping: 50, stiffness: 80, mass: 1 }}
          className="fixed top-0 left-0 w-[1000px] h-[1000px] bg-medical-blue/[0.03] blur-[150px] rounded-full pointer-events-none z-0"
        />

        {/* Subtle Floating Particles */}
        <motion.div 
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-medical-blue blur-[2px]"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[30%] right-[20%] w-4 h-4 rounded-full bg-sky-blue blur-[3px]"
        />
        <motion.div 
          animate={{ x: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[50%] right-[10%] w-2 h-2 rounded-full bg-medical-blue blur-[1px]"
        />

        {/* Animated ECG Heartbeat Line */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full">
            <motion.path
              d="M0,100 L350,100 L380,100 L400,60 L430,160 L470,20 L510,140 L530,100 L560,100 L1000,100"
              fill="none"
              stroke="#3A7BFF"
              strokeWidth="2"
              variants={heartbeatVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              style={{ filter: 'drop-shadow(0px 0px 8px rgba(58,123,255,0.6))' }}
            />
          </svg>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 lg:gap-12"
        >
          {counters.map((counter, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="group relative p-2 py-4 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_40px_rgba(30,58,95,0.03)] transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(58,123,255,0.08)] hover:border-medical-blue/30 overflow-hidden text-center flex flex-col items-center justify-center min-h-[100px] md:min-h-[240px]"
            >
              {/* Soft Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-light-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-5xl lg:text-[4rem] font-heading font-bold text-dark-text mb-1 md:mb-2 flex items-baseline justify-center tracking-tight group-hover:text-medical-blue transition-colors duration-500">
                  <AnimatedNumber value={counter.value} />
                  <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl text-medical-blue ml-0.5 md:ml-1">{counter.suffix}</span>
                </h3>
                <p className="text-[9px] sm:text-[11px] md:text-[15px] font-sans font-medium text-soft-gray uppercase tracking-normal md:tracking-widest mt-1 md:mt-2 group-hover:text-dark-text/80 transition-colors duration-300">
                  {counter.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
