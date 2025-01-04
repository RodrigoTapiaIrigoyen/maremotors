import React from 'react';
import { Waves, Users, FileText, Package, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    totalCustomers: 0,
    activeRentals: 0,
    pendingQuotes: 0,
    revenue: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      const { data: customers } = await supabase.from('customers').select('*');
      const { data: rentals } = await supabase
        .from('rentals')
        .select('*')
        .eq('status', 'active');
      const { data: quotes } = await supabase
        .from('quotes')
        .select('*')
        .eq('status', 'pending');

      setStats({
        totalCustomers: customers?.length || 0,
        activeRentals: rentals?.length || 0,
        pendingQuotes: quotes?.length || 0,
        revenue: 25000 // Example value
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Clientes Totales"
          value={stats.totalCustomers}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
        />
        <Card
          title="Rentas Activas"
          value={stats.activeRentals}
          icon={<Waves className="w-6 h-6 text-blue-600" />}
          trend={{ value: 8, isPositive: true }}
        />
        <Card
          title="Cotizaciones Pendientes"
          value={stats.pendingQuotes}
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          trend={{ value: 5, isPositive: false }}
        />
        <Card
          title="Ingresos Mensuales"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          trend={{ value: 15, isPositive: true }}
        />
      </div>
    </div>
  );
};

export default Dashboard;