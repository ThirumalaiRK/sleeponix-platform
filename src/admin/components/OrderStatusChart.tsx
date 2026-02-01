import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { OrderStatus } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

const STATUS_COLORS: { [key in OrderStatus | 'Dispatched']: string } = {
  Pending: '#f9a825', // Yellow
  Processing: '#1e88e5', // Blue
  Shipped: '#43a047', // Green
  Delivered: '#7cb342', // Light Green
  Cancelled: '#e53935', // Red
  Returned: '#757575', // Grey
  Dispatched: '#fb8c00', // Orange
};

interface OrderStatusChartProps {
  statusData: { status: string; count: number }[];
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ statusData }) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (statusData && statusData.length > 0) {
      const labels = statusData.map((d) => d.status);
      const counts = statusData.map((d) => d.count);
      const backgroundColors = statusData.map((d) => STATUS_COLORS[d.status as OrderStatus] || '#cccccc');

      setChartData({
        labels,
        datasets: [
          {
            label: 'Order Status',
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      });
      setLoading(false);
    } else {
      setLoading(false);
      setError('No data available to display.');
    }
  }, [statusData]);

  if (loading) return <div className="text-center p-4">Loading Chart...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!statusData || statusData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-serif text-[#143d29] mb-4">Order Status Distribution</h2>
        <div className="text-center p-4">No order status data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-serif text-[#143d29] mb-4">Order Status Distribution</h2>
      <div style={{ height: '400px' }}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label += context.parsed;
                    }
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrderStatusChart;