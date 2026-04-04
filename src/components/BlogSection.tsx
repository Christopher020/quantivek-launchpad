import { ScrollAnimation } from "./ScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function BlogSection() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  // Don't render the section at all if there are no published posts
  if (isLoading || !posts?.length) return null;

  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Blog</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
            Insights & Perspectives
          </h2>
          <p className="text-lg text-muted-foreground">
            Thoughts on technology, business, and building great software products.
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <ScrollAnimation key={post.id} delay={index * 0.1} direction="up">
              <Link to={`/blog/${post.slug}`} className="block h-full group">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 card-hover h-full flex flex-col">
                  {post.image_url ? (
                    <div className="overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <span className="font-display text-lg text-accent/40">{post.title}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full text-xs px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all mt-auto">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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
