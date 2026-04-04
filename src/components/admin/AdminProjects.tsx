import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface ResultItem {
  metric: string;
  label: string;
}

interface ProjectForm {
  title: string;
  slug: string;
  client: string;
  description: string;
  results: ResultItem[];
  tags: string;
  image_url: string;
  published: boolean;
}

const emptyForm: ProjectForm = {
  title: "", slug: "", client: "", description: "",
  results: [{ metric: "", label: "" }],
  tags: "", image_url: "", published: false,
};

export function AdminProjects() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (formData: ProjectForm) => {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        client: formData.client,
        description: formData.description,
        results: formData.results.filter(r => r.metric && r.label) as unknown as Json,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        image_url: formData.image_url,
        published: formData.published,
      };
      if (editing) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      setOpen(false);
      setEditing(null);
      setForm(emptyForm);
      toast({ title: editing ? "Project updated" : "Project created" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
      toast({ title: "Project deleted" });
    },
  });

  const openEdit = (project: any) => {
    const results = Array.isArray(project.results)
      ? (project.results as ResultItem[])
      : [{ metric: "", label: "" }];
    setForm({
      title: project.title,
      slug: project.slug,
      client: project.client || "",
      description: project.description || "",
      results,
      tags: (project.tags || []).join(", "),
      image_url: project.image_url || "",
      published: project.published ?? false,
    });
    setEditing(project.id);
    setOpen(true);
  };

  const addResult = () => setForm(f => ({ ...f, results: [...f.results, { metric: "", label: "" }] }));
  const removeResult = (i: number) => setForm(f => ({ ...f, results: f.results.filter((_, idx) => idx !== i) }));
  const updateResult = (i: number, key: keyof ResultItem, val: string) =>
    setForm(f => ({ ...f, results: f.results.map((r, idx) => idx === i ? { ...r, [key]: val } : r) }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Projects</h2>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">{editing ? "Edit Project" : "New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); upsertMutation.mutate(form); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required placeholder="e-commerce-redesign" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, Node.js, AWS" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Results / Metrics</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addResult}>+ Add Metric</Button>
                </div>
                {form.results.map((r, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input placeholder="156%" value={r.metric} onChange={e => updateResult(i, "metric", e.target.value)} className="w-28" />
                    <Input placeholder="Increase in Conversions" value={r.label} onChange={e => updateResult(i, "label", e.target.value)} />
                    {form.results.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeResult(i)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={p => setForm(f => ({ ...f, published: p }))} />
                <Label>Published</Label>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={upsertMutation.isPending}>
                {upsertMutation.isPending ? "Saving..." : editing ? "Update Project" : "Create Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : !projects?.length ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No projects yet. Add your first project!</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  {p.image_url && <img src={p.image_url} alt={p.title} className="w-16 h-12 object-cover rounded" />}
                  <div>
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.client} • {p.published ? "Published" : "Draft"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
