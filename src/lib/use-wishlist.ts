import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import { supabase } from "./supabase";

export function useWishlist() {
  const { user, isLoading: authLoading } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (authLoading || !user) {
      setCount(0);
      return;
    }

    const loadWishlistCount = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("id", { count: "exact" })
        .eq("user_id", user.id);

      if (!error && data) {
        setCount(data.length);
      }
    };

    loadWishlistCount();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`favorites:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorites",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          loadWishlistCount();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, authLoading]);

  return { count };
}
