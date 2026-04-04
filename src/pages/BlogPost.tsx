import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-64 bg-secondary rounded" />
            </div>
          ) : !post ? (
            <div className="text-center py-20">
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            </div>
          ) : (
            <article>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full aspect-[2/1] object-cover rounded-2xl mb-8"
                />
              )}
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
