import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';

export const Productos = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  //para local
  // const API_URL = "http://localhost:4000"
  //para despliegue en internet
  const API_URL = "https://apimfseriemax.onrender.com"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`); // Cambia esto a la URL de tu backend si es diferente
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, quantity });
    alert('Producto añadido al carrito');
  };

  return (
    <div className="productosContainer">
      <ul className="productList">
        {products.map((product) => (
          <li key={product.id_producto} className="productItem">
            <img src={product.imagen} alt={product.nom_producto} className="productImage" />
            <div>
              <h3>{product.nom_producto}</h3>
              <p>Precio: ${product.precio_producto}</p>
              <input type="number" min="1" defaultValue="1" className="quantityInput" id={`quantity-${product.id_producto}`} />
              <button className="addToCartButton" onClick={() => {
                const quantity = parseInt(document.getElementById(`quantity-${product.id_producto}`).value, 10);
                handleAddToCart(product, quantity);
              }}>Añadir al Carrito</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;