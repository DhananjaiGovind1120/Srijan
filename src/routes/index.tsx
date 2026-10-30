import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { images, products } from "@/lib/products";
import { ProductCard } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srijan — Handcrafted Clothing & Jewellery | Bhopal" },
      { name: "description", content: "Handcrafted clothing and jewellery from our boutique in Arera Colony, Bhopal." },
      { property: "og:title", content: "Srijan — Handcrafted | Curated | Connected" },
      { property: "og:description", content: "A Bhopal boutique for handcrafted clothing and jewellery." },
    ],
  }),
  component: Home,
});

const slides = [
  { img: images.hero, label: "Clothing", line: "Handcrafted pieces for every occasion" },
  { img: images.jewellery, label: "Jewellery", line: "Artisan designs, made by hand" },
];

const festivals = [
  { name: "Diwali", note: "Light, gold & new beginnings", text: "Handcrafted clothing, temple jewellery and gift boxes packed with a handwritten note." },
  { name: "Rakhi", note: "For the ones who've always had your back", text: "Handcrafted jewellery pieces that ship anywhere in India." },
  { name: "Weddings", note: "Made just for you", text: "Bridal sets and handcrafted outfits, customized for your special day." },
];

function Home() {
  const [i, setI] = useState(0);
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pattern-geo absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Handcrafted | Curated | Connected</p>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-7xl">
              Made by hand, <em className="text-copper">worn</em> with heart.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              A little boutique in Bhopal bringing together handcrafted clothing and artisan jewellery, made with love.
            </p>
            <Link to="/shop" className="mt-10 inline-flex rounded-sm bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Explore Our Collections
            </Link>
            <p className="mt-10 max-w-xs -rotate-2 font-hand text-2xl text-cream">"Namaste! Every piece here has a story — come find yours." — Vandana</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            {slides.map((s, k) => (
              <img key={s.label} src={s.img} alt={s.line} width={1280} height={1600} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`} />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6">
              <p className="text-xs uppercase tracking-widest text-primary">{slides[i]!.label}</p>
              <p className="font-display text-2xl">{slides[i]!.line}</p>
              <div className="mt-3 flex gap-2">
                {slides.map((s, k) => <button key={s.label} aria-label={s.label} onClick={() => setI(k)} className={`h-1 w-8 ${k === i ? "bg-primary" : "bg-foreground/30"}`} />)}
              </div>
            </div>
          </div>
        </div>
        <div className="border-band" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl md:text-5xl">Three collections, one home</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { k: "clothing", t: "Clothing", d: "Festival sarees, kurtas & custom pieces", img: images.clothing, c: "bg-primary" },
            { k: "jewellery", t: "Jewellery", d: "Artisan designs for every occasion", img: images.jewellery, c: "bg-sage" },
          ].map((c) => (
            <Link key={c.k} to="/shop" search={{ c: c.k as "clothing" }} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
              <img src={c.img} alt={c.t} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className={`absolute left-0 top-0 h-1.5 w-full ${c.c}`} />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-3xl">{c.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest text-primary">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream text-cream-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Festival spotlight</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {festivals.map((x, k) => (
                <button key={x.name} onClick={() => setF(k)} className={`rounded-full border border-cream-foreground/30 px-4 py-1.5 text-sm ${k === f ? "bg-cream-foreground text-cream" : ""}`}>{x.name}</button>
              ))}
            </div>
          </div>
          <div key={f} className="animate-rise">
            <h2 className="text-5xl md:text-6xl">{festivals[f]!.name}</h2>
            <p className="mt-3 font-hand text-3xl text-primary">{festivals[f]!.note}</p>
            <p className="mt-4 max-w-lg">{festivals[f]!.text}</p>
            <Link to="/shop" className="mt-8 inline-flex rounded-sm bg-cream-foreground px-6 py-3 text-sm text-cream">See the {festivals[f]!.name} edit</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl">Loved this week</h2>
          <Link to="/shop" className="text-sm text-primary">View all →</Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
