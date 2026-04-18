import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Building2, Check } from "lucide-react";

type Program = {
  title: string;
  tagline: string;
  icon: typeof BarChart3;
  features: string[];
  glow: "primary" | "secondary";
};

const programs: Program[] = [
  {
    title: "Maliyyə və Biznes Məktəbi",
    tagline: "6 aylıq intensiv proqram",
    icon: BarChart3,
    features: [
      "Korporativ maliyyə və hesabatlıq",
      "Biznes model və strategiya",
      "Sahibkarlıq və startup launch",
      "Real şirkət case study-ləri",
      "Mentor dəstəkli pitch hazırlığı",
    ],
    glow: "primary",
  },
  {
    title: "UrbanFuture Hakaton",
    tagline: "48 saatlıq şəhərsalma marafonu",
    icon: Building2,
    features: [
      "Ağıllı şəhər həlləri",
      "Şəhərsalma və urbanistika",
      "Komanda işi və prototip",
      "Beynəlxalq jüri qiymətləndirməsi",
      "Qaliblərə qrant və mentorluq",
    ],
    glow: "secondary",
  },
];

function ProgramCard({ p }: { p: Program }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 8 });
  };

  const isPrimary = p.glow === "primary";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative shrink-0 w-[88vw] md:w-[520px] preserve-3d"
    >
      {/* Glow */}
      <div
        className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${
          isPrimary
            ? "bg-gradient-to-br from-primary via-primary-glow to-transparent"
            : "bg-gradient-to-br from-secondary via-secondary-glow to-transparent"
        }`}
      />
      <div className="relative glass-strong rounded-3xl p-8 md:p-10 h-full">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-6 ${
            isPrimary ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"
          }`}
        >
          <p.icon className="h-7 w-7" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {p.tagline}
        </div>
        <h3 className="display-font text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {p.title}
        </h3>
        <ul className="space-y-3 mb-8">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
              <Check
                className={`h-4 w-4 mt-0.5 shrink-0 ${
                  isPrimary ? "text-primary" : "text-secondary"
                }`}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href="#apply"
          className={`group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            isPrimary
              ? "bg-primary text-primary-foreground hover:bg-primary-glow glow-primary"
              : "bg-secondary text-secondary-foreground hover:bg-secondary-glow glow-secondary"
          }`}
        >
          Daha ətraflı
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export const Programs = () => {
  return (
    <section id="programs" className="relative py-32 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">Proqramlar</span>
          <h2 className="display-font text-4xl md:text-5xl font-bold mt-4">
            İki istiqamət, <span className="text-gradient">bir vizyon</span>
          </h2>
        </motion.div>
      </div>

      <div className="overflow-x-auto scrollbar-hide pb-8">
        <div className="flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]">
          {programs.map((p) => (
            <ProgramCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
