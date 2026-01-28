import { Globe, Smartphone, Code, Zap, Shield, TrendingUp } from "lucide-react";
import { ScrollAnimation } from "./ScrollAnimation";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description: "Custom web apps built with modern technologies that scale with your business and deliver exceptional user experiences.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that engage users and drive conversions on iOS and Android.",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions designed to automate processes and solve your unique business challenges.",
  },
  {
    icon: Zap,
    title: "API Development",
    description: "Robust and scalable APIs that connect your systems and enable seamless data flow across platforms.",
  },
  {
    icon: Shield,
    title: "Cloud Solutions",
    description: "Secure cloud infrastructure and deployment strategies that ensure reliability and performance at scale.",
  },
  {
    icon: TrendingUp,
    title: "Digital Strategy",
    description: "Strategic consulting to help you leverage technology for maximum business impact and competitive advantage.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Solutions That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine technical excellence with business acumen to deliver software that not only works flawlessly but also drives measurable growth.
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={service.title} delay={index * 0.1} direction="up">
              <div className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 card-hover h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
