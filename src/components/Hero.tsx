import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-accent/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/4 right-[15%] w-32 h-32 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Software Agency for Growth</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            We Build{" "}
            <span className="gradient-text">High-Converting</span>{" "}
            software and operate scalable SaaS products for startups and SMEs.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Custom web applications, mobile apps, and digital solutions that help businesses grow, automate operations, and scale efficiently.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-xl glow-effect"
            >
              <a href="#contact">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-6 text-lg rounded-xl border-2"
            >
              <a href="#work">View Our Work</a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              <div className="font-display font-semibold text-xl text-foreground">TechStart</div>
              <div className="font-display font-semibold text-xl text-foreground">GrowthLabs</div>
              <div className="font-display font-semibold text-xl text-foreground">ScaleUp</div>
              <div className="font-display font-semibold text-xl text-foreground">InnovateCo</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
