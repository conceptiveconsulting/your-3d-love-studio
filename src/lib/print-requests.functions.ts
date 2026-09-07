import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  file_name: z.string().trim().min(1).max(255),
  file_path: z.string().trim().regex(/^stl\/[0-9a-f-]{36}\/[^/]{1,255}$/, "Invalid file reference"),
  file_size: z.number().int().min(1).max(50 * 1024 * 1024),
  material: z.string().trim().min(1).max(60),
  quantity: z.number().int().min(1).max(500),
  notes: z.string().trim().max(500).optional(),
});

export const submitPrintRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("print_requests")
      .insert({ ...data, notes: data.notes ?? null })
      .select("id")
      .single();
    if (error || !row) throw new Error("Could not record the print request");

    const { data: signed, error: signError } = await supabaseAdmin.storage
      .from("stl-uploads")
      .createSignedUrl(data.file_path, 60 * 60 * 24 * 7);
    if (signError || !signed) throw new Error("Could not create the download link");

    return { id: row.id, downloadUrl: signed.signedUrl };
  });
