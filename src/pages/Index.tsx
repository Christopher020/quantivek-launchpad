import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
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
      />
      <Navbar />
      <Hero />
      <Services />
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
