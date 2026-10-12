import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Your Orders — Srijan" },
      { name: "description", content: "View your order history" },
    ],
  }),
  component: Orders,
});

function Orders() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate({ to: "/login" });
      return;
    }

    const loadOrders = async () => {
      try {
        // Fetch only orders for the logged-in user
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate, user, authLoading]);

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your orders...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
        <p className="text-muted-foreground mb-8">Track all your orders from Srijan</p>

        {orders.length === 0 ? (
          <div className="rounded-sm border p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
            <a href="/shop" className="inline-flex rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-sm border p-6 hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{order.customer_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {order.id.slice(0, 8)}...
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 capitalize">
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-medium">{formatINR(order.total)}</p>
                  </div>
                  {order.promo_code && (
                    <div>
                      <p className="text-xs text-muted-foreground">Promo Code</p>
                      <p className="text-sm font-medium">{order.promo_code}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Shipping</p>
                    <p className="text-sm font-medium">
                      {order.total >= 2500 ? "Free" : "Calculated at checkout"}
                    </p>
                  </div>
                </div>

                {order.gift_message && (
                  <div className="rounded-sm bg-cream p-3">
                    <p className="text-xs text-muted-foreground">Gift Message</p>
                    <p className="text-sm italic">"{order.gift_message}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
