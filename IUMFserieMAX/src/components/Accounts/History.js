import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { getComprasByUserId } from '../../api';

export const History = () => {
  const { user } = useContext(AuthContext);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        if (user) {
          const response = await getComprasByUserId(user.id_usuario);
          setPurchaseHistory(response);
        }
      } catch (error) {
        console.error('Error al obtener el historial de compras:', error);
      }
    };

    fetchPurchaseHistory();
  }, [user]);

  return (
    <div className="historyContainer">
      <h2>Historial de Compras</h2>
      <ul className="historyList">
        {purchaseHistory.map((purchase, index) => (
          <li key={index} className="historyItem">
            <div className="historyDetails">
              <h3>{purchase.Producto.nom_producto}</h3>
              <p>Fecha de Compra: {new Date(purchase.fecha_compra).toLocaleDateString()}</p>
              <p>Cantidad: {purchase.cantidad}</p>
              <p>Total: ${purchase.precio_total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;