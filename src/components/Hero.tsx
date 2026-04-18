import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";

const LampScene = lazy(() => import("./three/LampScene"));

export const Hero = () => {
  const [on, setOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden noise">
      {/* Ambient red/green glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-[10%] h-96 w-96 rounded-full bg-[hsl(0,60%,30%)]/15 blur-[140px]" />
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
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-screen pt-24 pb-12">
        {/* Left: 3D lamp */}
        <div className="relative h-[55vh] lg:h-[80vh] order-2 lg:order-1">
          {!isMobile ? (
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Səhnə yüklənir…</div>}>
              <LampScene on={on} onToggle={() => setOn((v) => !v)} />
            </Suspense>
          ) : (
            // Mobile static fallback
            <div
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setOn((v) => !v)}
            >
              <div className={`relative h-64 w-64 rounded-full transition-all duration-700 ${on ? "bg-accent/30 blur-2xl" : "bg-muted/20 blur-xl"}`} />
              <svg viewBox="0 0 100 100" className="absolute h-48 w-48">
                <line x1="50" y1="85" x2="50" y2="55" stroke={on ? "#ffb648" : "#444"} strokeWidth="2" />
                <line x1="50" y1="55" x2="70" y2="35" stroke={on ? "#ffb648" : "#444"} strokeWidth="2" />
                <path d="M 60 25 L 80 45 L 70 50 L 50 30 Z" fill={on ? "#3a2e1a" : "#1f1f28"} stroke={on ? "#ffb648" : "#666"} />
                <circle cx="65" cy="38" r="4" fill={on ? "#fff1c0" : "#222"} />
                <ellipse cx="50" cy="88" rx="14" ry="3" fill="#1a1a22" />
              </svg>
            </div>
          )}

          {/* Click hint */}
          <AnimatePresence>
            {!on && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground"
              >
                <MousePointerClick className="w-4 h-4 animate-pulse text-primary" />
                <span>Lampaya toxun — işığı yandır</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: text */}
        <div className="relative order-1 lg:order-2">
          <AnimatePresence mode="wait">
            {on ? (
              <motion.div
                key="on"
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  WAY tərəfindən təqdim olunur
                </div>
                <h1 className="display-font text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
                  Gələcəyin liderləri{" "}
                  <span className="text-gradient">buradan başlayır</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  <span className="text-foreground/90">Maliyyə</span>
                  <span className="text-primary mx-2">·</span>
                  <span className="text-foreground/90">Biznes</span>
                  <span className="text-primary mx-2">·</span>
                  <span className="text-foreground/90">Şəhərsalma</span>
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
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
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="off"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 opacity-25"
              >
                <div className="h-3 w-32 rounded bg-muted" />
                <div className="space-y-3">
                  <div className="h-12 w-full rounded bg-muted" />
                  <div className="h-12 w-3/4 rounded bg-muted" />
                </div>
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="text-xs text-muted-foreground/60 mt-6 italic">
                  …otaq qaranlıqdır
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
