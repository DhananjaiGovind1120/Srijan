import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Size } from "./products";

type Line = { id: string; qty: number; size?: Size };
type Ctx = {
  lines: Line[];
  count: number;
  add: (id: string, size?: Size) => void;
  setQty: (id: string, qty: number, size?: Size) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem("srijan-cart") || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (next: Line[]) => {
    setLines(next);
    localStorage.setItem("srijan-cart", JSON.stringify(next));
  };
  const add = (id: string, size?: Size) => {
    const found = lines.find((l) => l.id === id && l.size === size);
    save(found ? lines.map((l) => (l.id === id && l.size === size ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { id, qty: 1, size }]);
  };
  const setQty = (id: string, qty: number, size?: Size) =>
    save(qty <= 0 ? lines.filter((l) => !(l.id === id && l.size === size)) : lines.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l)));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return <CartContext.Provider value={{ lines, count, add, setQty, clear: () => save([]) }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
