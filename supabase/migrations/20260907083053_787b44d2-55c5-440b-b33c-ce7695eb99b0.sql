CREATE TABLE public.print_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  material text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  notes text,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.print_requests TO anon, authenticated;
GRANT ALL ON public.print_requests TO service_role;

ALTER TABLE public.print_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a print request"
  ON public.print_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can upload an STL file"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'stl-uploads');