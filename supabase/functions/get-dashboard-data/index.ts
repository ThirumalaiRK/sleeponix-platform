import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Use the service role key for admin operations.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the user from the authorization header.
    const userClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    const { data: { user }, error: userError } = await userClient.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("User not found. Make sure you are logged in and the Authorization header is set.");

    // For safety, only allow this for the specific user we've been troubleshooting.
    if (user.email !== 'thirumalairk27@gmail.com') {
        return new Response(JSON.stringify({ error: "This function is restricted to a specific user." }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    // Update the user's app_metadata to include the admin role.
    const { data: updatedUser, error: updateUserError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { app_metadata: { ...user.app_metadata, role: 'admin' } }
    );

    if (updateUserError) {
      throw updateUserError;
    }

    return new Response(JSON.stringify({ message: "User role successfully updated to admin.", user: updatedUser }), {
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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY") ?? "";
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey
    );

    // Fetch all orders with all necessary fields for the dashboard
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        order_number,
        created_at,
        total,
        status,
        customer_name,
        customer_email,
        order_items ( quantity, product_name )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
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