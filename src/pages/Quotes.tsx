import React from 'react';
import { FileText, Search } from 'lucide-react';
import Table from '../components/ui/Table';
import { supabase } from '../lib/supabase';
import type { Quote } from '../types';

const Quotes = () => {
  const [quotes, setQuotes] = React.useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const fetchQuotes = async () => {
      const { data } = await supabase
        .from('quotes')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });
      
      if (data) setQuotes(data);
    };

    fetchQuotes();
  }, []);

  const columns = [
    { key: 'customer_name', title: 'Cliente' },
    { key: 'product_type', title: 'Tipo' },
    { key: 'product_model', title: 'Modelo' },
    { key: 'status', title: 'Estado' },
    { key: 'created_at', title: 'Fecha' }
  ];

  const formattedQuotes = quotes.map(quote => ({
    ...quote,
    customer_name: quote.customers?.name,
    created_at: new Date(quote.created_at).toLocaleDateString(),
    product_type: quote.product_type === 'jetski' ? 'Moto Acuática' : 'Refacción',
    status: {
      pending: 'Pendiente',
      accepted: 'Aceptada',
      rejected: 'Rechazada'
    }[quote.status]
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cotizaciones</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <FileText className="w-4 h-4" />
          Nueva Cotización
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar cotizaciones..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={columns}
          data={formattedQuotes}
          onRowClick={(quote) => console.log('Selected quote:', quote)}
        />
      </div>
    </div>
  );
};

export default Quotes;