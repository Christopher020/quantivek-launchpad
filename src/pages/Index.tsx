import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { BlogSection } from "@/components/BlogSection";
import { About } from "@/components/About";
import { NewsletterSubscribe } from "@/components/NewsletterSubscribe";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
