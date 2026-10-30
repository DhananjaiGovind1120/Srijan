import hero from "@/assets/hero.jpg";
import regalChoker from "@/assets/regal-choker.jpg";
import imperialKundan from "@/assets/imperial-kundan.jpg";
import gulmoharbBloom from "@/assets/gulmohar-bloom.jpg";
import indigoBlossm from "@/assets/indigo-blossom.jpg";
import royalPeacock from "@/assets/royal-peacock.jpg";

export type Category = "clothing" | "jewellery";
export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  occasion: string;
  image: string;
  short: string;
  details: string[];
  note: string;
  sizes?: Size[];
}

export const images = { hero };

export const products: Product[] = [
  { id: "gulmohar-bloom", name: "Gulmohar Bloom Kurta", category: "clothing", price: 2100, occasion: "Festival", image: gulmoharbBloom, short: "Mustard florals, crimson blooms and golden embroidery for festive dressing.", details: ["Mustard base with crimson floral print", "Golden embroidery details", "Perfect for festivals and celebrations", "Comfortable fit for all-day wear"], note: "A vibrant celebration of traditional Indian design.", sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "indigo-blossom", name: "The Indigo Blossom Cotton Suit", category: "clothing", price: 2200, occasion: "Festival", image: indigoBlossm, short: "Deep indigo cotton with intricate traditional floral prints and paisley motifs.", details: ["Premium breathable cotton", "Deep indigo blue base", "Intricate traditional floral prints", "Paisley motifs throughout", "Perfect for festive occasions"], note: "Classic indigo elegance meets contemporary comfort.", sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "royal-peacock", name: "The Royal Peacock Peach Silk Kurta", category: "clothing", price: 850, occasion: "Festival", image: royalPeacock, short: "Magnificent peach silk kurta with vibrant peacock and botanical florals.", details: ["Premium peach-toned silk", "Artistic digital print of majestic peacock", "Lush botanical pink florals", "Stunning artistic design", "Lightweight and breathable"], note: "A wearable work of art.", sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "regal-choker", name: "The Regal Antique Gold Temple Choker Set", category: "jewellery", price: 3500, occasion: "Festival", image: regalChoker, short: "Antique gold choker with intricate filigree and ruby accents.", details: ["Antique gold finish with filigree work", "Detailed peacock motifs", "Ruby-toned stone accents", "Includes matching earrings", "Store in pouch provided"], note: "A timeless piece of traditional craftsmanship." },
  { id: "imperial-kundan", name: "The Imperial Kundan & Pearl Long Set", category: "jewellery", price: 7000, occasion: "Bridal", image: imperialKundan, short: "Multi-layered seed pearl necklace with polki stones and meenakari.", details: ["Seed pearl multi-layer strands", "Ornate pendant with polki stones", "Deep ruby highlights and green meenakari accents", "Made to order, 3 weeks", "Includes matching earrings"], note: "An heirloom-quality piece for your most precious moments." },
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
export const getProduct = (id: string) => products.find((p) => p.id === id);
