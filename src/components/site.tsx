import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShoppingBag, MapPin, Menu, X, Heart, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR, type Product } from "@/lib/products";
import { getCurrentUser } from "@/lib/auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Collections" },
  { to: "/custom", label: "Customise" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-2">
      <span className="font-deva text-3xl text-primary">सृजन</span>
      <span className="font-display text-xl tracking-wide">Srijan</span>
    </Link>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="bg-cream text-cream-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <span className="font-hand text-base">Diwali edit is here — handwoven, hand-packed ✦</span>
          <Link to="/contact" className="hidden items-center gap-1 sm:flex"><MapPin className="h-3 w-3" /> Store: Arera Colony, Bhopal</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{count}</span>}
          </Link>
          {!isLoading && (
            user ? (
              <div className="flex items-center gap-4">
                <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline">
                  Orders
                </Link>
                <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline">
                  Wishlist
                </Link>
                <div className="w-px h-5 bg-border hidden md:block"></div>
                <Link to="/account" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm hidden md:inline">{user.email?.split("@")[0]}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="text-sm rounded-sm bg-primary px-3 py-1.5 text-primary-foreground hover:opacity-90 transition-opacity">
                  Sign up
                </Link>
              </div>
            )
          )}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t px-6 py-4 md:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
          {!isLoading && (
            user ? (
              <div className="flex flex-col gap-2 pt-2 border-t pt-4">
                <Link to="/orders" onClick={() => setOpen(false)} className="text-sm">Your Orders</Link>
                <Link to="/wishlist" onClick={() => setOpen(false)} className="text-sm">Your Wishlist</Link>
                <Link to="/account" onClick={() => setOpen(false)} className="text-sm">Account Settings</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm">Log in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="text-sm rounded-sm bg-primary px-3 py-1.5 text-primary-foreground text-center">Sign up</Link>
              </div>
            )
          )}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="border-band" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 text-sm tracking-[0.3em] text-muted-foreground">CLOTHING · JEWELLERY · COFFEE</p>
          <p className="mt-6 font-hand text-2xl text-copper">Join our festival celebrations & artisan stories</p>
          <form className="mt-3 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}>
            <input type="email" required placeholder="your@email.com" className="flex-1 rounded-sm border bg-transparent px-3 py-2 text-sm" />
            <button className="rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground">Join</button>
          </form>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="mb-3 text-foreground">Explore</p>
          <Link to="/shop" className="block hover:text-foreground">Collections</Link>
          <Link to="/custom" className="block hover:text-foreground">Custom orders</Link>
          <Link to="/about" className="block hover:text-foreground">Our story</Link>
          <a href="https://instagram.com/srijancreation.bpl" target="_blank" rel="noreferrer" className="block hover:text-foreground">Instagram @srijancreation.bpl</a>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="mb-3 text-foreground">Visit</p>
          <p>E7/139, Arera Colony, Above Nxt Level Gym, Bhopal, MP</p>
          <p>+91 94249 73300</p>
          <p>vandansaingh@gmail.com</p>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Srijan, Bhopal. Handcrafted with love. Shipping across India & worldwide.</p>
    </footer>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [liked, setLiked] = useState(false);
  return (
    <div className="group">
      <Link to="/product/$id" params={{ id: p.id }} className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-widest">{p.occasion}</span>
      </Link>
      <button onClick={() => setLiked(!liked)} aria-label="Wishlist" className="float-right mt-3"><Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} /></button>
      <Link to="/product/$id" params={{ id: p.id }}><h3 className="mt-3 text-lg">{p.name}</h3></Link>
      <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-medium">{formatINR(p.price)}</span>
        <button onClick={() => add(p.id)} className="text-xs uppercase tracking-widest text-primary hover:underline">+ Add to bag</button>
      </div>
    </div>
  );
}

export function PageTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="pattern-geo absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
        {note && <p className="mt-4 font-hand text-2xl text-copper">{note}</p>}
      </div>
    </section>
  );
}
