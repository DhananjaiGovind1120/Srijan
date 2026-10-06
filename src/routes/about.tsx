import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/products";
import { PageTitle } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Srijan Bhopal" },
      { name: "description", content: "How a small Bhopal boutique came to bring handloom, handcrafted jewellery and Indian coffee together." },
      { property: "og:title", content: "Our Story — Srijan" },
      { property: "og:description", content: "Craft, festivals and community from Arera Colony, Bhopal." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageTitle eyebrow="Our story" title="Srijan means creation" note="सृजन — to make something with your own hands." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <img src={images.clothing} alt="Handloom sarees" loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover" />
        <div className="space-y-6 self-center text-lg leading-relaxed text-muted-foreground">
          <p>Srijan began in a small room in Arera Colony, with a few sarees from weaver friends and a pot of coffee always on the stove.</p>
          <p>Today we work with weavers across Madhya Pradesh and jewellery makers who still shape every piece by hand. Each festival, we gather new stories, colours and pieces for our community.</p>
          <p>And the coffee? Our customers kept staying for a cup — so we started sharing it too.</p>
          <p className="font-hand text-3xl text-copper">— Vandana, founder</p>
        </div>
      </section>
      <section className="bg-cream text-cream-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            ["Handcrafted", "Every piece passes through skilled hands — weavers, metalsmiths, roasters."],
            ["Local first", "We source from Madhya Pradesh and Indian coffee estates, paying fairly."],
            ["Community", "Festivals, styling sessions and conversations over coffee at the store."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="text-3xl">{t}</h3>
              <p className="mt-3">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
