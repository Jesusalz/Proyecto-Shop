import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "@/store/authSlice";
import { Button, Card, Input } from "@/components/common";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const resultAction = await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));

      if (register.fulfilled.match(resultAction)) {
        navigate('/login', { 
          state: { message: '¡Registro exitoso! Por favor, inicia sesión.' } 
        });
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: err.message
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Logo */}
      <div className="pt-8 text-center">
        <Link to="/" className="inline-flex items-center space-x-2">
          <ShoppingBagIcon className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold text-gray-900">
            Mi Tienda
          </span>
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Crear una cuenta
            </h1>
            <p className="mt-2 text-gray-600">
              ¡Únete a nuestra comunidad!
            </p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              error={errors.name}
            />

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              error={errors.email}
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              error={errors.password}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white 
                       py-2 px-4 rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login"
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Inicia sesión
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <Link 
              to="/terms"
              className="text-purple-600 hover:text-purple-500"
            >
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link 
              to="/privacy"
              className="text-purple-600 hover:text-purple-500"
            >
              Política de Privacidad
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
