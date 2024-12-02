import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components/common';
import { register } from '@/store/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Estado local para manejar errores de registro
  const [error, setError] = useState(null);

  // Actualizo los datos del formulario cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Limpio los errores una vez que el usuario empieza a corregir sus inputs
    if (error) setError(null);
  };

  // Manejo el envío del formulario y la lógica de registro
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevengo el comportamiento por defecto del formulario
    setError(null); // Limpio cualquier error previo

    try {
      // Envío la acción de registro a Redux y manejo el resultado
      const resultAction = await dispatch(register(formData));

      // Verifico si el registro fue exitoso usando `fulfilled.match`
      if (register.fulfilled.match(resultAction)) {
        // Redirijo al usuario al login si el registro es exitoso
        navigate('/login');
      } else {
        // Mapeo el error para mostrar un mensaje amigable
        setError(resultAction.error.message || 'Ocurrió un error en el registro.');
      }
    } catch (err) {
      // Capturo cualquier error inesperado
      setError(err.message || 'Error inesperado. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input para el nombre del usuario */}
        <Input
          label="Nombre"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />

        {/* Input para el email */}
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />

        {/* Input para la contraseña */}
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        {/* Mensaje de error si ocurre algún problema en el registro */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Botón de envío con estado de carga */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz