ALTER TABLE public.print_requests
  ADD COLUMN partner_name text,
  ADD COLUMN partner_reference text,
  ADD COLUMN partner_status text NOT NULL DEFAULT 'not_sent',
  ADD COLUMN quote_amount numeric(12,2),
  ADD COLUMN quote_currency text,
  ADD COLUMN quote_url text,
  ADD COLUMN partner_error text;