import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

// Define CORS headers directly in the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create Supabase admin client to bypass RLS
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY") ?? "";
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey,
      // It's crucial to use the service_role key for admin operations
      { global: { headers: { Authorization: `Bearer ${serviceRoleKey}` } } }
    );

    // Fetch the 10 most recent orders
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(`
        id, 
        order_id,
        created_at, 
        customer_name, 
        customer_email, 
        status, 
        payment_status,
        subtotal,
        shipping_fee,
        total_amount,
        delivery_date_estimate,
        order_items (
          product_name,
          quantity,
          price
        )
      `)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    // Return the data with correct CORS headers
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Return an error response with correct CORS headers
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});