import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, MessageSquare, TrendingUp, CheckCircle2, Calendar } from "lucide-react";

export const DashboardReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.05]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.3, 1, 1]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">Tələbə paneli</span>
          <h2 className="display-font text-4xl md:text-5xl font-bold mt-4">
            Hər addımı <span className="text-gradient">izlə</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Modulları, mentor söhbətlərini və sertifikatlarını bir yerdən idarə et.
          </p>
        </motion.div>

        <div className="relative">
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary/60"
                style={{
                  left: `${(i * 73) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <motion.div
            style={{ scale, opacity, y, filter }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Browser frame */}
            <div className="rounded-2xl overflow-hidden glass-strong shadow-[0_40px_120px_-30px_rgba(29,158,117,0.4)]">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-muted-foreground inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    app.genix.az/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8 bg-gradient-to-br from-background to-[#0d0d14]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground">Xoş gəldin,</div>
                    <div className="text-lg font-semibold">Aysel M.</div>
                  </div>
                  <div className="glass rounded-full px-3 py-1 text-xs">Modul 4 / 6</div>
                </div>

                {/* Progress */}
                <div className="glass rounded-2xl p-5 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" /> Ümumi irəliləyiş
                    </span>
                    <span className="text-sm text-primary font-semibold">68%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_20px_hsl(var(--primary))]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Modules */}
                  <div className="glass rounded-2xl p-5 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium">
                      <BookOpen className="h-4 w-4 text-primary" /> Növbəti modullar
                    </div>
                    <ul className="space-y-3">
                      {[
                        { t: "Korporativ maliyyə əsasları", d: "Sabah · 19:00", done: false },
                        { t: "Biznes model canvas", d: "Cümə · 18:30", done: false },
                        { t: "Bazar araşdırması", d: "Tamamlandı", done: true },
                      ].map((m) => (
                        <li key={m.t} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                m.done ? "bg-primary" : "bg-secondary animate-pulse"
                              }`}
                            />
                            <span className={m.done ? "text-muted-foreground line-through" : ""}>
                              {m.t}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {m.d}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mentor chat */}
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium">
                      <MessageSquare className="h-4 w-4 text-secondary" /> Mentor söhbəti
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg rounded-tl-sm p-2.5 text-xs">
                        Pitch deck-ini yoxladım, struktur əla.
                      </div>
                      <div className="bg-primary/15 border border-primary/20 rounded-lg rounded-tr-sm p-2.5 text-xs ml-6 text-right">
                        Sağ olun! Sabah görüşürük 🙌
                      </div>
                    </div>
                  </div>

                  {/* Certificate */}
                  <div className="glass rounded-2xl p-5 md:col-span-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Sertifikat irəliləyişi</div>
                        <div className="text-xs text-muted-foreground">2 modul qaldı</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary">
                      <CheckCircle2 className="h-4 w-4" /> Yolundasan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
