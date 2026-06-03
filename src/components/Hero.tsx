import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 px-6">
      {/* Background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,hsl(var(--background)))]" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="px-4 py-1.5 border border-border rounded-full text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            Est. 2021 <span className="mx-2 text-accent/70">·</span> Incorporated in Nigeria
          </span>
        </motion.div>

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 md:mb-10"
        >
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
            <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C23.5 35 26.75 33.75 29.25 31.75L33 35.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 12V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2.5" fill="hsl(var(--accent))" />
          </svg>
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif font-light tracking-tight leading-[0.95] text-foreground select-none mb-8 md:mb-10 text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem]"
        >
          Quantivek
        </motion.h1>

        {/* Thin Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px bg-border mb-8 md:mb-10"
        />

        {/* Sub-paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-xl text-muted-foreground text-sm md:text-base font-light leading-relaxed tracking-wide mb-16 md:mb-20"
        >
          A Lagos-based technology company operating at the intersection of software engineering and IT infrastructure.
          We build, scale, and operate <span className="text-foreground">high-converting</span> SaaS products
          and end-to-end IT infrastructure solutions for Nigerian startups, SMEs, schools, and enterprises.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 mb-16 md:mb-20 w-full max-w-3xl border-y border-border py-10"
        >
          {[
            { value: "2021", label: "Founded" },
            { value: "Lagos", label: "Headquarters" },
            { value: "SaaS & IT Infrastructure", label: "Specialty" },
            { value: "30+", label: "Projects Shipped" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-serif text-foreground mb-2">{stat.value}</span>
              <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="px-10 py-4 bg-foreground text-background text-[11px] font-semibold tracking-[0.18em] uppercase transition-all hover:opacity-90"
          >
            Book a Free 30-Minute Consultation
          </a>
          <a
            href="#work"
            className="px-10 py-4 border border-border text-foreground text-[11px] font-semibold tracking-[0.18em] uppercase transition-all hover:bg-foreground hover:text-background"
          >
            View Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
