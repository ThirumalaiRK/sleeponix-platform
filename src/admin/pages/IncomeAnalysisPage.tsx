import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import { FiTrendingUp, FiDollarSign, FiShoppingCart, FiActivity } from 'react-icons/fi';
import { startOfMonth, subDays, format, differenceInDays } from 'date-fns';

import IncomeChart from '../components/IncomeChart';

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  growth?: string;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, growth, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-1">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <div className={`text-2xl ${color}`}>{icon}</div>
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {growth && <p className="text-sm text-gray-400 mt-1">{growth}</p>}
  </div>
);

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-8">
      <div>
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-72"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-64"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gray-200 h-32 rounded-2xl"></div>
      <div className="bg-gray-200 h-32 rounded-2xl"></div>
      <div className="bg-gray-200 h-32 rounded-2xl"></div>
      <div className="bg-gray-200 h-32 rounded-2xl"></div>
    </div>
    <div className="bg-gray-200 h-[420px] rounded-2xl"></div>
  </div>
);

interface ChartData {
  labels: string[];
  datasets: any[];
}

interface KpiData {
    totalIncome: number;
    growth: number;
    avgDailyIncome: number;
    totalOrders: number;
}

const IncomeAnalysisPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('this_month');

  const fetchIncomeData = useCallback(async (range: string) => {
    setLoading(true);
    setError(null);

    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    if (range === 'this_month') {
      startDate = startOfMonth(now);
    } else if (range === 'last_30_days') {
      startDate = subDays(now, 30);
    } else {
      startDate = startOfMonth(now);
    }

    try {
      const { data, error: functionError } = await supabase.functions.invoke('admin-api', {
        body: {
          action: 'GET_DASHBOARD_DATA',
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });

      if (functionError) throw new Error(functionError.message);
      if (data.error) throw new Error(data.db_error || data.error);
      if (!data.incomeData || data.incomeData.length === 0) {
          setKpiData({ totalIncome: 0, growth: 0, avgDailyIncome: 0, totalOrders: 0 });
          setChartData(null);
          return;
      }

      const { totalRevenue, totalOrders, growth, incomeData } = data;
      
      const numberOfDays = differenceInDays(endDate, startDate) + 1;
      const avgDailyIncome = totalRevenue > 0 && numberOfDays > 0 ? totalRevenue / numberOfDays : 0;

      setKpiData({ totalIncome: totalRevenue, growth, avgDailyIncome, totalOrders });

      const salesByDay = incomeData.reduce((acc: { [key: string]: number }, item: { date: string; income: number }) => {
        const day = format(new Date(item.date), 'MMM d');
        acc[day] = (acc[day] || 0) + item.income;
        return acc;
      }, {});
      
      const filledSales: { [key: string]: number } = {};
      for (let i = 0; i < numberOfDays; i++) {
          const date = subDays(endDate, i);
          const dayKey = format(date, 'MMM d');
          filledSales[dayKey] = salesByDay[dayKey] || 0;
      }
      const sortedLabels = Object.keys(filledSales).reverse();

      setChartData({
        labels: sortedLabels,
        datasets: [
          {
            label: 'Daily Income',
            data: sortedLabels.map(label => filledSales[label]),
            borderColor: '#143d29',
            backgroundColor: 'rgba(20, 61, 41, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      });

    } catch (err: any) {
      setError('Failed to fetch income data.');
      toast.error(err.message || 'An unexpected error occurred.');
      setKpiData(null);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncomeData(timeRange);

    const channel = supabase
      .channel('public:orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.new.status === 'Delivered') {
            toast.success('New order reflected in income!');
            fetchIncomeData(timeRange);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchIncomeData, timeRange]);

  const renderContent = () => {
    if (loading) return <SkeletonLoader />;
    if (error) return <div className="text-center p-10 bg-white rounded-lg shadow-sm"><p className="text-red-500">{error}</p></div>;
    if (!kpiData || !chartData) {
        return <div className="text-center p-10 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-serif text-[#143d29] mb-4">No Income Data</h2>
            <p>No income data available for the selected period.</p>
        </div>
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Total Income"
            value={`₹${kpiData.totalIncome.toLocaleString('en-IN')}`}
            icon={<FiDollarSign />}
            growth={`${kpiData.growth >= 0 ? '+' : ''}${kpiData.growth}%`}
            color="text-green-600"
          />
          <KpiCard
            title="Avg. Daily Income"
            value={`₹${kpiData.avgDailyIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
            icon={<FiActivity />}
            growth="In selected period"
            color="text-yellow-600"
          />
          <KpiCard
            title="Total Orders"
            value={kpiData.totalOrders.toString()}
            icon={<FiShoppingCart />}
            growth="Completed orders"
            color="text-purple-600"
          />
           <KpiCard
            title="Monthly Growth"
            value={`${kpiData.growth}%`}
            icon={<FiTrendingUp />}
            growth="Vs. previous period"
            color="text-blue-600"
          />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="h-[420px]">
            <IncomeChart chartData={chartData} />
          </div>
        </div>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 md:p-8 bg-[#F8F9FB] min-h-screen"
    >
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#0F3D2E]">
            Income Analysis
          </h1>
          <p className="text-gray-500 mt-1">
            Track and analyze your revenue performance over time.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
            {['This Month', 'Last 30 Days'].map(range => {
                const rangeKey = range.toLowerCase().replace(' ', '_');
                return (
                    <button 
                        key={rangeKey} 
                        onClick={() => setTimeRange(rangeKey)}
                        disabled={loading}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${timeRange === rangeKey ? 'bg-[#0F3D2E] text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {range}
                    </button>
                )
            })}
        </div>
      </header>
      {renderContent()}
    </motion.div>
  );
};

export default IncomeAnalysisPage;