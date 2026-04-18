import { motion } from "framer-motion";
import { Clock, GraduationCap, Sparkles } from "lucide-react";

const stats = [
  { icon: Clock, value: "6 ay", label: "İntensiv proqram müddəti", accent: "primary" },
  { icon: GraduationCap, value: "48 saat", label: "Canlı təlim və workshop", accent: "secondary" },
  { icon: Sparkles, value: "100%", label: "Praktiki əsaslı təcrübə", accent: "primary" },
];

export const Stats = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">Niyə GeniX</span>
          <h2 className="display-font text-4xl md:text-5xl font-bold mt-4">
            Rəqəmlərlə <span className="text-gradient">təsir</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                type: "spring",
                stiffness: 90,
                damping: 14,
              }}
              className="group relative glass rounded-3xl p-8 hover:bg-white/[0.06] transition-all"
            >
              <div
                className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm ${
                  s.accent === "primary"
                    ? "bg-gradient-to-br from-primary/40 to-transparent"
                    : "bg-gradient-to-br from-secondary/40 to-transparent"
                }`}
              />
              <div className="relative">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-6 ${
                    s.accent === "primary"
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary/15 text-secondary"
                  }`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="display-font text-5xl font-bold mb-2">{s.value}</div>
                <p className="text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
