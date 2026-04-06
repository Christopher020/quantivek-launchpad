
-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Allow anyone to view files in the media bucket
CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Allow admins to upload files
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete files
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update files
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
