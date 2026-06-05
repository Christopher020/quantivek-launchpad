import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { Globe, Smartphone, Code, Zap, Shield, TrendingUp, Server, Camera, Lock, Monitor, Wifi, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { SEO } from "@/components/SEO";

const servicesData = {
  "web-applications": {
    icon: Globe,
    title: "Web Applications",
    subtitle: "Custom web apps built with modern technologies",
    description: "We build powerful, scalable web applications that transform your business operations and deliver exceptional user experiences. From complex enterprise systems to sleek customer-facing platforms, we leverage cutting-edge technologies to create solutions that grow with your business.",
    features: [
      "Custom dashboard and admin panels",
      "E-commerce platforms with payment integration",
      "Real-time collaboration tools",
      "Progressive Web Apps (PWAs)",
      "API integrations and third-party services",
      "Performance optimization and SEO",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    benefits: [
      {
        title: "Scalable Architecture",
        description: "Built to handle growth from hundreds to millions of users without major rewrites.",
      },
      {
        title: "Fast Performance",
        description: "Optimized load times and smooth interactions that keep users engaged.",
      },
      {
        title: "Secure by Design",
        description: "Industry-standard security practices protecting your data and users.",
      },
    ],
  },
  "mobile-apps": {
    icon: Smartphone,
    title: "Mobile Apps",
    subtitle: "Native and cross-platform mobile solutions",
    description: "We create mobile applications that users love. Whether you need a native iOS or Android app, or a cross-platform solution, we deliver polished, high-performance apps that drive engagement and conversions.",
    features: [
      "iOS and Android native development",
      "Cross-platform apps with React Native",
      "Offline-first functionality",
      "Push notifications and real-time updates",
      "App Store optimization (ASO)",
      "Analytics and user behavior tracking",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Redux", "GraphQL"],
    benefits: [
      {
        title: "Cross-Platform Efficiency",
        description: "One codebase that works beautifully on both iOS and Android.",
      },
      {
        title: "Native Performance",
        description: "Smooth animations and fast response times that feel truly native.",
      },
      {
        title: "Offline Capability",
        description: "Apps that work even without internet connection.",
      },
    ],
  },
  "custom-software": {
    icon: Code,
    title: "Custom Software",
    subtitle: "Tailored solutions for unique challenges",
    description: "Every business is unique, and sometimes off-the-shelf solutions just don't cut it. We develop custom software that perfectly fits your workflows, automates your processes, and solves your specific challenges.",
    features: [
      "Business process automation",
      "Legacy system modernization",
      "Custom CRM and ERP solutions",
      "Data migration and integration",
      "Workflow management systems",
      "Reporting and analytics dashboards",
    ],
    technologies: ["Python", "Node.js", "Java", "PostgreSQL", "Docker", "Kubernetes"],
    benefits: [
      {
        title: "Perfect Fit",
        description: "Software designed around your exact business processes and needs.",
      },
      {
        title: "Competitive Edge",
        description: "Unique capabilities that set you apart from competitors using generic tools.",
      },
      {
        title: "Full Ownership",
        description: "Complete control over your software with no vendor lock-in.",
      },
    ],
  },
  "api-development": {
    icon: Zap,
    title: "API Development",
    subtitle: "Robust and scalable API solutions",
    description: "APIs are the backbone of modern digital ecosystems. We design and build robust, well-documented APIs that enable seamless integration between your systems and third-party services.",
    features: [
      "RESTful API design and development",
      "GraphQL implementation",
      "API gateway and microservices",
      "Authentication and authorization",
      "Rate limiting and security",
      "Comprehensive API documentation",
    ],
    technologies: ["Node.js", "Python", "GraphQL", "REST", "OpenAPI", "Redis"],
    benefits: [
      {
        title: "Seamless Integration",
        description: "Connect your systems with any third-party service effortlessly.",
      },
      {
        title: "Developer-Friendly",
        description: "Clear documentation and consistent design patterns.",
      },
      {
        title: "High Availability",
        description: "Built for 99.9% uptime with proper error handling.",
      },
    ],
  },
  "cloud-solutions": {
    icon: Shield,
    title: "Cloud Solutions",
    subtitle: "Secure and scalable cloud infrastructure",
    description: "We help you leverage the power of cloud computing to build scalable, secure, and cost-effective infrastructure. From migration to optimization, we ensure your cloud strategy delivers real business value.",
    features: [
      "Cloud migration and modernization",
      "Infrastructure as Code (IaC)",
      "Container orchestration with Kubernetes",
      "CI/CD pipeline implementation",
      "Security and compliance",
      "Cost optimization and monitoring",
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Docker", "Kubernetes"],
    benefits: [
      {
        title: "Infinite Scale",
        description: "Infrastructure that grows automatically with your demand.",
      },
      {
        title: "Cost Efficiency",
        description: "Pay only for what you use with optimized resource allocation.",
      },
      {
        title: "Enterprise Security",
        description: "Bank-grade security and compliance certifications.",
      },
    ],
  },
  "digital-strategy": {
    icon: TrendingUp,
    title: "Digital Strategy",
    subtitle: "Strategic consulting for digital transformation",
    description: "Technology is only as good as the strategy behind it. We help you identify opportunities, prioritize investments, and create roadmaps that align technology with your business goals.",
    features: [
      "Digital transformation roadmaps",
      "Technology stack consulting",
      "Product strategy and planning",
      "User research and UX strategy",
      "Market analysis and competitive research",
      "Technical due diligence",
    ],
    technologies: ["Agile", "Design Thinking", "Lean Startup", "OKRs", "Analytics", "A/B Testing"],
    benefits: [
      {
        title: "Clear Direction",
        description: "A prioritized roadmap that guides your technology investments.",
      },
      {
        title: "Reduced Risk",
        description: "Make informed decisions backed by data and expertise.",
      },
      {
        title: "Faster Results",
        description: "Focus on high-impact initiatives that deliver quick wins.",
      },
    ],
  },
  "server-room-setup": {
    icon: Server,
    title: "Server Room Setup",
    subtitle: "Rack, power, cooling, and monitoring done right",
    description: "We design, build, and commission production-grade server rooms for businesses and enterprises. From rack installation and structured cabling to UPS, cooling, and remote monitoring — we deliver an environment your critical workloads can run on 24/7.",
    features: [
      "Rack and enclosure installation",
      "Structured cabling (Cat6/Cat6a, fiber)",
      "UPS sizing, installation, and battery management",
      "Precision cooling and airflow planning",
      "Remote monitoring and alerting",
      "Cable management, labelling, and documentation",
    ],
    technologies: ["APC UPS", "Cisco", "Ubiquiti", "Cat6a", "Fiber Optic", "Zabbix"],
    benefits: [
      { title: "Built for Uptime", description: "Redundant power, cooling, and connectivity so your business never stops." },
      { title: "On-Premise Control", description: "Keep sensitive workloads and data in-house with full physical control." },
      { title: "Scalable Design", description: "Racks and cabling planned for future expansion without rework." },
    ],
  },
  "cctv-surveillance": {
    icon: Camera,
    title: "CCTV & Surveillance",
    subtitle: "IP camera systems with full coverage and remote viewing",
    description: "We design and install professional IP-based CCTV systems for offices, residences, schools, and commercial properties. Full-coverage layouts, NVR setup, and mobile remote viewing — engineered for clarity day and night.",
    features: [
      "Site survey and coverage planning",
      "IP camera installation (indoor/outdoor)",
      "NVR/DVR setup with redundant storage",
      "Remote mobile and web viewing",
      "Night vision and low-light optimization",
      "Maintenance and support",
    ],
    technologies: ["Hikvision", "Dahua", "Axis", "IP/PoE", "NVR", "ONVIF"],
    benefits: [
      { title: "Full Coverage", description: "Strategic camera placement leaves no blind spots." },
      { title: "Remote Monitoring", description: "View live and recorded footage from anywhere on your phone." },
      { title: "Evidence-Grade Quality", description: "HD/4K footage that holds up when it matters most." },
    ],
  },
  "access-control": {
    icon: Lock,
    title: "Access Control Systems",
    subtitle: "Biometric, card, and PIN-based entry management",
    description: "Secure your facility and manage staff movement with modern access control. We install biometric, card-based, and PIN systems integrated with your doors, turnstiles, and time-attendance workflows.",
    features: [
      "Fingerprint and facial biometric readers",
      "RFID card and key fob systems",
      "PIN-based keypad entry",
      "Magnetic locks and electric strike installation",
      "Time and attendance integration",
      "Multi-door centralized management",
    ],
    technologies: ["ZKTeco", "Hikvision Access", "Suprema", "RFID", "Wiegand", "TCP/IP"],
    benefits: [
      { title: "Granular Control", description: "Decide who goes where and when, down to the individual." },
      { title: "Audit Trail", description: "Complete log of every entry and exit for compliance and security." },
      { title: "No More Keys", description: "Eliminate lost-key risks and rekeying costs forever." },
    ],
  },
  "computer-lab-setup": {
    icon: Monitor,
    title: "Computer Lab Setup",
    subtitle: "Turnkey labs for schools, CBT centers, and businesses",
    description: "End-to-end computer lab deployments — from workstation procurement guidance to LAN cabling, software imaging, and CBT platform configuration. We hand over labs that are ready for exams, training, or daily operations on day one.",
    features: [
      "Workstation procurement guidance",
      "LAN cabling and network configuration",
      "OS and software imaging across all seats",
      "CBT platform setup and testing",
      "User account and permission management",
      "Training and ongoing support",
    ],
    technologies: ["Windows", "Ubuntu", "Active Directory", "CBT Software", "Cat6", "Network Switches"],
    benefits: [
      { title: "Exam-Ready", description: "Labs configured and tested for CBT, WAEC, JAMB, and internal assessments." },
      { title: "Centrally Managed", description: "Push updates and policies across every workstation from one console." },
      { title: "Built to Last", description: "Quality cabling, surge protection, and standards that survive heavy daily use." },
    ],
  },
  "starlink-installation": {
    icon: Wifi,
    title: "Starlink Installation",
    subtitle: "High-speed satellite internet with mesh WiFi distribution",
    description: "Residential and commercial Starlink installations across Nigeria. We handle the dish mounting, alignment, router configuration, and full WiFi mesh distribution so every room and outdoor area gets fast, stable internet.",
    features: [
      "Starlink dish mounting and alignment",
      "Cable routing and weatherproofing",
      "Router and network configuration",
      "WiFi mesh deployment (whole-home/office)",
      "Speed and coverage testing",
      "Ongoing support and troubleshooting",
    ],
    technologies: ["Starlink", "TP-Link Deco", "Ubiquiti UniFi", "Mesh WiFi", "PoE", "Cat6"],
    benefits: [
      { title: "Fast & Reliable", description: "150+ Mbps speeds even in areas with poor fiber coverage." },
      { title: "Full Coverage", description: "Mesh WiFi ensures every room and outdoor space stays connected." },
      { title: "Professional Install", description: "Proper alignment, weatherproofing, and cable management that lasts." },
    ],
  },
  "network-wifi": {
    icon: Network,
    title: "Network & WiFi",
    subtitle: "LAN/WAN and enterprise WiFi for offices of all sizes",
    description: "We design and deploy reliable office networks — from structured cabling and switches to enterprise WiFi with seamless roaming. Whether you're a 10-person startup or a multi-floor company, we build networks that just work.",
    features: [
      "LAN and WAN design and deployment",
      "Structured cabling (Cat6/Cat6a/fiber)",
      "Enterprise WiFi with seamless roaming",
      "Managed switches and VLAN configuration",
      "Guest network and access control",
      "Network monitoring and support",
    ],
    technologies: ["Ubiquiti UniFi", "MikroTik", "Cisco", "TP-Link Omada", "Cat6a", "Fiber"],
    benefits: [
      { title: "Rock-Solid Reliability", description: "Engineered for uptime with redundancy where it counts." },
      { title: "Scales With You", description: "Add users, devices, and floors without ripping out infrastructure." },
      { title: "Centrally Managed", description: "One dashboard to monitor and configure your entire network." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? servicesData[slug as keyof typeof servicesData] : null;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#services");
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/" className="text-accent hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${service.title} | Quantivek`}
        description={service.description.slice(0, 155)}
        canonical={`/services/${slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: "Quantivek",
            url: "https://www.quantivek.com",
          },
          areaServed: "NG",
          url: `https://www.quantivek.com/services/${slug}`,
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation>
            <a
              href="/#services"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </a>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {service.subtitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 rounded-xl"
              >
                <Link to="/#contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  What's Included
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Technologies We Use
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We leverage industry-leading technologies to build robust, scalable solutions.
            </p>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="flex flex-wrap justify-center gap-4">
              {service.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-card rounded-full border border-border text-foreground font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver solutions that make a real difference to your business.
            </p>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <ScrollAnimation key={index} delay={index * 0.1} direction="up">
                <div className="bg-card rounded-2xl p-8 border border-border h-full">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how we can help you achieve your goals with {service.title.toLowerCase()}.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 rounded-xl"
            >
              <Link to="/#contact">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
