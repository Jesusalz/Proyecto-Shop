import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/authSlice';
import { Card } from '@/components/common';
import { 
  UserCircleIcon, 
  ShoppingBagIcon, 
  HeartIcon,
  EnvelopeIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información Personal */}
        <Card className="md:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <UserCircleIcon className="h-16 w-16 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500 flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                {user?.email}
              </p>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <CalendarIcon className="h-5 w-5" />
              <span>Miembro desde: {new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>

        {/* Estadísticas */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Actividad</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ShoppingBagIcon className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Pedidos realizados</p>
                    <p className="text-2xl font-semibold text-gray-900">{user?.orders?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HeartIcon className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Productos favoritos</p>
                    <p className="text-2xl font-semibold text-gray-900">{user?.favorites?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
//Visita mi GitHub: https://github.com/Jesusalz
