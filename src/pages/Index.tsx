import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Infrastructure } from "@/components/Infrastructure";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { About } from "@/components/About";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Quantivek | High-Converting Software for Startups & SMEs"
        description="Quantivek builds custom web applications, mobile apps, and scalable SaaS products for startups and SMEs. Transform your vision and accelerate growth."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Quantivek",
          url: "https://www.quantivek.com",
          description:
            "Quantivek builds high-converting web, mobile, and SaaS software for startups and SMEs.",
          areaServed: "NG",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          sameAs: [
            "https://twitter.com/quantivek",
            "https://linkedin.com/company/quantivek",
          ],
        }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Infrastructure />
      <ProjectsSection />
      <BlogSection />
      <About />
      <NewsletterSubscribe />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
