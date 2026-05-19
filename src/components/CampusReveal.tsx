import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import campusImage from "@/assets/campus-aerial.jpg";

// Subtle node positions over the campus (percent based on image)
const NODES = [
  { x: 28, y: 48 },
  { x: 42, y: 42 },
  { x: 58, y: 46 },
  { x: 72, y: 44 },
  { x: 50, y: 60 },
  { x: 35, y: 65 },
];

const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [2, 4],
];

export function CampusReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const fogX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[var(--navy)]"
    >
      {/* gradient blend from parchment hero -> dark cinematic */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-[var(--parchment)] via-[var(--parchment)]/40 to-transparent"
      />

      <div className="relative h-[100vh] min-h-[640px] w-full">
        {/* Image layer */}
        <motion.div
          style={{ scale, y }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={campusImage}
            alt="Aerial cinematic view of the Technica Avinya campus at golden hour"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Fog layer */}
        <motion.div
          aria-hidden
          style={{ x: fogX }}
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 70%, rgba(255,220,170,0.18), transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(255,200,140,0.12), transparent 60%)",
            }}
          />
        </motion.div>

        {/* Drifting particles */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[var(--gold)]"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${20 + ((i * 37) % 60)}%`,
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Intelligence network overlay */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGold" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#C28A3A" stopOpacity="0" />
              <stop offset="50%" stopColor="#E8C07A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C28A3A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {LINKS.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="url(#lineGold)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            />
          ))}


        </svg>

        {/* Dark cinematic gradient for text readability */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,18,32,0.85) 0%, rgba(11,18,32,0.55) 35%, rgba(11,18,32,0.15) 65%, rgba(11,18,32,0.5) 100%)",
          }}
        />
        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10"
        >
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <p className="font-sanskrit text-sm text-[var(--gold-soft)]">
                विद्या अमृतमश्नुते ।
              </p>
            </div>

            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-[var(--parchment)] sm:text-5xl lg:text-6xl">
              WHERE IDEAS
              <br />
              <span className="italic text-[var(--gold-soft)]">TAKE FLIGHT</span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--parchment)]/80 md:mx-0">
              From classrooms to code, from curiosity to creation — this is
              where the future begins.
            </p>

            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-block rounded-full border border-[var(--gold)] bg-transparent px-8 py-3 text-xs uppercase tracking-[0.3em] text-[var(--gold-soft)] transition-shadow duration-300 hover:shadow-[0_0_40px_-6px_var(--gold)]"
            >
              Know Our College
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* bottom hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--navy)] to-transparent"
      />
    </section>
  );
}
