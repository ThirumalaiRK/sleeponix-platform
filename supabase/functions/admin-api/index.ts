import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { jwtDecode, JwtPayload } from "https://esm.sh/jwt-decode@4.0.0";

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */
type DecodedToken = JwtPayload & {
  app_metadata?: {
    role?: string;
  };
};

/* -------------------------------------------------------
   CORS
------------------------------------------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* -------------------------------------------------------
   SUPABASE ADMIN CLIENT
------------------------------------------------------- */
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

/* -------------------------------------------------------
   SERVER
------------------------------------------------------- */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    /* ---------- AUTH ---------- */
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing Authorization header");

    const token = authHeader.split(" ")[1];
    const decoded: DecodedToken = jwtDecode(token);

    if (decoded.app_metadata?.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "User is not an admin" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    /* ---------- REQUEST BODY ---------- */
    const body = await req.json();
    const { action, payload } = body;

    /* =====================================================
       ACTION SWITCH
    ===================================================== */
    switch (action) {
      /* ===============================
         GET DASHBOARD DATA
      =============================== */
      case "GET_DASHBOARD_DATA": {
        const startDate = body.startDate ?? payload?.startDate;
        const endDate = body.endDate ?? payload?.endDate;

        if (!startDate || !endDate) {
          return new Response(
            JSON.stringify({ error: "Start and end dates are required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        /* ---------- MAIN ORDERS QUERY (ALIAS MERGED) ---------- */
        const { data: orders, error } = await supabaseAdmin
          .from("orders")
          .select(
            "id, order_number, created_at, status, customer_name, customer_email, total_amount:total, order_items(product_name, quantity, price)"
          )
          .gte("created_at", startDate)
          .lte("created_at", endDate);

        if (error) throw new Error(error.message);

        /* ---------- STATUS NORMALIZATION ---------- */
        const STATUS_MAP: Record<string, "Completed" | "Pending" | "Cancelled"> =
          {
            Delivered: "Completed",
            Shipped: "Completed",
            Completed: "Completed",
            Pending: "Pending",
            Processing: "Pending",
            Cancelled: "Cancelled",
          };

        const mappedOrders = (orders ?? []).map((o) => ({
          ...o,
          status: STATUS_MAP[o.status] ?? "Pending",
        }));

        const completedOrders = mappedOrders.filter(
          (o) => o.status === "Completed"
        );

        /* ---------- TOTAL REVENUE ---------- */
        const totalRevenue = completedOrders.reduce(
          (sum, o) => sum + (o.total_amount || 0),
          0
        );

        /* ---------- PREVIOUS PERIOD GROWTH ---------- */
        const periodLengthMs =
          new Date(endDate).getTime() - new Date(startDate).getTime();

        const previousStart = new Date(
          new Date(startDate).getTime() - periodLengthMs
        ).toISOString();

        const { data: previousOrders, error: prevError } =
          await supabaseAdmin
            .from("orders")
            .select("status, total_amount:total")
            .gte("created_at", previousStart)
            .lt("created_at", startDate);

        if (prevError) throw new Error(prevError.message);

        const previousRevenue = (previousOrders ?? [])
          .filter(
            (o) => STATUS_MAP[o.status ?? ""] === "Completed"
          )
          .reduce((sum, o) => sum + (o.total_amount || 0), 0);

        const growth =
          previousRevenue === 0
            ? totalRevenue > 0
              ? 100
              : 0
            : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

        /* ---------- DAILY INCOME (FILL MISSING DATES) ---------- */
        const dailyIncome = new Map<string, number>();
        let current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
          dailyIncome.set(current.toISOString().split("T")[0], 0);
          current.setDate(current.getDate() + 1);
        }

        completedOrders.forEach((o) => {
          const dateKey = new Date(o.created_at)
            .toISOString()
            .split("T")[0];
          dailyIncome.set(
            dateKey,
            (dailyIncome.get(dateKey) || 0) + (o.total_amount || 0)
          );
        });

        const incomeData = Array.from(dailyIncome.entries()).map(
          ([date, income]) => ({ date, income })
        );

        /* ---------- STATUS COUNTS ---------- */
        const statusCounts = mappedOrders.reduce(
          (acc, o) => {
            acc[o.status]++;
            return acc;
          },
          { Completed: 0, Pending: 0, Cancelled: 0 }
        );

        /* ---------- RECENT ORDERS ---------- */
        const recentOrders = [...mappedOrders]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 5);

        return new Response(
          JSON.stringify({
            totalRevenue,
            totalOrders: mappedOrders.length,
            statusCounts,
            incomeData,
            recentOrders,
            growth,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      /* ===============================
         GET ALL ORDERS
      =============================== */
      case "GET_ALL_ORDERS": {
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
            customer_address1,
            customer_city,
            customer_state,
            customer_postal_code,
            courier_name,
            shipping_status,
            status,
            total_amount:total,
            tracking_id,
            tracking_url,
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
          return new Response(
            JSON.stringify({ error: error.message }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(JSON.stringify({ orders }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      /* ===============================
         UPDATE ORDER STATUS
      =============================== */
      case "UPDATE_ORDER_STATUS": {
        const { orderId, status } = payload ?? {};

        if (!orderId || !status) {
          return new Response(
            JSON.stringify({ error: "orderId and status are required." }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const { data, error } = await supabaseAdmin
          .from("orders")
          .update({ status })
          .eq("id", orderId)
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      /* ===============================
         SEND EMAIL (PLACEHOLDER)
      =============================== */
      case "SEND_EMAIL": {
        const { to, subject, html } = payload ?? {};

        if (!to || !subject || !html) {
          return new Response(
            JSON.stringify({ error: "Missing email fields." }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        console.log("📧 EMAIL", { to, subject });

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      /* ===============================
         DELETE ORDER
      =============================== */
      case "DELETE_ORDER": {
        const { orderId } = payload ?? {};

        if (!orderId) {
          return new Response(
            JSON.stringify({ error: "orderId is required." }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // First, delete the associated order items
        const { error: itemsError } = await supabaseAdmin
          .from("order_items")
          .delete()
          .eq("order_id", orderId);

        if (itemsError) {
          console.error("Error deleting order items:", itemsError);
          return new Response(
            JSON.stringify({
              error: `Failed to delete order items: ${itemsError.message}`,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // Then, delete the order itself
        const { error: orderError } = await supabaseAdmin
          .from("orders")
          .delete()
          .eq("id", orderId);

        if (orderError) {
          console.error("Error deleting order:", orderError);
          return new Response(
            JSON.stringify({
              error: `Failed to delete order: ${orderError.message}`,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      /* ===============================
         INVALID ACTION
      =============================== */
      default:
        return new Response(
          JSON.stringify({ error: `Invalid action: ${action}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }
  } catch (err: any) {
    console.error("EDGE FUNCTION ERROR:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});