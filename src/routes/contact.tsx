import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Our Store — Srijan, Arera Colony Bhopal" },
      { name: "description", content: "Find Srijan at E7/139 Arera Colony, Bhopal. Call +91 94249 73300." },
      { property: "og:title", content: "Visit Srijan in Bhopal" },
      { property: "og:description", content: "Our boutique in Arera Colony — come say hello over coffee." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageTitle eyebrow="Contact" title="Visit our store" note="The coffee's always on." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <div><p className="text-xs uppercase tracking-widest text-primary">Address</p><p className="mt-2 text-xl">E7/139, Arera Colony, Above Nxt Level Gym, Bhopal, Madhya Pradesh</p></div>
          <div><p className="text-xs uppercase tracking-widest text-primary">Hours</p><p className="mt-2 text-xl">Mon–Sat, 11am – 8pm</p></div>
          <div><p className="text-xs uppercase tracking-widest text-primary">Phone</p><a href="tel:+919424973300" className="mt-2 block text-xl">+91 94249 73300</a></div>
          <div><p className="text-xs uppercase tracking-widest text-primary">Email</p><a href="mailto:vandansaingh@gmail.com" className="mt-2 block text-xl">vandansaingh@gmail.com</a></div>
          <a href="https://maps.google.com/?q=E7/139+Arera+Colony+Bhopal" target="_blank" rel="noreferrer" className="inline-flex rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Get directions</a>
        </div>
        <iframe
          title="Srijan location"
          src="https://www.google.com/maps?q=E7%2F139+Arera+Colony+Bhopal&output=embed"
          className="aspect-square w-full rounded-sm border grayscale"
          loading="lazy"
        />
      </section>
    </>
  );
}
