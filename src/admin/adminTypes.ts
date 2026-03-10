import { Order, OrderItem, OrderStatus } from '../types';

export type { Order, OrderItem, OrderStatus };

export interface EmailTemplate {
  id: string;
  trigger: string;
  title: string;
  description: string;
  subject: string;
  content: string;
}

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  statusCounts: { [key: string]: number };
  recentOrders: Order[];
  incomeData: { date: string; income: number }[];
  statusData: { status: string; count: number }[];
}
