import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Importar desde las nuevas rutas
import { Button, Input } from '@/components/common';
import { login } from '@/store/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(login(formData));
    
    // Verificar si la acción fue exitosa usando unwrap()
    if (!result.error) {
      navigate('/products');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={error?.email}
        required
        placeholder="tu@email.com"
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={error?.password}
        required
        placeholder="••••••••"
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>

      {error && typeof error === 'string' && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
