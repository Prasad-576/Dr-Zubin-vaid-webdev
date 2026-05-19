import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, AlertCircle, Mail, Send } from 'lucide-react';

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: true, margin: "-100px" });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative w-full scroll-mt-28 md:scroll-mt-32 py-16 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-soft-white to-pure-white z-10"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#3A7BFF 1px, transparent 1px), linear-gradient(90deg, #3A7BFF 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Cursor Responsive Ambient Light */}
        <motion.div 
          animate={{ x: mousePosition.x - 600, y: mousePosition.y - 600 }}
          transition={{ type: "spring", damping: 50, stiffness: 60, mass: 2 }}
          className="fixed top-0 left-0 w-[1200px] h-[1200px] bg-medical-blue/[0.04] blur-[200px] rounded-full pointer-events-none z-0"
        />

        {/* Floating Background Orbs */}
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-light-blue blur-[100px]"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-sky-blue/15 blur-[120px]"
        />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full bg-light-blue/80 border border-medical-blue/10 text-medical-blue text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Contact Us
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-heading font-semibold text-dark-text mb-4 md:mb-6 tracking-tight max-w-[700px]"
          >
            Get In Touch With <br className="hidden md:block" /> Dr. Zubin Vaid
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-soft-gray text-[16px] md:text-[18px] leading-relaxed max-w-[600px] font-sans font-normal"
          >
            Connect with Niraant Clinic for consultations, appointments, and personalized healthcare support.
          </motion.p>
        </div>

        {/* Split Layout Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >
          {/* Left Side: Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="w-full flex flex-col gap-6"
          >
            <div className="p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_10px_40px_rgba(30,58,95,0.03)] hover:shadow-[0_20px_50px_rgba(58,123,255,0.08)] transition-all duration-500 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-light-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-6 md:gap-8">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-soft-white border border-light-border/50 flex items-center justify-center text-medical-blue group-hover:bg-light-blue transition-colors duration-300">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-heading font-semibold text-dark-text mb-2">Niraant Clinic</h4>
                    <p className="text-[13px] md:text-[15px] font-sans text-soft-gray leading-relaxed max-w-[300px]">
                      3rd Floor, West Avenue, S.V. Road,<br />
                      next to HP Petrol Pump,<br />
                      opp. MA School, Zalawad Nagar,<br />
                      Station W, Andheri West,<br />
                      Mumbai, Maharashtra 400058
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-light-border/40"></div>

                {/* Routine Appointments */}
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-soft-white border border-light-border/50 flex items-center justify-center text-medical-blue group-hover:bg-light-blue transition-colors duration-300">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-heading font-semibold text-dark-text mb-1">Routine Appointments</h4>
                    <a href="tel:+919967183837" className="text-[14px] md:text-[16px] font-sans font-medium text-medical-blue hover:text-navy-accent transition-colors duration-300 block mb-1">
                      +91 9967183837
                    </a>
                    <p className="text-[13px] font-sans text-soft-gray">
                      (Call Between 9 AM to 9 PM – Mon to Sat Only)
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-light-border/40"></div>

                {/* Emergency Contact */}
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors duration-300">
                    <AlertCircle className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-heading font-semibold text-dark-text mb-1">Emergency Contact</h4>
                    <div className="flex flex-col gap-2">
                      <div>
                        <a href="tel:+919821231939" className="text-[14px] md:text-[16px] font-sans font-medium text-red-500 hover:text-red-700 transition-colors duration-300 block">
                          +91 98212 31939
                        </a>
                        <p className="text-[12px] font-sans text-soft-gray mt-0.5">(SMS ONLY)</p>
                      </div>
                      <div>
                        <a href="tel:+917738698083" className="text-[14px] md:text-[16px] font-sans font-medium text-red-500 hover:text-red-700 transition-colors duration-300 block">
                          +91 77386 98083
                        </a>
                        <p className="text-[12px] font-sans text-soft-gray mt-0.5">(Emergency Calls Only)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-light-border/40"></div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-soft-white border border-light-border/50 flex items-center justify-center text-medical-blue group-hover:bg-light-blue transition-colors duration-300">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center h-12">
                    <a href="mailto:mailuniquehosp@gmail.com" className="text-[14px] md:text-[16px] font-sans font-medium text-medical-blue hover:text-navy-accent transition-colors duration-300">
                      mailuniquehosp@gmail.com
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="w-full p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_50px_rgba(30,58,95,0.05)] hover:shadow-[0_25px_60px_rgba(58,123,255,0.1)] transition-all duration-500 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-light-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl md:rounded-[2.5rem]"></div>
            
            <form className="relative z-10 flex flex-col gap-4 md:gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-[14px] font-sans font-medium text-dark-text mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-white/50 border border-light-border/80 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all duration-300 text-dark-text placeholder:text-soft-gray/60 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-[14px] font-sans font-medium text-dark-text mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-white/50 border border-light-border/80 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all duration-300 text-dark-text placeholder:text-soft-gray/60 font-sans"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[14px] font-sans font-medium text-dark-text mb-2 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-white/50 border border-light-border/80 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all duration-300 text-dark-text placeholder:text-soft-gray/60 font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[14px] font-sans font-medium text-dark-text mb-2 ml-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl bg-white/50 border border-light-border/80 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all duration-300 text-dark-text placeholder:text-soft-gray/60 font-sans resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-2 group/btn relative w-full flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-medical-blue to-sky-blue text-white rounded-xl font-heading font-semibold text-[15px] tracking-wide overflow-hidden shadow-[0_8px_20px_rgba(58,123,255,0.25)] hover:shadow-[0_15px_30px_rgba(58,123,255,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10">CONTACT US</span>
                <Send size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
