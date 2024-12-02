import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Importar componentes reutilizables desde la carpeta común
import { Button, Input } from '@/components/common';
import { login } from '@/store/authSlice';

const LoginForm = () => {
  // Utilizo useDispatch para enviar acciones a Redux y useNavigate para redirigir al usuario después del login
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Selecciono el estado de autenticación global, incluyendo errores y estado de carga
  const { error, loading } = useSelector((state) => state.auth);

  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Actualizo el estado local cada vez que el usuario escribe en un campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo el envío del formulario. Despacho la acción de login y, si es exitosa, redirijo al usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Despacho la acción de login y manejo el resultado con unwrap para detectar errores más fácilmente
      await dispatch(login(formData)).unwrap();
      navigate('/products'); // Redirijo al usuario al listado de productos después de un login exitoso
    } catch (err) {
      console.error('Error en el inicio de sesión:', err); // Registro el error en la consola para depuración
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campo de entrada para el email */}
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={error?.email} // Muestra un error específico si existe
        required
        placeholder="tu@email.com"
      />

      {/* Campo de entrada para la contraseña */}
      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={error?.password} // Muestra un error específico si existe
        required
        placeholder="••••••••"
      />

      {/* Botón de envío, deshabilitado mientras se realiza la solicitud */}
      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'} {/* Muestra un texto dinámico basado en el estado de carga */}
      </Button>

      {/* Mensaje de error general si el login falla */}
      {error && typeof error === 'string' && (
        <p className="text-red-500 text-sm text-center">
          {error || 'Error al iniciar sesión. Por favor, intenta de nuevo.'}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
