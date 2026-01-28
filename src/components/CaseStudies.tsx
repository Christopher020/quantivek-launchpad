import { ArrowUpRight } from "lucide-react";
import { ScrollAnimation } from "./ScrollAnimation";
import { Badge } from "@/components/ui/badge";

const caseStudies = [
  {
    title: "E-Commerce Platform Redesign",
    client: "TechStart Retail",
    description: "Complete redesign and development of a B2C e-commerce platform with modern UX, payment integration, and inventory management.",
    results: [
      { metric: "156%", label: "Increase in Conversions" },
      { metric: "3.2s", label: "Faster Load Time" },
      { metric: "42%", label: "Revenue Growth" },
    ],
    tags: ["React", "Node.js", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    title: "Fintech Mobile Application",
    client: "PayFlow Solutions",
    description: "Cross-platform mobile app for seamless payments, savings management, and financial tracking with bank-level security.",
    results: [
      { metric: "50K+", label: "Active Users" },
      { metric: "4.8★", label: "App Store Rating" },
      { metric: "89%", label: "User Retention" },
    ],
    tags: ["React Native", "Firebase", "Plaid API"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
  },
  {
    title: "Healthcare Management System",
    client: "MediCare Plus",
    description: "Comprehensive clinic management system with patient records, appointment scheduling, and telemedicine capabilities.",
    results: [
      { metric: "60%", label: "Time Saved on Admin" },
      { metric: "95%", label: "Patient Satisfaction" },
      { metric: "2X", label: "Patient Capacity" },
    ],
    tags: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
  },
];

export function CaseStudies() {
  return (
    <section id="work" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Real Results for Real Businesses
          </h2>
          <p className="text-lg text-muted-foreground">
            We measure our success by the impact we create for our clients. Here's how we've helped businesses transform and grow.
          </p>
        </ScrollAnimation>

        <div className="space-y-16 lg:space-y-24">
          {caseStudies.map((study, index) => (
            <ScrollAnimation key={study.title} delay={0.1} direction={index % 2 === 0 ? "left" : "right"}>
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-accent font-medium mb-2">{study.client}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center p-4 bg-secondary/50 rounded-xl">
                        <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                          {result.metric}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
