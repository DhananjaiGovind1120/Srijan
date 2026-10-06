import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle } from "@/components/site";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Orders — Srijan Bhopal" },
      { name: "description", content: "Made-to-measure clothing and bespoke jewellery, designed with you in Bhopal." },
      { property: "og:title", content: "Custom Clothing & Jewellery — Srijan" },
      { property: "og:description", content: "Tell us your idea; we'll craft it by hand." },
    ],
  }),
  component: Custom,
});

const steps = [
  ["Chat", "Share your idea, occasion and budget — in store or on WhatsApp."],
  ["Design", "We suggest fabrics, stones and sketches within 2 days."],
  ["Craft", "Our artisans make it by hand: 7–10 days clothing, 2–3 weeks jewellery."],
  ["Deliver", "Pick up in Bhopal or we ship it, gift-wrapped."],
];

function Custom() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageTitle eyebrow="Bespoke" title="Made just for you" note="Your idea, our hands." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div key={t} className="border-t-2 border-primary pt-5">
              <p className="font-hand text-3xl text-copper">0{i + 1}</p>
              <h3 className="mt-1 text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto mt-20 max-w-xl space-y-4">
          <h2 className="text-3xl">Start your custom piece</h2>
          {sent ? (
            <p className="font-hand text-2xl text-primary">Thank you! We'll be in touch within a day.</p>
          ) : (
            <>
              <input required placeholder="Name" className="w-full rounded-sm border bg-transparent px-3 py-2.5" />
              <input required type="tel" placeholder="Phone / WhatsApp" className="w-full rounded-sm border bg-transparent px-3 py-2.5" />
              <select className="w-full rounded-sm border bg-background px-3 py-2.5">
                <option>Custom clothing</option><option>Custom jewellery</option><option>Bridal</option><option>Gift hamper</option>
              </select>
              <textarea required rows={4} placeholder="Tell us about your idea and occasion" className="w-full rounded-sm border bg-transparent px-3 py-2.5" />
              <button className="w-full rounded-sm bg-primary py-3 font-medium text-primary-foreground">Send enquiry</button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
