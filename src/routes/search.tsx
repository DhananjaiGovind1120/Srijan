import { createFileRoute, useSearch } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Srijan" },
      { name: "description", content: "Search our collections of handcrafted products." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q.toLowerCase().trim();

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.short.toLowerCase().includes(query) ||
          p.details.some((d) => d.toLowerCase().includes(query)) ||
          p.occasion.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-2">Search Results</h1>
          {query && (
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{results.length}</span>{" "}
              product{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-semibold text-foreground">"{q}"</span>
            </p>
          )}
        </div>

        {!query ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              Use the search bar to find products
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No products found for "{q}"
            </p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or browse our{" "}
              <a href="/shop" className="text-primary hover:underline">
                collections
              </a>
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
