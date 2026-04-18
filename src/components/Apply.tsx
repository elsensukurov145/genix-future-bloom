import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EMAILJS_SERVICE_ID = "service_m9x4g39";
const EMAILJS_TEMPLATE_ID = "template_1tz5ima";
const EMAILJS_PUBLIC_KEY = "8Ah88Hkucs4TC9RGX";
const RECIPIENT_EMAIL = "shukurovelshan388@gmail.com";

export const Apply = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const fireConfetti = () => {
    const end = Date.now() + 800;
    const colors = ["#1D9E75", "#378ADD", "#ffb648", "#ffffff"];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || loading) return;

    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: email,
          to_email: RECIPIENT_EMAIL,
          message: `Yeni GeniX müraciəti: ${email}`,
          from_page: "GeniX Landing — Apply",
          submitted_at: new Date().toLocaleString("az-AZ"),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      fireConfetti();
      setDone(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      toast({
        title: "Göndərilmədi",
        description: "Müraciətin göndərilməsində xəta baş verdi. Bir az sonra yenidən cəhd et.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="relative py-32 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow border */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary via-primary-glow to-primary opacity-60 blur-xl animate-pulse-glow" />
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-primary via-primary-glow to-primary" />

          <div className="relative rounded-[calc(2rem-1px)] bg-background p-8 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary/30 blur-[80px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Növbəti dövr açıqdır
              </div>
              <h2 className="display-font text-4xl md:text-5xl font-bold mb-4">
                {done ? "Müraciətin alındı 🎉" : (
                  <>Hazırsan <span className="text-gradient">başlamağa?</span></>
                )}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {done
                  ? "Tezliklə komandamız səninlə əlaqə saxlayacaq. Yoluna davam et — gələcək parlaq görünür."
                  : "E-poçtunu qoy, müraciət linkini və proqram detallarını göndərək."}
              </p>

              {!done ? (
                <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sən@example.com"
                      disabled={loading}
                      className="w-full glass rounded-full pl-11 pr-4 py-3.5 text-sm bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60 placeholder:text-muted-foreground/60 disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-all glow-primary disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        Göndərilir
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Müraciət et
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="inline-flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" /> Təşəkkür edirik!
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
