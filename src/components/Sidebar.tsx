import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Package, 
  Calendar,
  BarChart,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clientes', path: '/customers' },
    { icon: FileText, label: 'Cotizaciones', path: '/quotes' },
    { icon: Package, label: 'Inventario', path: '/inventory' },
    { icon: Calendar, label: 'Reservas', path: '/rentals' },
    { icon: BarChart, label: 'Reportes', path: '/reports' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">MaremotorsWaverunners</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 w-52">
        <button className="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-2 w-full">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;