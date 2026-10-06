import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Srijan" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    return {
      meta: [
        { title: `${p.name} — Srijan Bhopal` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Srijan` },
        { property: "og:description", content: p.short },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const related = products.filter((x) => x.id !== p.id && x.category !== p.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link to="/shop" search={{ c: p.category }} className="text-sm text-muted-foreground">← Back to {p.category}</Link>
      <div className="mt-6 grid gap-12 md:grid-cols-2">
        <div
          className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-sm"
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
          onMouseLeave={() => setZoom(null)}
        >
          <img src={p.image} alt={p.name} width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-200" style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{p.category} · {p.occasion}</p>
          <h1 className="mt-3 text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-4 text-2xl">{formatINR(p.price)}</p>
          <p className="mt-6 text-muted-foreground">{p.short}</p>
          <p className="mt-6 -rotate-1 font-hand text-2xl text-copper">"{p.note}"</p>
          <button onClick={() => { add(p.id); setAdded(true); }} className="mt-8 w-full rounded-sm bg-primary py-4 text-sm font-medium text-primary-foreground">
            {added ? "Added to your bag ✓" : "Add to bag"}
          </button>
          <ul className="mt-10 space-y-3 border-t pt-6 text-sm">
            {p.details.map((d) => <li key={d} className="flex gap-3"><span className="text-primary">✦</span>{d}</li>)}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">Want it personalised? <Link to="/custom" className="text-primary underline">Request a custom piece</Link>.</p>
        </div>
      </div>
      <h2 className="mt-24 text-3xl">Style it with</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((r) => <ProductCard key={r.id} p={r} />)}
      </div>
    </div>
  );
}
