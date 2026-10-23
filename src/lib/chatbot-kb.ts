import { products } from "./products";

type Intent = "product_info" | "shipping" | "payment" | "general" | "order_status";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const faqDatabase = {
  product_info: [
    {
      keywords: ["saree", "fabric", "material", "cotton"],
      response: (query: string) => {
        const clothing = products.filter((p) => p.category === "clothing");
        if (clothing.length > 0) {
          return `We have beautiful handloom sarees! Our collection includes:
${clothing.map((p) => `• **${p.name}** - ₹${p.price}`).join("\n")}

Each saree is handwoven with premium fabrics. Would you like to know more about a specific saree?`;
        }
        return "We have handloom sarees available. Check our Collections page!";
      },
    },
    {
      keywords: ["jewellery", "earring", "jhumka", "bracelet"],
      response: () => {
        const jewels = products.filter((p) => p.category === "jewellery");
        return `Our jewellery collection features handcrafted oxidised silver pieces:
${jewels.map((p) => `• **${p.name}** - ₹${p.price}`).join("\n")}

All pieces are made by hand. Each has unique variations. Would you like details about any specific item?`;
      },
    },
    {
      keywords: ["coffee", "roast", "origin"],
      response: () => {
        const coffees = products.filter((p) => p.category === "coffee");
        return `We source single-origin Indian coffee:
${coffees.map((p) => `• **${p.name}** - ₹${p.price}`).join("\n")}

Each roast has its own flavor profile. Perfect for pour-over or filter coffee. Which interests you?`;
      },
    },
    {
      keywords: ["price", "cost", "how much"],
      response: () => `Our prices range from ₹590 to ₹8,900 depending on the product category. Visit our Collections page to browse by price!`,
    },
    {
      keywords: ["custom", "personalized", "made to order"],
      response: () => `We offer custom orders! You can:
• Design your own saree with fabric and border choices
• Get custom jewellery made to order (3 weeks)
• Send personalized messages with gifts

Visit our Custom Orders page or contact us for details!`,
    },
  ],

  shipping: [
    {
      keywords: ["shipping", "delivery", "how long", "time"],
      response: () =>
        `We ship across India and worldwide! Standard shipping takes 5-7 business days. Gift boxes are hand-packed with love and include handwritten notes.`,
    },
    {
      keywords: ["free shipping", "delivery charge"],
      response: () =>
        `Get **free shipping on orders above ₹2,500**! Otherwise, shipping charges apply based on location.`,
    },
    {
      keywords: ["international", "abroad", "outside india"],
      response: () =>
        `Yes, we ship worldwide! International shipping times and costs vary by location. Please contact us at **+91 94249 73300** or email **vandansingh@gmail.com** for international orders.`,
    },
  ],

  payment: [
    {
      keywords: ["payment", "how to pay", "card", "upi", "wallet"],
      response: () =>
        `We accept multiple payment methods at checkout:
• **UPI** - Direct transfer
• **Cards** - Visa, Mastercard, Amex
• **Digital Wallets** - Google Pay, Apple Pay, etc.
• **Phone Payment** - Call us to order

We'll confirm payment when you place your order!`,
    },
    {
      keywords: ["secure", "safe", "payment security"],
      response: () =>
        `Your payment is secure! We use encrypted payment processing. We never store your full card details.`,
    },
  ],

  general: [
    {
      keywords: ["about", "story", "who are you"],
      response: () =>
        `Hi! I'm the Srijan chatbot. 👋 We're a boutique in Bhopal bringing together handloom clothing, artisan jewellery, and Indian coffee. Everything is handcrafted with love. Learn more on our **About** page!`,
    },
    {
      keywords: ["contact", "phone", "email", "address"],
      response: () =>
        `Get in touch with us:
📍 **Store**: E7/139, Arera Colony, Above Nxt Level Gym, Bhopal, MP
📞 **Phone**: +91 94249 73300
📧 **Email**: vandansingh@gmail.com
📲 **Instagram**: @srijancreation.bpl

We're here to help!`,
    },
    {
      keywords: ["occasion", "festival", "diwali", "rakhi", "wedding"],
      response: () =>
        `We have special collections for occasions:
🪔 **Diwali** - Festival sarees, temple jewellery & gift boxes
🎀 **Rakhi** - Coffee & jhumka hampers (ships anywhere!)
💍 **Weddings** - Bridal sets & custom outfits

Visit our **Home** page to explore festival specials!`,
    },
    {
      keywords: ["return", "exchange", "refund"],
      response: () =>
        `We want you to love your purchase! For returns, exchanges, or issues, please contact us at **+91 94249 73300**. We'll work it out!`,
    },
  ],

  order_status: [
    {
      keywords: ["order", "status", "where is my order", "track"],
      response: () =>
        `To check your order status, call us at **+91 94249 73300** with your order details. We'll give you a complete update and tracking info!`,
    },
  ],
};

function getIntent(query: string): Intent {
  const q = query.toLowerCase();
  if (
    q.includes("ship") ||
    q.includes("delivery") ||
    q.includes("free") ||
    q.includes("international")
  )
    return "shipping";
  if (
    q.includes("pay") ||
    q.includes("card") ||
    q.includes("upi") ||
    q.includes("secure")
  )
    return "payment";
  if (
    q.includes("order") ||
    q.includes("status") ||
    q.includes("track") ||
    q.includes("where")
  )
    return "order_status";
  if (
    q.includes("saree") ||
    q.includes("jewellery") ||
    q.includes("coffee") ||
    q.includes("price") ||
    q.includes("custom")
  )
    return "product_info";
  return "general";
}

export function getResponse(userMessage: string): string {
  const intent = getIntent(userMessage);
  const queries = faqDatabase[intent] || [];

  const query = userMessage.toLowerCase();
  for (const item of queries) {
    if (item.keywords.some((kw) => query.includes(kw))) {
      return item.response(userMessage);
    }
  }

  // Fallback responses
  const fallbacks = [
    `That's a great question! For specific details, please contact us at **+91 94249 73300** or email **vandansaingh@gmail.com**. We're here to help! 😊`,
    `I'm not sure about that one. Reach out to our team at **+91 94249 73300** - they'll be happy to help!`,
    `Thanks for asking! For personalized assistance, call us at **+91 94249 73300**. We love chatting about our products! 💚`,
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)]!;
}
