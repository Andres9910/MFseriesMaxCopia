import React, { useState, useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import { AuthContext } from '../Auth/AuthContext'; // Importar AuthContext para obtener la ID del usuario
import { recargarSaldo } from '../../api';

export default function RecargaSaldo() {
  const [amount, setAmount] = useState('');
  const { addBalance } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado
  const userId = user ? user.id_usuario : null; // Obtener la ID del usuario

  const handleRecharge = async (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount);
    if (!isNaN(amountNumber) && amountNumber > 0 && userId) {
      try {
        await recargarSaldo({ id_usuario: userId, monto_recargado: amountNumber });
        addBalance(amountNumber);
        setAmount('');
        alert(`Recarga exitosa de $${amountNumber} COP`);
      } catch (error) {
        console.error('Error al recargar saldo:', error);
        alert('Error al recargar saldo. Por favor, inténtelo de nuevo.');
      }
    } else {
      alert('Por favor seleccione un monto válido');
    }
  };

  return (
    <div>
      <h2>Recargar Saldo</h2>
      <form onSubmit={handleRecharge}>
        <label>
          Monto a recargar (COP):
          <select value={amount} onChange={(e) => setAmount(e.target.value)}>
            <option value="">Seleccione un monto</option>
            <option value="10000,0">10,000</option>
            <option value="20000,0">20,000</option>
            <option value="50000,0">50,000</option>
            <option value="100000,0">100,000</option>
          </select>
        </label>
        <button type="submit">Recargar</button>
      </form>
    </div>
  );
}