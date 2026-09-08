/**
 * Generic outbound connector for a 3D-printing partner's quoting API.
 *
 * Provider-agnostic on purpose: configure with secrets, no code change needed.
 *   PRINT_PARTNER_QUOTE_URL  - endpoint that accepts a quote request (POST JSON)
 *   PRINT_PARTNER_API_KEY    - credential sent as a header
 *   PRINT_PARTNER_AUTH_HEADER- optional header name (default "Authorization")
 *   PRINT_PARTNER_AUTH_SCHEME- optional prefix (default "Bearer"; use "" for raw key)
 *   PRINT_PARTNER_NAME       - optional display name for records
 */

export type PartnerQuoteInput = {
  reference: string;
  customer_name: string;
  email: string;
  phone: string;
  file_name: string;
  file_url: string;
  file_size: number;
  material: string;
  quantity: number;
  notes: string | null;
};

export type PartnerQuoteResult = {
  configured: boolean;
  ok: boolean;
  partner_name: string | null;
  partner_reference: string | null;
  quote_amount: number | null;
  quote_currency: string | null;
  quote_url: string | null;
  error: string | null;
};

function pick(obj: Record<string, unknown>, keys: string[]): unknown {
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

export async function requestPartnerQuote(input: PartnerQuoteInput): Promise<PartnerQuoteResult> {
  const url = process.env["PRINT_PARTNER_QUOTE_URL"];
  const key = process.env["PRINT_PARTNER_API_KEY"];
  const name = process.env["PRINT_PARTNER_NAME"] ?? null;

  const base: PartnerQuoteResult = {
    configured: false,
    ok: false,
    partner_name: name,
    partner_reference: null,
    quote_amount: null,
    quote_currency: null,
    quote_url: null,
    error: null,
  };

  if (!url || !key) return base;

  const headerName = process.env["PRINT_PARTNER_AUTH_HEADER"] ?? "Authorization";
  const scheme = process.env["PRINT_PARTNER_AUTH_SCHEME"] ?? "Bearer";

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        [headerName]: scheme ? `${scheme} ${key}` : key,
      },
      body: JSON.stringify({
        reference: input.reference,
        type: "quote",
        customer: { name: input.customer_name, email: input.email, phone: input.phone },
        file: { name: input.file_name, url: input.file_url, size_bytes: input.file_size },
        material: input.material,
        quantity: input.quantity,
        notes: input.notes,
      }),
    }).finally(() => clearTimeout(timer));

    const text = await res.text();
    let body: Record<string, unknown> = {};
    try {
      const parsed = JSON.parse(text) as unknown;
      if (parsed && typeof parsed === "object") body = parsed as Record<string, unknown>;
    } catch {
      /* non-JSON response */
    }

    if (!res.ok) {
      return { ...base, configured: true, error: `Partner responded ${res.status}: ${text.slice(0, 200)}` };
    }

    const nested = (body["quote"] ?? body["data"] ?? {}) as Record<string, unknown>;
    const merged = { ...nested, ...body };

    return {
      configured: true,
      ok: true,
      partner_name: name,
      partner_reference:
        (pick(merged, ["id", "quote_id", "quoteId", "order_id", "reference", "external_id"]) as string | undefined)
          ?.toString() ?? null,
      quote_amount: toNumber(pick(merged, ["price", "amount", "total", "total_price", "quote_amount"])),
      quote_currency:
        (pick(merged, ["currency", "currency_code", "quote_currency"]) as string | undefined)?.toString() ?? null,
      quote_url:
        (pick(merged, ["quote_url", "url", "checkout_url", "link"]) as string | undefined)?.toString() ?? null,
      error: null,
    };
  } catch (e) {
    return { ...base, configured: true, error: e instanceof Error ? e.message : "Partner request failed" };
  }
}
