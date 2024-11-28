import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UsersList, UserFilters } from '@/components/users';
import { Button, Card } from '@/components/common';
import { 
  UsersIcon,
  PlusIcon,
  FunnelIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  });

  const handleRefresh = () => {
    dispatch(fetchUsers());
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesSearch = !filters.search || 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());

    return matchesRole && matchesStatus && matchesSearch;
  });

  if (error) {
    return (
      <Card className="m-4 p-6 bg-red-50">
        <div className="text-center text-red-600">
          <h2 className="text-lg font-semibold">Error al cargar usuarios</h2>
          <p className="mt-2">{error}</p>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="mt-4"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-gray-900" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Usuarios
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gestiona los usuarios del sistema
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filtros
            </Button>

            <Button
              variant="primary"
              onClick={() => {/* Implementar creación de usuario */}}
              className="flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <Card className="mt-4 p-4">
            <UserFilters
              filters={filters}
              onChange={handleFilterChange}
            />
          </Card>
        )}

        {/* Estadísticas */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat) => (
            <Card key={stat.name} className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
              <div className={`mt-2 flex items-center text-sm ${
                stat.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change > 0 ? '+' : ''}{stat.change}% vs mes anterior
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de usuarios */}
      <Card className="overflow-hidden">
        <UsersList
          users={filteredUsers}
          loading={loading}
          onRefresh={handleRefresh}
          onEdit={(user) => {/* Implementar edición */}}
          onDelete={(userId) => {/* Implementar eliminación */}}
        />
      </Card>
    </div>
  );
};

// Datos de ejemplo para estadísticas
const userStats = [
  { name: 'Total Usuarios', value: '2,543', change: 12 },
  { name: 'Usuarios Activos', value: '1,921', change: 8 },
  { name: 'Nuevos este mes', value: '145', change: -3 },
  { name: 'Tasa de conversión', value: '75.5%', change: 4 },
];

export default UsersPage;