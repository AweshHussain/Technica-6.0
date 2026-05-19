import { motion } from "framer-motion";

/**
 * Animated Sanskrit-inspired mandala emblem.
 * Each ring rotates independently — different direction & speed.
 */
export function SanskritEmblem({ className = "" }: { className?: string }) {
  const gold = "var(--gold)";
  const bronze = "var(--bronze)";
  const navy = "var(--navy)";

  // 60 dots evenly spaced on a ring of radius r
  const dots = (r: number, count: number, size = 1.2) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={250 + Math.cos(a) * r}
          cy={250 + Math.sin(a) * r}
          r={size}
          fill={gold}
        />
      );
    });

  // Tick marks on a ring
  const ticks = (r: number, count: number, len = 8) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * 360;
      return (
        <line
          key={i}
          x1={250}
          y1={250 - r}
          x2={250}
          y2={250 - r - len}
          stroke={bronze}
          strokeWidth={0.7}
          transform={`rotate(${a} 250 250)`}
        />
      );
    });

  // Lotus petals
  const petals = (r1: number, r2: number, count: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * 360;
      return (
        <path
          key={i}
          d={`M 250 ${250 - r1} Q ${250 + 12} ${250 - (r1 + r2) / 2} 250 ${250 - r2} Q ${250 - 12} ${250 - (r1 + r2) / 2} 250 ${250 - r1} Z`}
          fill="none"
          stroke={gold}
          strokeWidth={0.8}
          opacity={0.85}
          transform={`rotate(${a} 250 250)`}
        />
      );
    });

  // Sanskrit-style ornamental triangles
  const ornaments = (r: number, count: number) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * 360;
      return (
        <path
          key={i}
          d={`M 250 ${250 - r} l 6 10 l -12 0 z`}
          fill={gold}
          opacity={0.7}
          transform={`rotate(${a} 250 250)`}
        />
      );
    });

  // Path for curved text
  const arcTop = "M 60 250 A 190 190 0 0 1 440 250";
  const arcBottom = "M 60 250 A 190 190 0 0 0 440 250";

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* soft glow */}
      <div
        className="absolute inset-[8%] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 35%, transparent), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <path id="arc-top" d={arcTop} />
          <path id="arc-bottom" d={arcBottom} />
        </defs>

        {/* Curved Sanskrit texts (static, sit on outer ring) */}
        <text
          fill={navy}
          style={{ fontFamily: "var(--font-sanskrit)", fontSize: 16, letterSpacing: 4 }}
        >
          <textPath href="#arc-top" startOffset="50%" textAnchor="middle">
            योगः कर्मसु कौशलम्।
          </textPath>
        </text>
        <text
          fill={navy}
          style={{ fontFamily: "var(--font-sanskrit)", fontSize: 16, letterSpacing: 4 }}
        >
          <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">
            ज्ञानं परमं बलम्।
          </textPath>
        </text>

        {/* Ring 1 — outer dotted, very slow CW */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle cx={250} cy={250} r={215} fill="none" stroke={gold} strokeWidth={0.5} opacity={0.6} />
          {dots(215, 80, 1.4)}
        </motion.g>

        {/* Ring 2 — tick marks, slow CCW */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle cx={250} cy={250} r={195} fill="none" stroke={bronze} strokeWidth={0.6} opacity={0.5} />
          {ticks(195, 48, 10)}
          <circle cx={250} cy={250} r={178} fill="none" stroke={gold} strokeWidth={0.4} opacity={0.5} />
        </motion.g>

        {/* Ring 3 — ornamental triangles, medium CW */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle cx={250} cy={250} r={162} fill="none" stroke={gold} strokeWidth={0.8} />
          {ornaments(162, 24)}
        </motion.g>

        {/* Ring 4 — lotus petals, medium-fast CCW */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          {petals(140, 95, 16)}
          <circle cx={250} cy={250} r={138} fill="none" stroke={bronze} strokeWidth={0.4} opacity={0.6} />
        </motion.g>

        {/* Ring 5 — inner decorative dots, fast CW */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle cx={250} cy={250} r={92} fill="none" stroke={gold} strokeWidth={0.6} />
          {dots(92, 36, 1)}
          <circle cx={250} cy={250} r={80} fill="none" stroke={gold} strokeWidth={0.4} opacity={0.7} />
        </motion.g>

        {/* Sacred geometry — six-point star (static, anchors the centre) */}
        <g opacity={0.45}>
          <polygon
            points="250,170 320,290 180,290"
            fill="none"
            stroke={bronze}
            strokeWidth={0.6}
          />
          <polygon
            points="250,330 320,210 180,210"
            fill="none"
            stroke={bronze}
            strokeWidth={0.6}
          />
        </g>

        {/* TA monogram — subtle CCW drift */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 440, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <circle cx={250} cy={250} r={62} fill="var(--parchment)" stroke={gold} strokeWidth={1} />
          <circle cx={250} cy={250} r={56} fill="none" stroke={gold} strokeWidth={0.4} opacity={0.5} />
        </motion.g>

        <text
          x={250}
          y={268}
          textAnchor="middle"
          fill={navy}
          style={{
            fontFamily: "var(--font-serif-display)",
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: 2,
          }}
        >
          TA
        </text>

        {/* tiny accent dots on monogram top/bottom */}
        <circle cx={250} cy={188} r={2} fill={gold} />
        <circle cx={250} cy={312} r={2} fill={gold} />
      </svg>
    </div>
  );
}
