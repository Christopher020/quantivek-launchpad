import { Users, Award, Clock, Heart } from "lucide-react";
import { ScrollAnimation } from "./ScrollAnimation";

const stats = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Award, value: "100+", label: "Projects Delivered" },
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Heart, value: "98%", label: "Client Satisfaction" },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <ScrollAnimation direction="right">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">About Quantivek</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Your Partner in{" "}
              <span className="gradient-text">Digital Innovation</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Quantivek is a forward-thinking software agency dedicated to helping startups and SMEs achieve their digital ambitions. We combine technical excellence with a deep understanding of business needs to deliver solutions that truly make a difference.
              </p>
              <p>
                Our team of skilled developers, designers, and strategists work collaboratively to transform your ideas into powerful digital products. We don't just build software—we build partnerships that drive sustainable growth.
              </p>
              <p>
                From initial concept to launch and beyond, we're committed to your success. Our agile approach ensures transparency, flexibility, and results at every stage of your project.
              </p>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          <ScrollAnimation direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-6 sm:p-8 border border-border text-center card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
