import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-09-15T09:00:00").getTime();

function getRemaining() {
  const diff = Math.max(0, EVENT_DATE - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const LABELS: Array<{ key: keyof ReturnType<typeof getRemaining>; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function Separator() {
  return (
    <div
      aria-hidden
      className="hidden md:flex h-24 flex-col items-center justify-center gap-1.5"
    >
      <span className="h-1 w-1 rounded-full bg-[var(--gold)]/70" />
      <span className="h-1 w-1 rounded-full bg-[var(--gold)]/40" />
      <span className="h-1 w-1 rounded-full bg-[var(--gold)]/70" />
    </div>
  );
}

export function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-parchment-texture py-28 md:py-36">
      {/* Smooth transition from previous dark section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--navy)]/90 to-transparent"
      />

      {/* Soft radial glow behind timer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 60%)",
        }}
      />

      {/* Faint mandala watermark */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        viewBox="0 0 500 500"
      >
        <g fill="none" stroke="#C28A3A" strokeWidth="0.6">
          <circle cx="250" cy="250" r="240" />
          <circle cx="250" cy="250" r="200" strokeDasharray="2 6" />
          <circle cx="250" cy="250" r="150" />
          <circle cx="250" cy="250" r="100" strokeDasharray="1 4" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="250"
              y1="10"
              x2="250"
              y2="50"
              transform={`rotate(${(360 / 24) * i} 250 250)`}
            />
          ))}
        </g>
      </svg>

      {/* Floating dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--gold)]/40"
            style={{
              left: `${(i * 67) % 100}%`,
              top: `${15 + ((i * 29) % 70)}%`,
            }}
            animate={{ y: [0, -25, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 7 + (i % 3),
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 text-center">
        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--gold)]" />
            <p className="font-sanskrit text-sm tracking-wide text-[var(--bronze)]">
              आरम्भः नवसृजनस्य
            </p>
            <span className="h-px w-10 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-[var(--navy)] sm:text-5xl lg:text-6xl">
            THE INNOVATION{" "}
            <span className="italic text-[var(--gold)]">BEGINS IN</span>
          </h2>
        </motion.div>

        {/* Countdown cards */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-4">
          {LABELS.map(({ key, label }, idx) => (
            <div key={key} className="flex items-center gap-4 md:gap-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15 * idx, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="group relative w-40 sm:w-44 md:w-44 lg:w-48"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 5 + idx,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative overflow-hidden rounded-2xl border border-[var(--gold)]/40 bg-[#FBF7EC] px-6 py-8 shadow-[0_10px_40px_-20px_rgba(194,138,58,0.35)] transition-shadow duration-500 group-hover:shadow-[0_15px_50px_-15px_rgba(194,138,58,0.55)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 15%, transparent), transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="font-display text-6xl font-light leading-none tracking-tight text-[var(--navy)] sm:text-7xl overflow-hidden h-[1em]">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={pad(time[key])}
                          initial={{ y: "60%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "-60%", opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block tabular-nums"
                        >
                          {pad(time[key])}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-[var(--bronze)]">
                      {label}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 h-2 w-2 border-l border-t border-[var(--gold)]/60"
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 h-2 w-2 border-r border-t border-[var(--gold)]/60"
                  />
                  <span
                    aria-hidden
                    className="absolute left-3 bottom-3 h-2 w-2 border-l border-b border-[var(--gold)]/60"
                  />
                  <span
                    aria-hidden
                    className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-[var(--gold)]/60"
                  />
                </motion.div>
              </motion.div>
              {idx < LABELS.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        {/* Bottom ornamental divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex items-center justify-center gap-4"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-[var(--gold)]/60" />
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--gold)]">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="8" strokeDasharray="1 2" />
            </g>
          </svg>
          <span className="font-sanskrit text-xs tracking-wide text-[var(--bronze)]">
            ॐ
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--gold)]">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="8" strokeDasharray="1 2" />
            </g>
          </svg>
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-[var(--gold)]/60" />
        </motion.div>
      </div>
    </section>
  );
}
