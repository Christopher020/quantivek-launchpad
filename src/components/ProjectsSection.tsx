import { ArrowUpRight } from "lucide-react";
import { ScrollAnimation } from "./ScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ResultItem {
  metric: string;
  label: string;
}

export function ProjectsSection() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["public-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="work" className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-64 mx-auto" />
            <div className="h-4 bg-secondary rounded w-96 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!projects?.length) {
    return (
      <section id="work" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center max-w-3xl mx-auto">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Work</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Real Results for Real Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              We're currently working on exciting projects. Check back soon to see our latest work and the results we've achieved for our clients.
            </p>
          </ScrollAnimation>
        </div>
      </section>
    );
  }

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
          {projects.map((project, index) => {
            const results = Array.isArray(project.results) ? (project.results as unknown as ResultItem[]) : [];
            return (
              <ScrollAnimation key={project.id} delay={0.1} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative group overflow-hidden rounded-2xl">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full aspect-[16/10] bg-secondary/50 flex items-center justify-center rounded-2xl">
                          <span className="text-muted-foreground font-display text-2xl">{project.title}</span>
                        </div>
                      )}
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
                    {project.client && (
                      <p className="text-accent font-medium mb-2">{project.client}</p>
                    )}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    {results.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {results.map((result, i) => (
                          <div key={i} className="text-center p-4 bg-secondary/50 rounded-xl">
                            <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                              {result.metric}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
