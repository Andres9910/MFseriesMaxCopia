import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems, getTotal, removeFromCart, completePurchase } = useContext(CartContext);

  return (
    <div className="cartContainer">
      <h2>Carrito de Compras</h2>
      <ul className="cartList">
        {cartItems.map((item) => (
          <li key={item.id_producto} className="cartItem">
            <img src={item.imagen} alt={item.nom_producto} className="cartItemImage" />
            <div>
              <h3>{item.nom_producto}</h3>
              <p>Precio: ${item.precio_producto}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Total: ${item.precio_producto * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id_producto)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cartTotal">
        <h3>Total a Pagar: ${getTotal()}</h3>
        <button className="checkoutButton" onClick={completePurchase}>Comprar</button>
      </div>
    </div>
  );
};

export default Cart;