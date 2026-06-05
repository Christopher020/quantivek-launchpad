import { Server, Camera, Lock, Monitor, Wifi, Network, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "./ScrollAnimation";
import { Link } from "react-router-dom";

const infrastructure = [
  {
    icon: Server,
    title: "Server Room Setup",
    slug: "server-room-setup",
    description: "Rack installation, structured cabling, UPS, cooling, and remote monitoring for businesses and enterprises.",
  },
  {
    icon: Camera,
    title: "CCTV & Surveillance",
    slug: "cctv-surveillance",
    description: "IP camera installation, full-coverage surveillance design, and remote viewing setup for offices and residences.",
  },
  {
    icon: Lock,
    title: "Access Control",
    slug: "access-control",
    description: "Biometric, card-based, and PIN access installation to secure entrances and manage staff movement.",
  },
  {
    icon: Monitor,
    title: "Computer Lab Setup",
    slug: "computer-lab-setup",
    description: "Full workstation deployment, networking, and software configuration for schools, CBT centers, and businesses.",
  },
  {
    icon: Wifi,
    title: "Starlink Installation",
    slug: "starlink-installation",
    description: "Residential and commercial Starlink setup with WiFi mesh distribution for reliable connectivity anywhere.",
  },
  {
    icon: Network,
    title: "Network & WiFi",
    slug: "network-wifi",
    description: "LAN/WAN setup, structured cabling, and enterprise WiFi deployment for offices of all sizes.",
  },
];

export function Infrastructure() {
  return (
    <section id="infrastructure" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Infrastructure & IT Setup</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Infrastructure & IT Setup
          </h2>
          <p className="text-lg text-muted-foreground">
            Beyond software — we design, install, and commission the physical and network infrastructure your business runs on. From server rooms to Starlink, we handle it end to end.
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {infrastructure.map((service, index) => (
            <ScrollAnimation key={service.title} delay={index * 0.1} direction="up">
              <Link to={`/services/${service.slug}`} className="block h-full">
                <div className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 card-hover h-full">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
