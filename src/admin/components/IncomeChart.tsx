import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/* ----------------------------------
   Props
----------------------------------- */
interface IncomeChartProps {
  chartData: {
    labels: string[];
    datasets: any[];
  } | null;
}

/* ----------------------------------
   Component
----------------------------------- */
const IncomeChart: React.FC<IncomeChartProps> = ({ chartData }) => {
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data to display chart.</p>
      </div>
    );
  }

  /* ----------------------------------
     Chart Options (Typed)
  ----------------------------------- */
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          font: {
            family: 'Inter, sans-serif',
          },
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#0F3D2E',
        titleFont: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';

            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
              }).format(context.parsed.y);
            }

            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#6B7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
          // borderDash: [3, 3], // Commented out to fix type error
          // drawBorder: false, // Commented out to fix type error
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#6B7280',
          callback: (value: string | number) => {
            const numericValue =
              typeof value === 'string' ? parseFloat(value) : value;

            if (numericValue >= 1000) {
              return `₹${numericValue / 1000}k`;
            }
            return `₹${numericValue}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        backgroundColor: '#143d29',
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default IncomeChart;
