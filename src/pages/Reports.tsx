import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabase';

const Reports = () => {
  const [stats, setStats] = React.useState({
    totalRevenue: 0,
    averageRental: 0,
    topProducts: [],
    monthlyTrend: []
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      // Here you would fetch actual statistics from Supabase
      // For now, we'll use placeholder data
      setStats({
        totalRevenue: 125000,
        averageRental: 2500,
        topProducts: [],
        monthlyTrend: []
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="month">Este Mes</option>
          <option value="quarter">Este Trimestre</option>
          <option value="year">Este Año</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Ingresos Totales"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          trend={{ value: 15, isPositive: true }}
        />
        <Card
          title="Promedio por Renta"
          value={`$${stats.averageRental.toLocaleString()}`}
          icon={<BarChart className="w-6 h-6 text-blue-600" />}
          trend={{ value: 8, isPositive: true }}
        />
        <Card
          title="Tasa de Ocupación"
          value="85%"
          icon={<PieChart className="w-6 h-6 text-blue-600" />}
          trend={{ value: 5, isPositive: true }}
        />
        <Card
          title="Crecimiento Mensual"
          value="12%"
          icon={<LineChart className="w-6 h-6 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Ingresos Mensuales</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico de Ingresos
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Productos Más Rentados</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico de Productos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;