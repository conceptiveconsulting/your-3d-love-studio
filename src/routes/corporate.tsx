import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate & Bulk 3D-Printed Gifts — Sara Gift Studio" },
      { name: "description", content: "Employee gifts, client hampers, branded merchandise and event awards in bulk — request a formal quote within one business day." },
      { property: "og:title", content: "Corporate & Bulk — Sara Gift Studio" },
      { property: "og:description", content: "Bulk and corporate orders, quoted directly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Corporate,
});

function Corporate() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "var(--brand-blue)" }}>Corporate &amp; bulk</div>
        <h1 className="mb-2 text-[32px]">Bulk and corporate orders, quoted directly.</h1>
        <p className="max-w-[64ch] text-[15px] text-muted-foreground">
          For orders of ten pieces or more — employee gifts, client hampers, branded merchandise, event awards — share your requirement below and we will revert with a formal quote, typically within one business day.
        </p>

        {sent ? (
          <div className="mt-6 max-w-[560px] rounded-[18px] bg-muted p-8">
            <h3 className="mb-2 text-xl">Enquiry received</h3>
            <p className="text-[14px] text-muted-foreground">
              Thanks — we'll review your requirement and send a formal quotation within one business day.
            </p>
          </div>
        ) : (
          <form
            className="mt-5 max-w-[560px] rounded-[18px] bg-muted p-8"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <label className="field-label">Requirement</label>
            <input className="field-input" required placeholder="e.g. Engraved desk trophies for annual awards" />
            <label className="field-label">Quantity required</label>
            <input className="field-input" required placeholder="e.g. 50 units" />
            <label className="field-label">Branding details, if any</label>
            <textarea className="field-input" rows={3} placeholder="Company logo, colours, or reference designs — attachments can follow by email" />
            <label className="field-label">Contact number or email</label>
            <input className="field-input" required placeholder="For us to send the quotation" />
            <button type="submit" className="btn-ink mt-5">Submit enquiry</button>
          </form>
        )}
        <p className="mt-4 max-w-[56ch] text-[13px] text-muted-foreground">
          No payment is required to submit an enquiry. An order is confirmed only once you have reviewed and accepted our quotation.
        </p>
      </div>
    </PageShell>
  );
}
