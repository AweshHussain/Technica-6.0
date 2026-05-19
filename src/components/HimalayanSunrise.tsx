import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import himalaya from "@/assets/himalaya-4k.jpg";
import himalayaSilhouette from "@/assets/himalaya-silhouette.png";
import cloudsImg from "@/assets/clouds.png";

/*
  DEPTH STACK (z-index order, bottom → top)
  z-10  Base sky gradient (full bleed)
  z-10  Sun volumetric bloom
  z-20  Sacred geometry SVG (rotating)
  z-20  Distant background silhouette
  z-30  Main Himalayan peak image
  z-35  Cinematic birds
  z-40  Valley fog bands (sandwiched above peaks, below UI)
  z-50  Horizontal editorial mask (left parchment → right transparent)
  z-50  Global vignette + colour grade
*/

/* ─── Sky Gradient ─────────────────────────────────────────────── */
function BaseSky() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 10, background: "#F4EEE0" }}>
      {/* Warm golden corona in the upper portion centered on sun position */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 75% 65% at 50.2% 36%,
            rgba(255,200,70,0.55) 0%,
            rgba(255,165,40,0.32) 22%,
            rgba(255,210,130,0.16) 44%,
            transparent 68%),
          radial-gradient(ellipse 100% 50% at 75% 10%,
            rgba(255,160,30,0.22) 0%,
            rgba(255,200,90,0.10) 45%,
            transparent 70%)
        `,
      }} />
    </div>
  );
}

/* ─── Sun Volumetric Bloom ─────────────────────────────────────── */
function SunBloom() {
  return (
    /* Pinned precisely at left-[50.2%] top-[36%] — the true peak tip */
    <div className="absolute left-[50.2%] top-[36%] -translate-x-1/2 -translate-y-1/2 origin-center" style={{
      zIndex: 34, pointerEvents: "none",
      maskImage: "linear-gradient(to bottom, black 50%, transparent 55%)",
      WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 55%)",
    }}>
      {/* Outermost light field — bleeds across scene */}
      <div style={{
        position: "absolute", width: 1000, height: 1000,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: `radial-gradient(circle,
          rgba(255,225,110,0.28) 0%,
          rgba(255,170,45,0.13) 32%,
          rgba(255,120,20,0.05) 60%,
          transparent 80%)`,
        filter: "blur(55px)", mixBlendMode: "screen" as const,
      }} />
      {/* Mid golden bloom */}
      <motion.div style={{
        position: "absolute", width: 500, height: 500,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: `radial-gradient(circle,
          rgba(255,255,215,0.82) 0%,
          rgba(255,220,85,0.58) 22%,
          rgba(255,160,42,0.26) 50%,
          transparent 74%)`,
        filter: "blur(28px)", mixBlendMode: "screen" as const,
      }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.83, 1, 0.83] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* White-hot solar core */}
      <motion.div style={{
        position: "absolute", width: 155, height: 155,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: `radial-gradient(circle,
          rgba(255,255,255,1) 0%,
          rgba(255,248,200,0.93) 30%,
          rgba(255,200,65,0.50) 64%,
          transparent 90%)`,
        filter: "blur(9px)", mixBlendMode: "screen" as const,
      }}
        animate={{ scale: [1, 1.09, 1], opacity: [0.87, 1, 0.87] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Directional conic light rays */}
      <motion.div className="hidden md:block" style={{
        position: "absolute", width: 800, height: 800,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: `conic-gradient(from 0deg,
          transparent 0deg, rgba(255,218,88,0.11) 24deg, transparent 54deg,
          rgba(255,218,88,0.07) 108deg, transparent 138deg,
          rgba(255,218,88,0.11) 192deg, transparent 222deg,
          rgba(255,218,88,0.07) 288deg, transparent 318deg,
          transparent 360deg)`,
        filter: "blur(7px)", mixBlendMode: "screen" as const,
      }}
        animate={{ rotate: [0, 24, 0] }}
        transition={{ duration: 92, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Sacred Geometry (centred on sun, behind peaks) ─────────────── */
function SacredGeometry() {
  const G = "#C8A84B";
  const size = 720; // Increased emblem size

  const Dots = ({ r, n, s = 1.0 }: { r: number; n: number; s?: number }) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return <circle key={i} cx={250 + Math.cos(a) * r} cy={250 + Math.sin(a) * r} r={s} fill={G} opacity={0.68} />;
    });

  const Ticks = ({ r, n, len = 7 }: { r: number; n: number; len?: number }) =>
    Array.from({ length: n }, (_, i) => (
      <line key={i} x1={250} y1={250 - r} x2={250} y2={250 - r - len}
        stroke={G} strokeWidth={1.5} transform={`rotate(${(i / n) * 360} 250 250)`} opacity={0.85} />
    ));

  const Petals = ({ r1, r2, n }: { r1: number; r2: number; n: number }) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * 360; const m = (r1 + r2) / 2;
      return <path key={i} fill="none" stroke={G} strokeWidth={1.2} opacity={0.8}
        d={`M250 ${250 - r1} Q${250 + 8} ${250 - m} 250 ${250 - r2} Q${250 - 8} ${250 - m} 250 ${250 - r1}Z`}
        transform={`rotate(${a} 250 250)`} />;
    });

  return (
    <motion.div className="absolute left-[50.2%] top-[36%] -translate-x-1/2 -translate-y-1/2 origin-center" style={{
      width: size, height: size,
      zIndex: 35, opacity: 1, pointerEvents: "none",
      maskImage: "linear-gradient(to bottom, black 50%, transparent 55%)",
      WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 55%)",
    }}>
      <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 20px rgba(255,210,100,0.8))" }} aria-hidden="true">
        <defs>
          <path id="geom-text-path" d="M 41 250 A 209 209 0 0 1 459 250" />
        </defs>
        <text fill={G} style={{ fontFamily: "var(--font-sanskrit)", fontSize: 13, letterSpacing: "0.18em", opacity: 0.8, fontWeight: "bold" }}>
          <textPath href="#geom-text-path" startOffset="50%" textAnchor="middle">
            योगः कर्मसु कौशलम् । ज्ञानं परमं बलम् । अविन्या नवसृजनस्य शक्तिः ।
          </textPath>
        </text>
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "250px 250px" }}>
          <circle cx={250} cy={250} r={226} fill="none" stroke={G} strokeWidth={1.5} opacity={0.8} />
          <Dots r={226} n={72} s={1.5} />
        </motion.g>
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "250px 250px" }}>
          <circle cx={250} cy={250} r={203} fill="none" stroke={G} strokeWidth={1.5} opacity={0.7} />
          <Ticks r={203} n={48} len={4} />
        </motion.g>
        <motion.g animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "250px 250px" }}>
          <Petals r1={180} r2={158} n={16} />
          <circle cx={250} cy={250} r={155} fill="none" stroke={G} strokeWidth={1.2} opacity={0.75} />
        </motion.g>
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "250px 250px" }}>
          <circle cx={250} cy={250} r={115} fill="none" stroke={G} strokeWidth={1.0} opacity={0.8} />
          <Dots r={115} n={36} s={1.2} />
        </motion.g>
      </svg>
    </motion.div>
  );
}

/* ─── Distant Background Ridge ────────────────────────────────────── */
function DistantRidge() {
  return (
    <div className="absolute inset-x-0 bottom-0" style={{ zIndex: 20, height: "68%", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 60% 28% at 70% 62%, rgba(155,148,165,0.20) 0%, transparent 58%),
          radial-gradient(ellipse 45% 22% at 88% 68%, rgba(140,145,160,0.15) 0%, transparent 52%)
        `,
      }} />
    </div>
  );
}

/* ─── Main Himalayan Peaks ────────────────────────────────────────── */
function HimalayanPeaks({ mountY }: { mountY: MotionValue<number> }) {
  return (
    <motion.div className="absolute inset-0 w-full h-full" style={{ zIndex: 30, y: mountY }}>
      <img
        src={himalaya}
        alt="Himalayan peaks — Technica Avinya"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "50% 100%",
          filter: "contrast(1.2) saturate(1.15)", // Increased sharpness and punch
          imageRendering: "-webkit-optimize-contrast" as any,
          maskImage: [
            // Vertical — only a very slight fade at the absolute bottom, otherwise fully visible
            "linear-gradient(to top, transparent 0%, black 5%, black 100%)",
          ].join(", "),
          maskComposite: "intersect",
          WebkitMaskImage: [
            "linear-gradient(to top, transparent 0%, black 5%, black 100%)",
          ].join(", "),
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* 2.5D Volumetric Drifting Clouds extracted from the user's cloud image */}
      <motion.img
        src={cloudsImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          objectPosition: "50% 100%",
          filter: "contrast(1.3) brightness(1.2)", // Enhance the clouds' natural glow
          mixBlendMode: "screen", // Hide dark rocks, keep bright glowing fog
          imageRendering: "-webkit-optimize-contrast" as any,
          // Target only the lower valleys where the fog sits
          maskImage: "radial-gradient(ellipse 120% 40% at 50% 85%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 40% at 50% 85%, black 10%, transparent 70%)",
        }}
        animate={{ x: ["-1%", "1.5%", "-1%"], scale: [1.02, 1.04, 1.02] }}
        transition={{ duration: 75, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Warm golden rim-light on snow ridges */}
      <div className="absolute inset-0 mix-blend-color-dodge" style={{
        background: `radial-gradient(ellipse 45% 50% at 50.2% 36%, rgba(255,195,60,0.26) 0%, rgba(255,145,35,0.12) 40%, transparent 64%)`,
      }} />
    </motion.div>
  );
}




/* ─── Cinematic Birds ─────────────────────────────────────────────── */
function CinematicBirds({ y }: { y: MotionValue<number> }) {
  const d = "M2 10 Q6 6 12 12 Q18 6 22 10 Q18 8 12 14 Q6 8 2 10Z";
  type B = { t: string; l: string; op: number; sz: string; dur: number; del?: number };
  const Bird = ({ t, l, op, sz, dur, del = 0 }: B) => (
    <motion.svg viewBox="0 0 24 24" className="absolute text-[#0B1220]"
      style={{ top: t, left: l, width: sz, height: sz, opacity: op }}
      animate={{ x: ["0vw", "48vw"], y: [0, -13, 8, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay: del, ease: "linear" }}>
      <motion.path fill="currentColor" d={d}
        animate={{ scaleY: [1, 0.42, 1] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }} />
    </motion.svg>
  );
  return (
    <motion.div className="absolute inset-0 pointer-events-none hidden lg:block" style={{ zIndex: 35, y }}>
      <Bird t="27%" l="58%" op={0.38} sz="0.48rem" dur={128} />
      <Bird t="29%" l="64%" op={0.28} sz="0.36rem" dur={110} del={14} />
      <Bird t="25%" l="70%" op={0.20} sz="0.26rem" dur={150} del={33} />
    </motion.div>
  );
}

/* ─── Valley Fog Bands (sandwiched above peaks) ───────────────────── */
function ValleyFog({ y }: { y: MotionValue<number> }) {
  return (
    <motion.div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ zIndex: 40, y, height: "68vh" }}>

      {/* Band D — TOP EDGE CAMOUFLAGE: heavy warm haze sitting exactly at the
          mountain-sky seam (~56% from bottom). This is the primary fix for the
          harsh cutoff line — a wide, heavily blurred parchment-warm ellipse. */}
      <motion.div className="absolute rounded-[50%]"
        style={{
          left: "15%", bottom: "35%",
          width: "85%", height: 180,
          background: `radial-gradient(ellipse at 50% 50%,
            rgba(255,248,235,0.38) 0%,
            rgba(255,235,185,0.18) 45%,
            transparent 78%)`,
          filter: "blur(65px)",
        }}
        animate={{ x: ["0%", "-3%", "0%"], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Band A — illuminated golden cloud near sun (mix-blend-screen) */}
      <motion.div className="absolute rounded-[50%] hidden md:block"
        style={{
          right: "-4%", bottom: "44%",
          width: 820, height: 270,
          background: `radial-gradient(ellipse at 36% 50%,
            rgba(255,242,175,0.45) 0%, rgba(255,228,140,0.24) 40%, transparent 72%)`,
          filter: "blur(60px)", mixBlendMode: "screen" as const,
        }}
        animate={{ x: ["0%", "-4.5%", "0%"] }}
        transition={{ duration: 68, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Band B — valley mist (lighter opacity so mountains show through) */}
      <motion.div className="absolute rounded-[50%]"
        style={{
          left: "8%", bottom: "20%",
          width: "132%", height: 300,
          background: `radial-gradient(ellipse at 50% 52%,
            rgba(255,252,248,0.55) 0%, rgba(250,246,238,0.35) 44%, transparent 80%)`,
          filter: "blur(52px)", mixBlendMode: "lighten" as const,
        }}
        animate={{ x: ["0%", "-5%", "0%"] }}
        transition={{ duration: 82, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Band C — slow foreground ground mist */}
      <motion.div className="absolute rounded-[50%]"
        style={{
          left: "-6%", bottom: "9%",
          width: "118%", height: 220,
          background: "rgba(252,249,244,0.72)",
          filter: "blur(48px)",
        }}
        animate={{ x: ["-1%", "-8%", "-1%"] }}
        transition={{ duration: 102, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Page-matching base gradient - reduced drastically so it doesn't hide bottom mountains */}
      <div className="absolute inset-x-0 bottom-0 h-[10%]" style={{
        background: "linear-gradient(to top, #F4EEE0 0%, rgba(244,238,224,0.6) 50%, transparent 100%)",
      }} />
    </motion.div>
  );
}

/* ─── Editorial Haze ───────────────────────────────────── */
/* A soft atmospheric haze on the left to ensure the dark typography
   remains readable without completely blocking the mountain ridges behind it. */
function EditorialMask() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50 }}>
      {/* Semi-transparent left-to-right haze */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to right,
          rgba(244,238,224,0.75) 0%,
          rgba(244,238,224,0.60) 25%,
          rgba(244,238,224,0.35) 45%,
          transparent 65%)`,
      }} />
      {/* Warm sunrise atmosphere bleeding leftward */}
      <div style={{
        position: "absolute", inset: 0, mixBlendMode: "screen" as const,
        background: `radial-gradient(ellipse 72% 55% at 60% 44%,
          rgba(255,210,90,0.12) 0%,
          transparent 65%)`,
      }} />
    </div>
  );
}

/* ─── Cinematic Vignette & Grade ──────────────────────────────────── */
function CinematicGrade() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50 }}>
      {/* Edge vignette focuses eye toward text+sun */}
      <div style={{
        position: "absolute", inset: 0, mixBlendMode: "multiply" as const,
        background: "radial-gradient(ellipse at 68% 50%, transparent 30%, rgba(12,8,3,0.38) 130%)",
      }} />
      {/* Subtle warm global tint */}
      <div style={{
        position: "absolute", inset: 0,
        mixBlendMode: "multiply" as const, opacity: 0.07,
        background: "linear-gradient(135deg, rgba(200,168,75,1) 0%, rgba(255,200,78,1) 100%)",
      }} />
    </div>
  );
}

/* ─── Ambient Gold Particles ──────────────────────────────────────── */
function AmbientParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden" style={{ zIndex: 38 }}>
      {Array.from({ length: 7 }, (_, i) => (
        <motion.span key={i} className="absolute rounded-full"
          style={{
            width: 2, height: 2,
            left: `${54 + (i * 9) % 36}%`,
            top: `${16 + (i * 13) % 54}%`,
            background: "#C8A84B", filter: "blur(0.5px)", opacity: 0,
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.52, 0] }}
          transition={{ duration: 16 + (i % 5), repeat: Infinity, delay: i * 2.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HimalayanSunrise — final export
══════════════════════════════════════════════════════════════════ */
export function HimalayanSunrise({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const mountY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fogY = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const geomY = useTransform(scrollYProgress, [0, 1], [0, -46]);
  const geomOp = useTransform(scrollYProgress, [0, 0.55], [0.76, 0]);
  const birdsY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{ background: "#F4EEE0" }}
    >
      <BaseSky />
      <SunBloom />
      <SacredGeometry opacity={geomOp} y={geomY} />
      <DistantRidge />
      <HimalayanPeaks mountY={mountY} />
      <CinematicBirds y={birdsY} />
      <ValleyFog y={fogY} />
      <AmbientParticles />
      <EditorialMask />
      <CinematicGrade />
    </div>
  );
}
