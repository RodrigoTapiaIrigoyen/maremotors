import React from 'react';
import { Package, Search, Filter } from 'lucide-react';
import Table from '../components/ui/Table';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

const Inventory = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProducts(data);
    };

    fetchProducts();
  }, []);

  const columns = [
    { key: 'name', title: 'Nombre' },
    { key: 'type', title: 'Tipo' },
    { key: 'brand', title: 'Marca' },
    { key: 'model', title: 'Modelo' },
    { key: 'condition', title: 'Estado' },
    { key: 'price', title: 'Precio' },
    { key: 'available', title: 'Disponible' }
  ];

  const filteredProducts = products
    .filter(product => filter === 'all' || product.type === filter)
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Package className="w-4 h-4" />
          Agregar Producto
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="jetski">Motos Acuáticas</option>
          <option value="part">Refacciones</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          columns={columns}
          data={filteredProducts.map(product => ({
            ...product,
            price: `$${product.price.toLocaleString()}`,
            available: product.available ? '✅' : '❌'
          }))}
          onRowClick={(product) => console.log('Selected product:', product)}
        />
      </div>
    </div>
  );
};

export default Inventory;