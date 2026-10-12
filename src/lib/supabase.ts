import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          phone: string;
          email: string | null;
          total: number;
          gift_message: string | null;
          promo_code: string | null;
          status: "pending" | "confirmed" | "shipped" | "delivered";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["orders"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          price: number;
          quantity: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["order_items"]["Row"],
          "id" | "created_at"
        >;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["favorites"]["Row"],
          "id" | "created_at"
        >;
      };
    };
  };
};
