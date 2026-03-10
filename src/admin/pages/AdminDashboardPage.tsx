// ------------------------------------------------------
// ADMIN DASHBOARD PAGE — FINAL MERGED (ERROR-FREE)
// ------------------------------------------------------

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiShoppingCart,
  FiClock,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiArrowRight,
  FiMoreHorizontal,
  FiEye,
  FiMail,
  FiFileText,

} from "react-icons/fi";
import { subDays } from "date-fns";

import IncomeChart from "../components/IncomeChart";
import OrderStatusChart from "../components/OrderStatusChart";
import EmailSendForm from "../components/EmailSendForm";
import ReportsModal from "../components/ReportsModal";
import { initialEmailTemplates } from "../../emailTemplates";
import { supabase } from "../../supabaseClient";
import { EmailTemplate, Order, DashboardData } from "../adminTypes";

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
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");

  const selectedOrderObjects = recentOrders.filter((o) =>
    selectedOrders.includes(o.id)
  );

  /* ------------------------------------------------------
     FETCH DASHBOARD DATA
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
            backgroundColor: "rgba(20, 61, 41, 0.1)", // Softer green fill
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
        link: "/admin/income",
        icon: FiDollarSign,
        color: "text-[#143d29]",
        bg: "bg-[#e8f5e9]",
      },
      {
        title: "Total Orders",
        value: String(data.totalOrders || 0),
        link: "/admin/orders",
        icon: FiShoppingCart,
        color: "text-[#b45309]",
        bg: "bg-[#fff7ed]",
      },
      {
        title: "Pending",
        value: String(statusCounts.Pending || 0),
        link: "/admin/orders",
        icon: FiClock,
        color: "text-[#1d4ed8]",
        bg: "bg-[#eff6ff]",
      },
      {
        title: "Completed",
        value: String(statusCounts.Completed || 0),
        link: "/admin/orders",
        icon: FiCheckCircle,
        color: "text-[#15803d]",
        bg: "bg-[#f0fdf4]",
      },
      {
        title: "Cancelled",
        value: String(statusCounts.Cancelled || 0),
        link: "/admin/orders",
        icon: FiXCircle,
        color: "text-[#b91c1c]",
        bg: "bg-[#fef2f2]",
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

  /* ------------------------------------------------------
     ACTIONS
  ------------------------------------------------------ */


  const handleRefresh = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6efe6]">
        <FiLoader className="animate-spin text-[#143d29]" size={48} />
      </div>
    );
  }

  /* ------------------------------------------------------
     RENDER
  ------------------------------------------------------ */
  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#f6efe6] text-[#143d29] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      {/* 1️⃣ TOP HEADER – ACTION CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif text-[#143d29] tracking-tight">Dashboard</h1>
          <p className="text-[#5f4b3b] mt-2 text-lg">Overview of revenue, orders, and performance.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-[#fffaf1] border border-[#eadfcc] text-[#5f4b3b] py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#143d29] focus:border-transparent text-sm font-medium"
            >
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#5f4b3b]">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>

          {/* Action Buttons */}
          <button onClick={() => setIsReportsModalOpen(true)} className="flex items-center gap-2 bg-[#fffaf1] border border-[#eadfcc] text-[#5f4b3b] hover:bg-[#fcfcfc] px-4 py-2.5 rounded-lg shadow-sm text-sm font-medium transition-colors">
            <FiDownload /> PDF
          </button>

          <button className="flex items-center gap-2 bg-[#143d29] hover:bg-[#0f2e1f] text-white px-4 py-2.5 rounded-lg shadow-premium text-sm font-medium transition-colors transition-transform hover:-translate-y-0.5">
            <FiDownload /> Export CSV
          </button>



          <button onClick={handleRefresh} className="p-2.5 bg-[#fffaf1] border border-[#eadfcc] text-[#5f4b3b] hover:text-[#143d29] rounded-lg shadow-sm transition-colors" title="Refresh Data">
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* 2️⃣ METRIC CARDS – ACTIONABLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium hover:shadow-lg transition-all cursor-pointer relative group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${kpi.bg || "bg-gray-100"} ${kpi.color || "text-gray-600"}`}>
                <kpi.icon size={24} />
              </div>
              {/* Optional Trend Indicator - hidden for now as it needs real data comparison */}
              {/* <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <FiArrowUp className="mr-1" /> 12%
              </span> */}
            </div>
            <h3 className="text-3xl font-bold text-[#143d29] mb-1 font-serif">{kpi.value}</h3>
            <p className="text-sm text-[#5f4b3b] mb-4">{kpi.title}</p>
            <Link to={kpi.link || "#"} className={`text-sm font-semibold hover:underline flex items-center group-hover:translate-x-1 transition-transform ${kpi.color}`}>
              View Details <FiArrowRight className="ml-1" />
            </Link>
          </div>
        ))}
      </div>

      {/* 3️⃣ CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* INCOME GRAPH */}
        <div className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium lg:col-span-2">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#143d29] font-serif">Income Graph</h2>
              <p className="text-xs text-[#5f4b3b] mt-1">Revenue analysis over time</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 text-xs font-semibold bg-[#e8f5e9] text-[#143d29] px-3 py-1.5 rounded-full border border-[#c6f6d5]">
                <span className="w-2 h-2 rounded-full bg-[#143d29]"></span> Total Income (₹)
              </span>
              <button className="text-[#5f4b3b] hover:text-[#143d29] p-1"><FiMoreHorizontal size={20} /></button>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <IncomeChart chartData={incomeChartData} />
          </div>
        </div>

        {/* ORDER STATUS DONUT */}
        {orderStatusData && orderStatusData.length > 0 ? (
          <div className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium flex flex-col">
            <h2 className="text-xl font-bold text-[#143d29] mb-2 font-serif">Order Status Distribution</h2>
            <div className="flex-grow relative flex items-center justify-center">
              <OrderStatusChart statusData={orderStatusData} />
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs font-medium text-[#5f4b3b]">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#15803d]"></span> Completed</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b45309]"></span> Pending</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]"></span> Cancelled</div>
            </div>
          </div>
        ) : (
          <div className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium flex flex-col justify-center items-center text-center">
            <p className="text-[#5f4b3b]">No Order Data Available</p>
          </div>
        )}
      </div>

      {/* 5️⃣ NEW SECTION: QUICK ADMIN ACTIONS */}
      <h2 className="text-2xl font-bold text-[#143d29] mb-6 font-serif">Quick Admin Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link to="/admin/orders" className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium hover:shadow-lg hover:border-[#143d29] transition-all text-center group block">
          <div className="w-14 h-14 bg-[#e8f5e9] text-[#143d29] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FiEye size={24} />
          </div>
          <h3 className="font-bold text-[#143d29] mb-1 font-serif">View Orders</h3>
          <p className="text-xs text-[#5f4b3b]">Manage all customer orders</p>
        </Link>

        <Link to="/admin/income" className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium hover:shadow-lg hover:border-[#143d29] transition-all text-center group block">
          <div className="w-14 h-14 bg-[#ecfccb] text-[#3f6212] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FiDollarSign size={24} />
          </div>
          <h3 className="font-bold text-[#143d29] mb-1 font-serif">View Income</h3>
          <p className="text-xs text-[#5f4b3b]">Detailed financial analysis</p>
        </Link>

        <button onClick={() => setIsEmailModalOpen(true)} className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium hover:shadow-lg hover:border-[#143d29] transition-all text-center group">
          <div className="w-14 h-14 bg-[#f3e8ff] text-[#7e22ce] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FiMail size={24} />
          </div>
          <h3 className="font-bold text-[#143d29] mb-1 font-serif">Email Customers</h3>
          <p className="text-xs text-[#5f4b3b]">Send updates & offers</p>
        </button>

        <button onClick={() => setIsReportsModalOpen(true)} className="bg-[#fffaf1] p-6 rounded-[20px] border border-[#eadfcc] shadow-premium hover:shadow-lg hover:border-[#143d29] transition-all text-center group">
          <div className="w-14 h-14 bg-[#fff7ed] text-[#c2410c] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <FiFileText size={24} />
          </div>
          <h3 className="font-bold text-[#143d29] mb-1 font-serif">Download Reports</h3>
          <p className="text-xs text-[#5f4b3b]">Get monthly summaries</p>
        </button>
      </div>

      {/* TRUST FOOTER */}
      <div className="text-center text-xs text-[#5f4b3b] mt-12 pb-8 border-t border-[#eadfcc] pt-8 opacity-60">
        <p>© 2024 Sleeponix Admin Panel. All data is system generated and securely stored.</p>
      </div>

      {isEmailModalOpen && (
        <EmailSendForm
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          selectedOrders={selectedOrderObjects}
          templates={initialEmailTemplates}
        />
      )}

      {isReportsModalOpen && (
        <ReportsModal
          isOpen={isReportsModalOpen}
          onClose={() => setIsReportsModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default AdminDashboardPage;
