import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HeartHandshake, ClipboardCheck, Activity, Sparkles, ShieldCheck } from 'lucide-react';

const features = [
  { 
    id: 1,
    icon: HeartHandshake, 
    title: "Personalized Care", 
    description: "Tailored treatment plans designed specifically around your unique health needs and lifestyle goals.",
    floatDelay: 0,
    className: "lg:mt-0"
  },
  { 
    id: 2,
    icon: ClipboardCheck, 
    title: "Evidence-Based Treatment", 
    description: "Advanced clinical protocols ensuring the highest standard of proven, modern healthcare.",
    floatDelay: 1,
    className: "lg:mt-32"
  },
  { 
    id: 3,
    icon: Activity, 
    title: "Modern Diagnostics", 
    description: "State-of-the-art diagnostic evaluations for precise and accurate medical interventions.",
    floatDelay: 2,
    className: "lg:mt-16"
  },
  { 
    id: 4,
    icon: Sparkles, 
    title: "Holistic Wellness", 
    description: "Integrating medical expertise with complete well-being for long-term health preservation.",
    floatDelay: 1.5,
    className: "lg:-mt-16"
  },
  { 
    id: 5,
    icon: ShieldCheck, 
    title: "Ethical Practice", 
    description: "Transparent, honest, and morally grounded medical care you can trust implicitly.",
    floatDelay: 0.5,
    className: "lg:mt-16"
  }
];

// 3D Tilt Feature Card
function FeatureCard({ feature }: { feature: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div 
      variants={itemVariants}
      className={`perspective-1000 ${feature.className} relative z-10 w-full`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: feature.floatDelay }}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-white/70 backdrop-blur-md md:backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(30,58,95,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(58,123,255,0.12)] overflow-hidden h-full flex flex-col justify-center"
        >
          {/* Subtle Hover Glow Tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-light-blue/0 to-light-blue/0 group-hover:from-light-blue/40 group-hover:to-transparent transition-colors duration-500 z-0 pointer-events-none"></div>
          
          {/* Inner Content with 3D Pop */}
          <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
            <div className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-pure-white border border-light-border/60 shadow-sm flex items-center justify-center text-medical-blue group-hover:scale-110 group-hover:bg-medical-blue group-hover:text-white transition-all duration-500">
              <feature.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </div>
            
            <h3 className="text-lg md:text-2xl font-heading font-bold text-dark-text mb-2 md:mb-3 leading-tight group-hover:text-medical-blue transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-[13px] md:text-[15px] text-soft-gray leading-relaxed font-sans font-normal group-hover:text-dark-text/70 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyChoose() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const heartbeatVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 0.15, 
      transition: { duration: 3, ease: "easeInOut" as const, delay: 0.5 } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-32 lg:py-48 overflow-hidden bg-gradient-to-b from-pure-white to-soft-white z-10"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#3A7BFF 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        {/* Cursor Responsive Ambient Light */}
        <motion.div 
          animate={{ x: mousePosition.x - 600, y: mousePosition.y - 600 }}
          transition={{ type: "spring", damping: 60, stiffness: 60, mass: 2 }}
          className="fixed top-0 left-0 w-[1200px] h-[1200px] bg-medical-blue/[0.03] blur-[200px] rounded-full pointer-events-none z-0"
        />

        {/* Floating Background Orbs */}
        <motion.div 
          animate={{ y: [0, -50, 0], x: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-light-blue blur-[120px]"
        />
        <motion.div 
          animate={{ y: [0, 60, 0], x: [0, -50, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[0%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-sky-blue/10 blur-[150px]"
        />

        {/* Ambient Medical Pulse Line */}
        <div className="absolute top-[40%] left-0 w-full h-[300px] flex items-center justify-center pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
            <motion.path
              d="M0,100 L200,100 L250,100 L300,30 L350,170 L400,80 L450,120 L500,100 L1000,100"
              fill="none"
              stroke="#72A8FF"
              strokeWidth="1.5"
              variants={heartbeatVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              style={{ filter: 'drop-shadow(0px 0px 10px rgba(114,168,255,0.5))' }}
            />
          </svg>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full bg-light-blue/80 border border-medical-blue/10 text-medical-blue text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Why Choose Dr. Zubin
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
            className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.1] font-heading font-semibold text-dark-text mb-6 md:mb-8 tracking-tight max-w-[800px]"
          >
            A Personalized Approach <br className="hidden md:block" /> To Modern Healthcare
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-soft-gray text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-sans font-normal"
          >
            Combining advanced clinical expertise, patient-focused care, and evidence-based treatment to deliver trusted healthcare experiences tailored to every individual.
          </motion.p>
        </div>

        {/* Organic Floating Card Composition */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 items-start"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-10">
            <FeatureCard feature={features[0]} />
            <FeatureCard feature={features[3]} />
          </div>

          {/* Column 2 - Pushed down for staggered layout */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-10">
            <FeatureCard feature={features[1]} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-10">
            <FeatureCard feature={features[2]} />
            <FeatureCard feature={features[4]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
