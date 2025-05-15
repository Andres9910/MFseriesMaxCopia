import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from './../../api';
import { AuthContext } from '../Auth/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin: loginAdminContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const adminData = { email_admin: email, pass_admin: password };
        // console.log('Datos enviados:', adminData); // Depuración
        const response = await loginAdmin(adminData);

        // console.log('Respuesta del servidor:', response); // Depuración
        loginAdminContext(response.token, email);
        navigate('/admin-dashboard/' + response.idAdmin);
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <p>Correo electrónico</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Contraseña</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
  );
};

export default AdminLogin;