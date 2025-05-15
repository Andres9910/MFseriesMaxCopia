import React, { useState } from 'react';
import { registerUser } from './../../api'; // Asegúrate de que la ruta sea correcta

export default function Registro() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const userData = { nom_usuario: username, pass_usuario: password };
      const response = await registerUser(userData);
      setSuccess('Usuario registrado exitosamente');
      setError('');
    } catch (error) {
      setError('Error al registrar usuario');
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
      <label>
        <p>Confirmar contraseña</p>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <button type="submit">Registrarse</button>
      </div>
    </form>
  );
}