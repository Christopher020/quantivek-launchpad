import { useState } from "react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollAnimation } from "./ScrollAnimation";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const whatsappNumber = "2347012528929"; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Hi Quantivek! I'm interested in discussing a project.");

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Let's Build Something{" "}
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to transform your ideas into reality? Book a free 30-minute consultation and let's discuss how we can help grow your business.
          </p>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ScrollAnimation direction="right">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                Send us a message
              </h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>
                <Input
                  name="company"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-background"
                />
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-background resize-none"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-xl"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation direction="left" delay={0.2}>
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-accent/10 rounded-2xl p-6 sm:p-8 border border-accent/20">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Prefer a quick chat?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Send us a message on WhatsApp and we'll respond within a few hours.
                </p>
                <Button
                  asChild
                  className="bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold px-6 py-6 rounded-xl w-full sm:w-auto"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email Us</h4>
                    <a href="mailto:c.uchenna@quantivek.com" className="text-muted-foreground hover:text-accent transition-colors">
                      c.uchenna@quantivek.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Location</h4>
                    <p className="text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  Book a Free Consultation
                </h3>
                <p className="text-muted-foreground mb-4">
                  30 minutes to discuss your project requirements and how we can help.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="font-semibold border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                >
                  <a href="mailto:c.uchenna@quantivek.com?subject=Free Consultation Request">
                    Schedule Now
                  </a>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
