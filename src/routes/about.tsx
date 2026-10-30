import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { PageTitle } from "@/components/site";

// Get all products for carousel
const allProducts = products;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Srijan Bhopal" },
      { name: "description", content: "How a small Bhopal boutique came to bring handloom and handcrafted jewellery together." },
      { property: "og:title", content: "Our Story — Srijan" },
      { property: "og:description", content: "Craft, festivals and community from Arera Colony, Bhopal." },
    ],
  }),
  component: About,
});

function About() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % allProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = allProducts[imageIndex];

  return (
    <>
      <PageTitle eyebrow="Our story" title="Srijan means creation" note="सृजन — to make something with your own hands." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden">
          <img src={currentProduct.image} alt={currentProduct.name} loading="lazy" className="h-full w-full object-cover transition-opacity duration-1000" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
            <p className="text-xs uppercase tracking-widest text-primary">{currentProduct.category}</p>
            <p className="text-sm font-medium mt-1">{currentProduct.name}</p>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {allProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`h-1 w-2 rounded-full transition-colors ${
                  i === imageIndex ? "bg-primary" : "bg-foreground/30"
                }`}
                aria-label={`View product ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-6 self-center text-lg leading-relaxed text-muted-foreground">
          <p>Srijan began in a small room in Arera Colony, with a few sarees from weaver friends and a passion for handcrafted pieces.</p>
          <p>Today we work with weavers across Madhya Pradesh and jewellery makers who still shape every piece by hand. Each festival, we gather new stories, colours and pieces for our community.</p>
          <p>Every item in our collection is a labour of love, crafted with intention and care.</p>
          <p className="font-hand text-3xl text-copper">— Vandana, founder</p>
        </div>
      </section>
      <section className="bg-cream text-cream-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            ["Handcrafted", "Every piece passes through skilled hands — weavers and metalsmiths who perfect their craft."],
            ["Local first", "We source from Madhya Pradesh, paying fairly and supporting our artisan communities."],
            ["Community", "Festivals, styling sessions and conversations with our customers at the store."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="text-3xl">{t}</h3>
              <p className="mt-3">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
