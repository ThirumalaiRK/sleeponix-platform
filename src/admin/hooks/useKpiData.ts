import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Order } from '../../types';
import { FiTrendingUp, FiShoppingCart, FiClock, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

export const useKpiData = () => {
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKpiData = async () => {
    const { data, error } = await supabase.from('orders').select('status,total');

    if (error) {
      console.error('Error fetching KPI data:', error);
      setError('Failed to fetch KPI data.');
      setLoading(false);
      return;
    }

    const totalRevenue = data
      .filter((o: Partial<Order>) => o.status === 'Delivered')
      .reduce((sum: number, o: any) => sum + o.total, 0);

    const totalOrders = data.length;
    const pending = data.filter((o: Partial<Order>) => o.status === 'Pending').length;
    const completed = data.filter((o: Partial<Order>) => o.status === 'Delivered').length;
    const cancelled = data.filter((o: Partial<Order>) => o.status === 'Cancelled').length;
    const processing = data.filter((o: Partial<Order>) => o.status === 'Processing').length;

    setKpiData([
      { title: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, icon: FiTrendingUp },
      { title: 'Total Orders', value: totalOrders.toString(), icon: FiShoppingCart },
      { title: 'Pending', value: pending.toString(), icon: FiClock },
      { title: 'Completed', value: completed.toString(), icon: FiCheckCircle },
      { title: 'Cancelled', value: cancelled.toString(), icon: FiXCircle },
      { title: 'Processing', value: processing.toString(), icon: FiLoader },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    fetchKpiData();

    const channel = supabase
      .channel('kpi-data-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchKpiData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { kpiData, loading, error };
};