import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";
import { nanoid } from "https://esm.sh/nanoid@4.0.0";

// Define the expected structure of the incoming request body
interface RequestBody {
  cartItems: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    size?: string;
    thickness?: string;
  }[];
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    delivery_instructions?: string;
  };
}

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("Create-order function invoked.");

    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY") ?? "";

    // New logging to diagnose the secret key issue
    if (serviceRoleKey) {
      console.log("SUCCESS: SERVICE_ROLE_KEY secret is available. Creating admin client.");
    } else {
      console.error("CRITICAL: SERVICE_ROLE_KEY secret is NOT available. The function will run with anonymous privileges and likely fail due to RLS.");
    }

    // Create a Supabase client with the service_role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey
    );

    // 1. Extract data from the request
    const { cartItems, customerDetails }: RequestBody = await req.json();
    console.log("Request body parsed:", { cartItems, customerDetails });

    if (!cartItems || !customerDetails) {
      throw new Error("Missing cartItems or customerDetails in the request.");
    }

    // 2. Calculate the total amount
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    console.log("Total amount calculated:", total);

    // 3. Generate a unique order ID
    const orderId = nanoid();
    console.log("Generated unique order ID:", orderId);

    // 4. Insert the main order record
    console.log("Attempting to insert into 'orders' table...");
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert([
        {
          id: orderId,
          customer_name: customerDetails.name,
          customer_email: customerDetails.email,
          customer_phone: customerDetails.phone,
          customer_address: customerDetails.address,
          total: total,
          status: "Pending", // Default status
          delivery_instructions: customerDetails.delivery_instructions,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("Error inserting into 'orders' table:", orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    console.log("Successfully inserted into 'orders' table:", orderData);
    const newOrderId = orderData.id;

    // 5. Prepare and insert the order items
    const orderItemsToInsert = cartItems.map((item) => ({
      order_id: newOrderId,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      thickness: item.thickness,
    }));

    console.log("Attempting to insert into 'order_items' table:", orderItemsToInsert);
    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItemsToInsert);

    if (itemsError) {
      console.error("Error inserting into 'order_items' table:", itemsError);
      // If items fail, we should ideally roll back the order insertion.
      await supabaseAdmin.from("orders").delete().eq("id", newOrderId);
      console.log("Rolled back order insertion due to item insertion failure.");
      throw new Error(`Failed to add items to order: ${itemsError.message}`);
    }

    console.log("Successfully inserted into 'order_items' table.");

    // 6. Return a success response
    return new Response(JSON.stringify({ orderId: newOrderId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});