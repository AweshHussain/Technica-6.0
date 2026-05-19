import { motion } from "framer-motion";
import { HimalayanSunrise } from "./HimalayanSunrise";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "#F4EEE0" }}>
      {/* faint mandala watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -bottom-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
        style={{
          background:
            "repeating-radial-gradient(circle, var(--bronze) 0 1px, transparent 1px 24px)",
        }}
      />

      {/* nav */}
      <header className="relative z-10 w-full flex items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center font-display text-2xl font-bold tracking-widest text-[var(--gold)]">
            TA
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[0.65rem] tracking-[0.3em] font-semibold text-[var(--navy)]">
              TECHNICA
            </span>
            <span className="font-display text-xl tracking-[0.1em] font-bold text-[var(--navy)] leading-none">
              AVINYĀ
            </span>
          </div>
        </div>
        <nav className="hidden gap-8 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--navy)]/80 md:flex">
          <a href="#home" className="hover:text-[var(--gold)] border-b-2 border-[var(--gold)] pb-1 transition-colors">Home</a>
          <a href="#events" className="hover:text-[var(--gold)] pb-1 transition-colors">Events</a>
          <a href="#gaming" className="hover:text-[var(--gold)] pb-1 transition-colors">Gaming Arena</a>
          <a href="#robotics" className="hover:text-[var(--gold)] pb-1 transition-colors">Robotics</a>
          <a href="#workshops" className="hover:text-[var(--gold)] pb-1 transition-colors">Workshops</a>
          <a href="#sponsors" className="hover:text-[var(--gold)] pb-1 transition-colors">Sponsors</a>
          <a href="#contact" className="hover:text-[var(--gold)] pb-1 transition-colors">Contact</a>
        </nav>
        <button className="hidden rounded-full border-2 border-[var(--gold)]/40 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--navy)] transition hover:bg-[var(--gold)]/10 md:block">
          Register Now <span className="ml-1 opacity-70">→</span>
        </button>
      </header>

      {/* full-bleed cinematic background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <HimalayanSunrise className="w-full h-full" />
      </div>

      {/* hero content */}
      <div className="relative z-10 w-full flex flex-col justify-center min-h-[calc(100vh-90px)] px-8 md:px-16 lg:px-24 xl:px-32 pb-20 pt-8 lg:pt-16">
        {/* LEFT: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.2, 0.05, 0.1, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-[var(--gold)] to-transparent opacity-80" />
            <p className="font-sanskrit text-[0.8rem] tracking-[0.15em] text-[var(--gold)] opacity-90 drop-shadow-sm font-medium">
              अविन्या नवसृजनस्य शक्तिः
            </p>
          </div>

          <h1 
            className="font-display text-[4rem] leading-[0.9] tracking-tight text-[#040810] sm:text-[5.5rem] lg:text-[7.5rem]"
            style={{ textShadow: "0 2px 30px rgba(246,241,231,1)" }}
          >
            TECHNICA<br />
            <span 
              className="italic bg-gradient-to-r from-[#D4AF37] via-[#F5E095] to-[#B8860B] bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 2px 20px rgba(212,175,55,0.4)) drop-shadow(0 0px 5px rgba(246,241,231,0.5))" }}
            >
              AVINYĀ
            </span>
          </h1>

          <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.45em] text-[var(--navy)]/65 drop-shadow-sm">
            Innovate <span className="mx-2 opacity-50">·</span> Collaborate <span className="mx-2 opacity-50">·</span> Elevate
          </p>

          <p className="mt-7 max-w-[420px] text-[0.95rem] leading-[1.8] text-[#1A2538]/85 font-medium tracking-wide">
            Technica Avinya is our annual tech fest bringing together bright minds
            to build, compete, and innovate — with purpose and harmony.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <motion.a
              href="#events"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-full bg-[#050A14] px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#F6F1E7] shadow-xl transition-all duration-700 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] hover:bg-[#0A1222]"
            >
              Explore Events <span className="ml-3 transition-transform duration-500 group-hover:translate-x-1.5 inline-block opacity-80">→</span>
            </motion.a>
            <motion.a
              href="#register"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-full border border-[var(--gold)]/30 bg-[#F6F1E7]/40 backdrop-blur-md px-9 py-4 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#050A14] shadow-sm transition-all duration-700 hover:border-[var(--gold)]/90 hover:bg-[var(--gold)]/10 hover:shadow-[0_10px_35px_-10px_rgba(212,175,55,0.35)]"
            >
              Register Now <span className="ml-3 opacity-60 transition-transform duration-500 group-hover:translate-x-1.5 inline-block">→</span>
            </motion.a>

          </div>

          <div className="mt-20 flex items-center gap-10 text-xs uppercase tracking-[0.3em] text-[var(--navy)]/60 font-semibold">
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl text-[var(--gold)]">24+</div>
              <div className="mt-2">Events</div>
            </div>
            <div className="h-10 w-px bg-[var(--gold)]/30" />
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl text-[var(--gold)]">3</div>
              <div className="mt-2">Days</div>
            </div>
            <div className="h-10 w-px bg-[var(--gold)]/30" />
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl text-[var(--gold)]">∞</div>
              <div className="mt-2">Ideas</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom rule */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <div className="flex items-center justify-between border-t border-[var(--gold)]/30 pt-6 text-[10px] uppercase tracking-[0.4em] text-[var(--navy)]/50">
          <span>Est. MMXXVI</span>
          <span className="hidden sm:block">Ancient Wisdom · Modern Innovation</span>
          <span>Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
