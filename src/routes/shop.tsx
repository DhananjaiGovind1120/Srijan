import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Category } from "@/lib/products";
import { PageTitle, ProductCard } from "@/components/site";

type Search = { c?: Category };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const c = s["c"] as string;
    return c === "clothing" || c === "jewellery" || c === "coffee" ? { c } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop Collections — Srijan Bhopal" },
      { name: "description", content: "Browse handloom sarees, handcrafted jewellery and Indian specialty coffee." },
      { property: "og:title", content: "Shop Srijan Collections" },
      { property: "og:description", content: "Clothing, jewellery and coffee, handpicked in Bhopal." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { c } = Route.useSearch();
  const [q, setQ] = useState("");
  const [occasion, setOccasion] = useState("All");
  const [sort, setSort] = useState("featured");
  let list = products.filter((p) => (!c || p.category === c) && (occasion === "All" || p.occasion === occasion) && p.name.toLowerCase().includes(q.toLowerCase()));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  const occasions = ["All", ...new Set(products.map((p) => p.occasion))];
  const tabs: { k?: Category; l: string }[] = [{ l: "All" }, { k: "clothing", l: "Clothing" }, { k: "jewellery", l: "Jewellery" }, { k: "coffee", l: "Coffee" }];

  return (
    <>
      <PageTitle eyebrow="The collections" title="Shop Srijan" note="Each piece chosen by hand, in Bhopal." />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-3 border-b pb-6">
          {tabs.map((t) => (
            <Link key={t.l} to="/shop" search={t.k ? { c: t.k } : {}} className={`rounded-full border px-4 py-1.5 text-sm ${c === t.k ? "border-primary bg-primary text-primary-foreground" : ""}`}>{t.l}</Link>
          ))}
          <div className="ml-auto flex flex-wrap gap-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="rounded-sm border bg-transparent px-3 py-1.5 text-sm" />
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="rounded-sm border bg-background px-3 py-1.5 text-sm">
              {occasions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-sm border bg-background px-3 py-1.5 text-sm">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && <p className="py-20 text-center font-hand text-2xl text-muted-foreground">Nothing here yet — try another filter.</p>}
      </div>
    </>
  );
}
