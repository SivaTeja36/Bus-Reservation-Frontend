import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Bus, Building2, Users, Ticket, LogOut, Building } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isSuperAdmin = user.role === 'Super Admin';

  const menuItems = [
    { path: '/tickets', icon: <Ticket size={20} />, label: 'Tickets' },
    { path: '/buses', icon: <Bus size={20} />, label: 'Buses' },
    { path: '/companies', icon: <Building size={20} />, label: 'Companies' },
    ...(isSuperAdmin
      ? [
          { path: '/branches', icon: <Building2 size={20} />, label: 'Branches' },
          { path: '/users', icon: <Users size={20} />, label: 'Users' },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Bus Reservation</h1>
          <p className="text-sm text-gray-600 mt-1">{user.name}</p>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => logout()}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;