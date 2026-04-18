import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

const LampScene = lazy(() => import("./three/LampScene"));

const HEADING = "Gələcəyin liderləri buradan başlayır";

export const Hero = () => {
  const [on, setOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Split heading once for letter-by-letter
  const letters = HEADING.split("");

  return (
    <section className="relative min-h-screen w-full overflow-hidden noise">
      {/* Dark red vignette on edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(0 70% 8% / 0.55) 100%)",
        }}
      />
      {/* Subtle ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[8%] h-96 w-96 rounded-full bg-primary/8 blur-[160px]" />
        <div className="absolute bottom-1/4 right-[8%] h-96 w-96 rounded-full bg-[hsl(0,60%,25%)]/20 blur-[160px]" />
      </div>

      {/* Amber wash when lamp on */}
      <AnimatePresence>
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: "var(--gradient-hero-amber)" }}
          />
        )}
      </AnimatePresence>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-screen pt-24 pb-12">
        {/* Left: 3D pendant lamp */}
        <div className="relative h-[60vh] lg:h-[88vh] order-2 lg:order-1 -mt-16 lg:-mt-24">
          {!isMobile ? (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Səhnə yüklənir…
                </div>
              }
            >
              <LampScene on={on} onToggle={() => setOn((v) => !v)} />
            </Suspense>
          ) : (
            // Mobile static fallback — tap to toggle
            <div
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setOn((v) => !v)}
            >
              {/* hanging cord */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-b from-white/20 to-white/5" />
              <div
                className={`relative h-56 w-56 rounded-full transition-all duration-700 ${
                  on ? "bg-accent/40 blur-3xl" : "bg-muted/20 blur-xl"
                }`}
              />
              <svg viewBox="0 0 100 120" className="absolute h-72 w-72">
                <line x1="50" y1="0" x2="50" y2="40" stroke="#2a2a35" strokeWidth="1" />
                <path
                  d="M 30 45 A 20 14 0 0 0 70 45 L 70 50 L 30 50 Z"
                  fill={on ? "#2a1f12" : "#15151c"}
                  stroke={on ? "#ffb648" : "#444"}
                  strokeWidth="0.8"
                />
                <circle cx="50" cy="58" r="4" fill={on ? "#fff1c0" : "#222"} />
                {/* pull cord */}
                <line x1="58" y1="50" x2="58" y2="78" stroke={on ? "#c98a3a" : "#444"} strokeWidth="0.8" />
                <circle cx="58" cy="80" r="2.5" fill={on ? "#c98a3a" : "#5a3a1f"} />
              </svg>
            </div>
          )}

          {/* Pull-cord hint */}
          <AnimatePresence>
            {!on && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-muted-foreground"
              >
                <span className="tracking-wide">işığı yandır</span>
                <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: text */}
        <div className="relative order-1 lg:order-2">
          <motion.div
            animate={{ opacity: on ? 1 : 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-primary ${on ? "animate-pulse" : ""}`}
              />
              WAY tərəfindən təqdim olunur
            </div>

            {/* Letter-by-letter heading */}
            <h1 className="display-font text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={false}
                  animate={{
                    opacity: on ? 1 : 0.35,
                    y: on ? 0 : 4,
                    filter: on ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{
                    delay: on ? i * 0.025 : 0,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <motion.p
              animate={{ y: on ? 0 : 8, opacity: on ? 1 : 0.4 }}
              transition={{ duration: 0.7, delay: on ? 0.6 : 0 }}
              className="text-lg text-muted-foreground max-w-md"
            >
              <span className="text-foreground/90">Maliyyə</span>
              <span className="text-primary mx-2">·</span>
              <span className="text-foreground/90">Biznes</span>
              <span className="text-primary mx-2">·</span>
              <span className="text-foreground/90">Şəhərsalma</span>
            </motion.p>

            <motion.div
              animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
              transition={{ duration: 0.6, delay: on ? 0.9 : 0 }}
              className="flex flex-wrap gap-3 pt-2"
              style={{ pointerEvents: on ? "auto" : "none" }}
            >
              <a
                href="#programs"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-all glow-primary"
              >
                Proqrama bax
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                Müraciət et
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground"
          >
            <span>Aşağı sürüşdür</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
