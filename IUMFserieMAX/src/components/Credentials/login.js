import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './../../api'; // Asegúrate de que la ruta sea correcta
import { AuthContext } from '../Auth/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { nom_usuario: username, pass_usuario: password };
      const response = await loginUser(userData);
      setSuccess('Inicio de sesión exitoso');
      setError('');
      login(response.token, username);
      if (response.rol == 1) {
        navigate('/admin-dashboard/' + response.userId);
      }else if (response.rol == 2) {
        navigate('/cart'); // Redirigir al usuario a la página del carrito
      }
       
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess('');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <p>Nombre de usuario</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Contraseña</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <button type="submit">Siguiente</button>
      </div>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
}