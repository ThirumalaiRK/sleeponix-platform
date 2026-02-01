// ------------------------------------------------------
// ADMIN DASHBOARD PAGE — FINAL MERGED (ERROR-FREE)
// ------------------------------------------------------

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiShoppingCart,
  FiClock,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { subDays } from "date-fns";

import IncomeChart from "../components/IncomeChart";
import OrderStatusChart from "../components/OrderStatusChart";
import EmailSendForm from "../components/EmailSendForm";
import { supabase } from "../../supabaseClient";
import { EmailTemplate, Order } from "../adminTypes";

/* ------------------------------------------------------
   TYPES
------------------------------------------------------ */
// Local Order interface removed, using imported one.

/* ------------------------------------------------------
   EMAIL TEMPLATES
------------------------------------------------------ */
const initialEmailTemplates: EmailTemplate[] = [
  {
    id: "order-confirmation",
    trigger: "Order Confirmation",
    title: "Your Sleeponix Order is Confirmed",
    description: "Sent when order is placed",
    subject: "Your Sleeponix Order is Confirmed!",
    content:
      "Dear {{customer_name}},\n\nYour order {{order_id}} has been confirmed.\n\nThank you,\nSleeponix Team",
  },
];

/* ------------------------------------------------------
   COMPONENT
------------------------------------------------------ */
const AdminDashboardPage: React.FC = () => {
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<
    { status: string; count: number }[] | null
  >(null);
  const [incomeChartData, setIncomeChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const selectedOrderObjects = recentOrders.filter((o) =>
    selectedOrders.includes(o.id)
  );

  /* ------------------------------------------------------
     FETCH DASHBOARD DATA (UNCHANGED)
  ------------------------------------------------------ */
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    const endDate = new Date();
    const startDate = subDays(endDate, 30);

    const { data, error } = await supabase.functions.invoke("admin-api", {
      body: {
        action: "GET_DASHBOARD_DATA",
        payload: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      setLoading(false);
      return;
    }

    if (data.incomeData) {
      setIncomeChartData({
        labels: data.incomeData.map((d: any) =>
          new Date(d.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        ),
        datasets: [
          {
            label: "Total Income (₹)",
            data: data.incomeData.map((d: any) => d.income),
            fill: true,
            backgroundColor: "rgba(20, 61, 41, 0.2)",
            borderColor: "#143d29",
            tension: 0.3,
          },
        ],
      });
    }

    const statusCounts = data.statusCounts || {};

    setKpiData([
      {
        title: "Total Revenue",
        value: `₹${(data.totalRevenue || 0).toLocaleString("en-IN")}`,
        icon: FiDollarSign,
      },
      {
        title: "Total Orders",
        value: String(data.totalOrders || 0),
        icon: FiShoppingCart,
      },
      {
        title: "Pending",
        value: String(statusCounts.Pending || 0),
        icon: FiClock,
      },
      {
        title: "Completed",
        value: String(statusCounts.Completed || 0),
        icon: FiCheckCircle,
      },
      {
        title: "Cancelled",
        value: String(statusCounts.Cancelled || 0),
        icon: FiXCircle,
      },
    ]);

    setRecentOrders(data.recentOrders || []);

    const transformedStatusData = Object.entries(statusCounts).map(
      ([status, count]) => ({
        status,
        count: count as number,
      })
    );

    setOrderStatusData(transformedStatusData);
    setLoading(false);
  };

  /* ------------------------------------------------------
     REALTIME
  ------------------------------------------------------ */
  useEffect(() => {
    fetchDashboardData();

    const channel = supabase
      .channel("order-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => setTimeout(fetchDashboardData, 500)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin" size={48} />
      </div>
    );
  }

  /* ------------------------------------------------------
     UI MERGED BELOW (SAFE)
  ------------------------------------------------------ */
  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of revenue, orders, and performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {kpiData.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-between min-h-[140px]"
          >
            <kpi.icon className="text-gray-400 mb-4" size={22} />
            <div>
              <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 lg:col-span-2">
          <IncomeChart chartData={incomeChartData} />
        </div>

        {orderStatusData && orderStatusData.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <OrderStatusChart statusData={orderStatusData} />
          </div>
        )}
      </div>

      {isEmailModalOpen && (
        <EmailSendForm
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          selectedOrders={selectedOrderObjects}
          templates={initialEmailTemplates}
        />
      )}
    </motion.div>
  );
};

export default AdminDashboardPage;
