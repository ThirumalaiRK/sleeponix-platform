import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        id,
        order_number,
        created_at,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        total,
        status,
        order_items (
          id,
          product_id,
          quantity,
          price,
          product_name
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(orders), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});