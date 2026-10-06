import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatINR } from "@/lib/products";
import { PageTitle } from "@/components/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Srijan" },
      { name: "description", content: "Review your Srijan bag and add a gift message." },
      { property: "og:title", content: "Your Bag — Srijan" },
      { property: "og:description", content: "Handcrafted pieces, hand-packed in Bhopal." },
    ],
  }),
  component: Cart,
});

const FREE = 2500;

function Cart() {
  const { lines, setQty, clear } = useCart();
  const [done, setDone] = useState(false);
  const items = lines.map((l) => ({ ...l, p: getProduct(l.id)! })).filter((x) => x.p);
  const total = items.reduce((s, x) => s + x.p.price * x.qty, 0);

  if (done) return <PageTitle eyebrow="Thank you" title="We've got your order request" note="We'll call you shortly to confirm payment (UPI, cards & wallets)." />;

  return (
    <>
      <PageTitle eyebrow="Your bag" title="Almost yours" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-[2fr_1fr]">
        <div className="divide-y">
          {items.length === 0 && <p className="py-10 font-hand text-2xl text-muted-foreground">Your bag is empty. <Link to="/shop" className="text-primary">Start exploring →</Link></p>}
          {items.map(({ p, qty }) => (
            <div key={p.id} className="flex gap-5 py-6">
              <img src={p.image} alt={p.name} className="h-28 w-24 rounded-sm object-cover" />
              <div className="flex-1">
                <h3 className="text-lg">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{formatINR(p.price)}</p>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <button onClick={() => setQty(p.id, qty - 1)} className="h-7 w-7 rounded-sm border">−</button>
                  {qty}
                  <button onClick={() => setQty(p.id, qty + 1)} className="h-7 w-7 rounded-sm border">+</button>
                </div>
              </div>
              <p>{formatINR(p.price * qty)}</p>
            </div>
          ))}
        </div>
        <form
          className="h-fit space-y-4 rounded-sm border bg-card p-6"
          onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }}
        >
          <p className="text-sm text-muted-foreground">
            {total >= FREE ? "✦ You've unlocked free shipping" : `Add ${formatINR(FREE - total)} more for free shipping`}
          </p>
          <input placeholder="Promo code" className="w-full rounded-sm border bg-transparent px-3 py-2 text-sm" />
          <textarea placeholder="Gift message (we'll handwrite it!)" className="w-full rounded-sm border bg-transparent px-3 py-2 font-hand text-lg" rows={3} />
          <input required placeholder="Your name" className="w-full rounded-sm border bg-transparent px-3 py-2 text-sm" />
          <input required type="tel" placeholder="Phone" className="w-full rounded-sm border bg-transparent px-3 py-2 text-sm" />
          <div className="flex justify-between border-t pt-4 text-lg"><span>Total</span><span>{formatINR(total)}</span></div>
          <button disabled={!items.length} className="w-full rounded-sm bg-primary py-3 text-sm font-medium text-primary-foreground disabled:opacity-40">Place order request</button>
        </form>
      </div>
    </>
  );
}
