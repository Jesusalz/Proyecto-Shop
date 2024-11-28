import React from 'react';
import { Input } from '@/components/common';

const UserFilters = ({ filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Input
        label="Buscar"
        type="text"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
        placeholder="Nombre o email..."
      />

      <select
        value={filters.role}
        onChange={(e) => onChange({ role: e.target.value })}
        className="form-select rounded-lg border-gray-300"
      >
        <option value="">Todos los roles</option>
        <option value="admin">Administrador</option>
        <option value="user">Usuario</option>
        <option value="editor">Editor</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        className="form-select rounded-lg border-gray-300"
      >
        <option value="">Todos los estados</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
        <option value="pending">Pendiente</option>
      </select>
    </div>
  );
};

export default UserFilters;
