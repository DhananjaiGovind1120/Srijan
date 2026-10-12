import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/use-auth";
import { supabase } from "@/lib/supabase";
import { getProduct, formatINR } from "@/lib/products";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Srijan" },
      { name: "description", content: "Your Srijan account, orders and wishlist" },
    ],
  }),
  component: Account,
});

function Account() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [tab, setTab] = useState<"orders" | "wishlist">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate({ to: "/login" });
      return;
    }

    const loadData = async () => {
      try {
        // Fetch orders (all orders for now, later we'll filter by user)
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);

        // Fetch wishlist for user
        const { data: wishlistData, error: wishlistError } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", user.id);

        if (wishlistError) throw wishlistError;
        setWishlist(wishlistData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, user, authLoading]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    }
  };

  const toggleWishlist = async (productId: string, isSaved: boolean) => {
    if (!user) return;

    try {
      if (isSaved) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        setWishlist(wishlist.filter((w) => w.product_id !== productId));
      } else {
        await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: productId,
        });
        setWishlist([...wishlist, { user_id: user.id, product_id: productId }]);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Account</h1>
            <p className="mt-2 text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Log Out
          </button>
        </div>

        {error && (
          <div className="rounded-sm bg-red-50 p-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-8">
          <button
            onClick={() => setTab("orders")}
            className={`pb-4 text-sm font-medium ${
              tab === "orders"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setTab("wishlist")}
            className={`pb-4 text-sm font-medium ${
              tab === "wishlist"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders yet. Start shopping!</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{order.customer_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm mb-2">📞 {order.phone}</p>
                    {order.gift_message && (
                      <p className="text-sm text-muted-foreground mb-2">💝 {order.gift_message}</p>
                    )}
                    <p className="text-lg font-semibold">{formatINR(order.total)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {tab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <p className="text-muted-foreground">Your wishlist is empty. Add some favorites!</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {wishlist.map((fav) => {
                  const product = getProduct(fav.product_id);
                  if (!product) return null;
                  const isSaved = wishlist.some((w) => w.product_id === product.id);

                  return (
                    <div key={product.id} className="rounded-sm border p-4">
                      <div className="aspect-[4/5] rounded-sm bg-muted mb-4 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <button
                          onClick={() => toggleWishlist(product.id, isSaved)}
                          className="transition-colors"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              isSaved ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{product.short}</p>
                      <p className="font-semibold">{formatINR(product.price)}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
