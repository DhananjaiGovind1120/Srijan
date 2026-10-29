import hero from "@/assets/hero.jpg";
import clothing from "@/assets/clothing.jpg";
import jewellery from "@/assets/jewellery.jpg";
import coffee from "@/assets/coffee.jpg";
import regalChoker from "@/assets/regal-choker.jpg";
import imperialKundan from "@/assets/imperial-kundan.jpg";

export type Category = "clothing" | "jewellery" | "coffee";

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
}

export const images = { hero, clothing, jewellery, coffee };

export const products: Product[] = [
  { id: "gulmohar-saree", name: "Gulmohar Cotton Saree", category: "clothing", price: 4200, occasion: "Festival", image: hero, short: "Burnt-orange handloom cotton with a sage temple border.", details: ["Pure handloom cotton, 6.3m with blouse piece", "Woven by weavers in Maheshwar, MP", "Gentle hand wash, dry in shade"], note: "Our Diwali favourite — light enough for Bhopal afternoons." },
  { id: "neel-saree", name: "Neel Summer Saree", category: "clothing", price: 3600, occasion: "Daily wear", image: clothing, short: "Indigo cotton with ivory zari triangles.", details: ["Summer-weight cotton", "Natural indigo dye", "Custom blouse stitching available"], note: "Pairs beautifully with oxidised silver." },
  { id: "custom-kurta", name: "Made-to-Measure Kurta", category: "clothing", price: 2800, occasion: "Custom", image: clothing, short: "Choose your fabric, border and fit.", details: ["Stitched to your measurements", "Ready in 7–10 days", "Fabric samples on request"], note: "Tell us the occasion — we'll handle the rest." },
  { id: "firoza-jhumka", name: "Firoza Jhumkas", category: "jewellery", price: 1850, occasion: "Festival", image: jewellery, short: "Oxidised silver, copper beads and turquoise.", details: ["Silver-plated brass with copper beads", "Handcrafted, slight variations are natural", "Store dry in the pouch provided"], note: "The pair everyone asks about." },
  { id: "tamra-cuff", name: "Tamra Etched Cuff", category: "jewellery", price: 1450, occasion: "Daily wear", image: jewellery, short: "Hand-etched copper-and-silver cuff.", details: ["Adjustable fit", "Hand-etched floral motif", "Polish with a soft cloth"], note: "Stack it, or wear it alone." },
  { id: "dulhan-set", name: "Dulhan Temple Set", category: "jewellery", price: 8900, occasion: "Bridal", image: jewellery, short: "Necklace and earrings in temple style.", details: ["Made to order, 3 weeks", "Customisable stones", "Gift box included"], note: "For the day you'll remember forever." },
  { id: "regal-choker", name: "The Regal Antique Gold Temple Choker Set", category: "jewellery", price: 3500, occasion: "Festival", image: regalChoker, short: "Antique gold choker with intricate filigree and ruby accents.", details: ["Antique gold finish with filigree work", "Detailed peacock motifs", "Ruby-toned stone accents", "Includes matching earrings", "Store in pouch provided"], note: "A timeless piece of traditional craftsmanship." },
  { id: "imperial-kundan", name: "The Imperial Kundan & Pearl Long Set", category: "jewellery", price: 7000, occasion: "Bridal", image: imperialKundan, short: "Multi-layered seed pearl necklace with polki stones and meenakari.", details: ["Seed pearl multi-layer strands", "Ornate pendant with polki stones", "Deep ruby highlights and green meenakari accents", "Made to order, 3 weeks", "Includes matching earrings"], note: "An heirloom-quality piece for your most precious moments." },
  { id: "araku-roast", name: "Araku Valley Medium Roast", category: "coffee", price: 650, occasion: "Coffee", image: coffee, short: "Chocolate, jaggery and a citrus finish.", details: ["Origin: Araku Valley, Andhra Pradesh", "250g, whole bean or ground", "Pour-over: 15g to 250ml, 92°C"], note: "Our morning cup at the store." },
  { id: "chikmagalur-dark", name: "Chikmagalur Dark Roast", category: "coffee", price: 590, occasion: "Coffee", image: coffee, short: "Bold, smoky, made for filter kaapi.", details: ["Origin: Chikmagalur, Karnataka", "250g, coarse grind for filter", "Add warm milk and a little sugar"], note: "Tastes like a South Indian morning." },
  { id: "festive-box", name: "Festive Coffee & Jhumka Box", category: "coffee", price: 2300, occasion: "Festival", image: coffee, short: "A gift box: one roast + one pair of earrings.", details: ["Hand-packed with a handwritten note", "Ships across India", "Add a personal message at checkout"], note: "Our Rakhi bestseller." },
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
export const getProduct = (id: string) => products.find((p) => p.id === id);
