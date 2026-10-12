import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getProduct, formatINR } from "@/lib/products";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Srijan" },
      { name: "description", content: "View and manage your wishlist" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const navigate = useNavigate();
  const { add } = useCart();
  const [user, setUser] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          navigate({ to: "/login" });
          return;
        }
        setUser(currentUser);

        // Fetch wishlist for user
        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setWishlist(data || []);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [navigate]);

  const toggleWishlist = async (productId: string) => {
    if (!user) return;

    try {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
      setWishlist(wishlist.filter((w) => w.product_id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your wishlist...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground mb-8">Items you've saved for later</p>

        {wishlist.length === 0 ? (
          <div className="rounded-sm border p-12 text-center">
            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Start adding items you love by clicking the heart icon on products</p>
            <Link to="/shop" className="inline-flex rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((fav) => {
              const product = getProduct(fav.product_id);
              if (!product) return null;

              return (
                <div key={product.id} className="rounded-sm border overflow-hidden hover:border-primary transition-colors">
                  <div className="aspect-[4/5] bg-muted overflow-hidden relative group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Heart className="h-5 w-5 fill-primary text-primary" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{product.short}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{product.occasion}</span> • {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{formatINR(product.price)}</p>
                      <button
                        onClick={() => add(product.id)}
                        className="flex items-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
