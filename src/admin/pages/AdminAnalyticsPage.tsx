import React, { useState, useEffect } from 'react';
import OrderStatusChart from '../components/OrderStatusChart';
import IncomeChart from '../components/IncomeChart';
import { supabase } from '../../supabaseClient';

const AdminAnalyticsPage = () => {
  const [statusData, setStatusData] = useState<{ status: string; count: number }[]>([]);
  const [incomeData, setIncomeData] = useState<{ labels: string[]; datasets: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const { data, error: functionError } = await supabase.functions.invoke('admin-api', {
          body: { action: 'GET_DASHBOARD_DATA' },
        });

        if (functionError) {
          throw functionError;
        }
        
        if (data) {
          if (data.statusData) {
            setStatusData(data.statusData);
          }
          if (data.incomeData) {
            setIncomeData(data.incomeData);
          }
        } else {
            setError('No data returned from API.');
        }

      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching analytics data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="p-8 bg-[#f4efe7] min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-[#143d29]">
          Store Analytics
        </h1>
        <p className="text-[#5f4b3b] mt-2">
          A real-time overview of your store's performance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading chart...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <OrderStatusChart statusData={statusData} />
        )}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading chart...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <IncomeChart chartData={incomeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;