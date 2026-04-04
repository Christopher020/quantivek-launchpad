import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollAnimation } from "./ScrollAnimation";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.length > 255) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed!", description: "You're already on our mailing list." });
          setSubscribed(true);
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        toast({ title: "Subscribed!", description: "You'll be notified about new projects and blog posts." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Stay in the Loop
          </h3>
          <p className="text-muted-foreground mb-8">
            Get notified when we publish new projects, case studies, and blog posts. No spam, ever.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-accent font-medium">
              <CheckCircle className="w-5 h-5" />
              You're subscribed! We'll keep you updated.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
        </ScrollAnimation>
      </div>
    </section>
  );
}
