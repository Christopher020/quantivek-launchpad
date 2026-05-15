import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, FolderOpen, FileText, Users } from "lucide-react";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminBlogPosts } from "@/components/admin/AdminBlogPosts";
import { AdminSubscribers } from "@/components/admin/AdminSubscribers";
import quantivekLogo from "@/assets/quantivek-logo.png";
import { SEO } from "@/components/SEO";

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={quantivekLogo} alt="Quantivek" className="h-8 w-auto" />
            <span className="font-display font-semibold text-foreground">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
          <TabsContent value="blog">
            <AdminBlogPosts />
          </TabsContent>
          <TabsContent value="subscribers">
            <AdminSubscribers />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
