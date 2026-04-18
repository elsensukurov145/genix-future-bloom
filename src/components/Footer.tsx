import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { GeniXLogo } from "./GeniXLogo";

export const Footer = () => {
  return (
    <footer className="relative pt-12 pb-10 overflow-hidden">
      {/* Animated gradient line */}
      <div className="absolute top-0 inset-x-0 h-px overflow-hidden">
        <div
          className="h-full w-[200%] animate-gradient-x"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-lg">
            <GeniXLogo />
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm font-medium tracking-wider">WAY</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-all"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2025 GeniX · Bakı, Azərbaycan</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Məxfilik</a>
            <a href="#" className="hover:text-foreground transition-colors">Şərtlər</a>
            <a href="#apply" className="hover:text-foreground transition-colors">Əlaqə</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
