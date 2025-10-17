// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import MetricCard from "../components/atoms/MetricCard";
import SmallMetricCard from "../components/atoms/SmallMetricCard";
import {
  getDashboardMetrics,
  getDailyRevenue,
  getPerformanceMetrics,
  getSystemHealth,
} from "../lib/api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

//  Types 
interface BusinessMetrics {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
}

interface DailyRevenue {
  date: string;
  revenue: number;
  orderCount: number;
}

interface PerformanceMetrics {
  apiLatency: number;
  dbQueryTime: number;
  activeUsers: number;
  failedRequests: number;
  cpuUsage: number;
  memoryUsage: number;
}

interface SystemHealth {
  dbStatus: string;
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;
  activeUsers: number;
  lastUpdated: string;
}

// Component 
const AdminDashboard: React.FC = () => {
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await getDashboardMetrics();
        const revenue = await getDailyRevenue("2025-10-01", "2025-10-15");
        const performance = await getPerformanceMetrics();
        const health = await getSystemHealth();

        setBusinessMetrics(metrics);
        setDailyRevenue(revenue);
        setPerformanceMetrics(performance);
        setSystemHealth(health);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (!businessMetrics) return <div className="p-4">No metrics data available</div>;

  //  Chart Data 
  const revenueChartData: ChartData<"bar" | "line", number[], string> = {
    labels: dailyRevenue.map((d) => d.date),
    datasets: [
      {
        label: "Revenue",
        data: dailyRevenue.map((d) => d.revenue),
        type: "line" as const,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        yAxisID: "y1",
      },
      {
        label: "Orders",
        data: dailyRevenue.map((d) => d.orderCount),
        type: "bar" as const,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        yAxisID: "y",
      },
    ],
  };

  const revenueChartOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Revenue & Orders Over Time" },
    },
    scales: {
      y: { type: "linear", position: "left", title: { display: true, text: "Orders" } },
      y1: { type: "linear", position: "right", title: { display: true, text: "Revenue ($)" } },
    },
  };

  //  Render 
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value={`$${businessMetrics.totalRevenue.toFixed(2)}`} color="bg-blue-600" />
        <MetricCard title="Total Orders" value={businessMetrics.totalOrders} color="bg-green-600" />
        <MetricCard title="Average Order Value" value={`$${businessMetrics.averageOrderValue.toFixed(2)}`} color="bg-purple-600" />
        <MetricCard title="Pending Orders" value={businessMetrics.pendingOrders} color="bg-yellow-600" />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded shadow">
        {dailyRevenue.length > 0 ? (
          <Chart type="bar" data={revenueChartData} options={revenueChartOptions} />
        ) : (
          <p>No revenue data available</p>
        )}
      </div>

      {/* Performance Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
        {performanceMetrics ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <SmallMetricCard title="API Latency" value={`${performanceMetrics.apiLatency} ms`} color="bg-blue-500" />
            <SmallMetricCard title="DB Query Time" value={`${performanceMetrics.dbQueryTime ?? 0} ms`} color="bg-green-500" />
            <SmallMetricCard title="Active Users" value={performanceMetrics.activeUsers} color="bg-purple-500" />
            <SmallMetricCard title="Failed Requests" value={performanceMetrics.failedRequests} color="bg-red-500" />
            <SmallMetricCard title="CPU Usage" value={`${performanceMetrics.cpuUsage ?? 0}%`} color="bg-yellow-500" />
            <SmallMetricCard title="Memory Usage" value={`${performanceMetrics.memoryUsage ?? 0}%`} color="bg-indigo-500" />
          </div>
        ) : (
          <p>No performance metrics available</p>
        )}
      </div>

      {/* System Health */}
      <div>
        <h2 className="text-xl font-semibold mb-2">System Health</h2>
        {systemHealth ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <SmallMetricCard title="DB Status" value={systemHealth.dbStatus} color="bg-green-600" />
            <SmallMetricCard title="CPU Usage" value={`${systemHealth.cpuUsage}%`} color="bg-red-600" />
            <SmallMetricCard title="Memory Usage" value={`${systemHealth.memoryUsage}%`} color="bg-purple-600" />
            <SmallMetricCard title="Disk Space" value={`${systemHealth.diskSpace}%`} color="bg-yellow-600" />
            <SmallMetricCard title="Active Users" value={systemHealth.activeUsers} color="bg-blue-600" />
            <SmallMetricCard title="Last Updated" value={new Date(systemHealth.lastUpdated).toLocaleString()} color="bg-indigo-600" />
          </div>
        ) : (
          <p>No system health data available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
