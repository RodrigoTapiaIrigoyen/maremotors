import React from 'react';
import { Calendar, Search } from 'lucide-react';
import Table from '../components/ui/Table';
import { supabase } from '../lib/supabase';
import type { Rental } from '../types';

const Rentals = () => {
  const [rentals, setRentals] = React.useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const fetchRentals = async () => {
      const { data } = await supabase
        .from('rentals')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          ),
          products (
            name,
            model
          )
        `)
        .order('start_date', { ascending: false });
      
      if (data) setRentals(data);
    };

    fetchRentals();
  }, []);

  const columns = [
    { key: 'customer_name', title: 'Cliente' },
    { key: 'product_name', title: 'Producto' },
    { key: 'start_date', title: 'Inicio' },
    { key: 'end_date', title: 'Fin' },
    { key: 'status', title: 'Estado' },
    { key: 'total_price', title: 'Total' }
  ];

  const formattedRentals = rentals.map(rental => ({
    ...rental,
    customer_name: rental.customers?.name,
    product_name: `${rental.products?.name} - ${rental.products?.model}`,
    start_date: new Date(rental.start_date).toLocaleDateString(),
    end_date: new Date(rental.end_date).toLocaleDateString(),
    total_price: `$${rental.total_price.toLocaleString()}`,
    status: {
      pending: 'Pendiente',
      active: 'Activa',
      completed: 'Completada',
      cancelled: 'Cancelada'
    }[rental.status]
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reservas</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Calendar className="w-4 h-4" />
          Nueva Reserva
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar reservas..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={columns}
          data={formattedRentals}
          onRowClick={(rental) => console.log('Selected rental:', rental)}
        />
      </div>
    </div>
  );
};

export default Rentals;