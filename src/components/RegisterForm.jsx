import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { name, email, password }; 
    console.log(credentials); 

    try {
      const resultAction = await dispatch(register(credentials));
      if (register.fulfilled.match(resultAction)) {
        navigate('/login'); 
      } else {
        setError(resultAction.error.message); 
      }
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="border border-gray-300 rounded-md p-2 w-full"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border border-gray-300 rounded-md p-2 w-full"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        className="border border-gray-300 rounded-md p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;

