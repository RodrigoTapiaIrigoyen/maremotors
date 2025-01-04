import React from 'react';
import { Plus, Search } from 'lucide-react';
import Table from '../components/ui/Table';
import { supabase } from '../lib/supabase';
import type { Customer } from '../types';

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const columns = [
    { key: 'name', title: 'Nombre' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Teléfono' },
    { key: 'address', title: 'Dirección' }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar clientes..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={columns}
          data={filteredCustomers}
          onRowClick={(customer) => console.log('Selected customer:', customer)}
        />
      </div>
    </div>
  );
};

export default Customers;