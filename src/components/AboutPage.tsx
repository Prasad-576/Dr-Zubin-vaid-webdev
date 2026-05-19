import type { MouseEvent } from 'react';
import { useMotionTemplate, useMotionValue, useSpring, motion } from 'framer-motion';
import aboutImage from '../assets/about.png';

export default function AboutPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 28, mass: 0.7 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 28, mass: 0.7 });

  const cursorGlow = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(58, 123, 255, 0.14), rgba(58, 123, 255, 0.04) 34%, transparent 72%)`;

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-pure-white pt-[100px] md:pt-[130px] pb-12 md:pb-24 lg:pt-[150px] lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pure-white via-soft-white to-light-blue/45" />
        <div className="absolute -left-20 top-[20%] h-72 w-72 rounded-full bg-sky-blue/15 blur-[90px]" />
        <div className="absolute -right-16 top-[8%] h-[26rem] w-[26rem] rounded-full bg-light-blue blur-[110px]" />
        <div className="absolute bottom-[8%] left-[40%] h-64 w-64 rounded-full bg-medical-blue/10 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(58,123,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(58,123,255,0.08) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        <motion.div className="absolute inset-0" style={{ background: cursorGlow }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          >
            <div className="pointer-events-none absolute -inset-10 rounded-[2rem] bg-gradient-to-br from-medical-blue/15 via-sky-blue/10 to-transparent blur-[54px]" />
            <div className="pointer-events-none absolute -right-8 top-12 h-48 w-48 rounded-full bg-sky-blue/25 blur-[74px]" />
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/80 p-3 shadow-[0_28px_70px_rgba(29,78,216,0.16)]"
            >
              <img
                src={aboutImage}
                alt="Dr. Zubin Vaid"
                className="h-[320px] md:h-[460px] w-full rounded-[1.45rem] object-cover object-center lg:h-[640px]"
              />
              <div className="pointer-events-none absolute inset-3 rounded-[1.45rem] bg-gradient-to-tr from-white/18 via-transparent to-sky-blue/12" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="pointer-events-none absolute -top-12 -left-8 h-36 w-36 rounded-full bg-medical-blue/10 blur-[60px]"
            />

            <div className="space-y-5">
              <h1 className="font-heading text-[1.85rem] md:text-[2.8rem] font-bold leading-tight text-dark-text lg:text-[3.35rem]">
                Dr. Zubin Vaid
              </h1>
              <p className="font-heading text-[0.95rem] md:text-[1.12rem] font-medium tracking-wide text-medical-blue/85">
                M.D.(Med), FIDM.(Diabetes)
              </p>
              <p className="font-heading text-[0.95rem] md:text-[1.24rem] font-medium tracking-wide text-navy-accent/90">
                Consulting Physician &amp; Diabetologist
              </p>

              <p className="max-w-[66ch] pt-2 text-[0.95rem] md:text-[1.04rem] leading-[1.95] text-soft-gray">
                Dr Zubin Vaid is a Consultant M.D. General Physician and Diabetologist with training and experience in all branches of Internal Medicine and Emergency Medicine including Diabetes, Lifestyle related diseases like Hypertension and Dyslipidaemia, Cardiac ailments and Ischaemic Heart Disease, Infectious diseases and HIV medicine, Endocrine conditions and thyroid disease, Neurological disorders, Respiratory/lung related conditions, Gastrointestinal and Liver issues and kidney diseases.
              </p>

              <p className="max-w-[66ch] text-[0.95rem] md:text-[1.04rem] leading-[1.95] text-soft-gray">
                Having a post graduate M. D. (Medicine) degree from the prestigious Seth G. S. Medical College and KEM Hospital, Mumbai and having worked as a lecturer in the same institute, he carries with him an experience of almost 20 years of medical practice. He also has a fellowship in Diabetes from the prestigious CMC (Christian Medical College) Vellore, both the Institutes being rated among the top Medical Institutes in India. He has also completed FCRS, FCCM and FVM, all fellowships in Critical care and Ventilatory Management from the Indian Society of Critical Care Medicine, Chester University, UK and ACE Academy Jaipur respectively.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
