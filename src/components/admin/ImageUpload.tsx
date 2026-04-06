import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  folder?: string;
}

export function ImageUpload({ label, value, onChange, required, folder = "general" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    onChange(urlData.publicUrl);
    setUploading(false);
    toast({ title: "Image uploaded" });
  };

  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
      {value ? (
        <div className="relative group w-full">
          <img src={value} alt="Preview" className="w-full max-h-48 object-cover rounded-lg border border-border" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={() => onChange("")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload image</span>
              <span className="text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</span>
            </div>
          )}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        className="text-xs"
      />
    </div>
  );
}
