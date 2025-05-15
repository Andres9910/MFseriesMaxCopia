import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from './../../imagenes/Logo.png';
import { CartContext } from '../Cart/CartContext';
import { AuthContext } from '../Auth/AuthContext';

export const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { getCartCount, balance } = useContext(CartContext);
  const { isAuthenticated, isAdminAuthenticated, username, logout, logoutAdmin } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    logout();
  };

  const handleAdminLogout = () => {
    logoutAdmin();
  };

  return (
    <header className="header">
      <div className="menu">
        <button className="menuButton" onClick={toggleDropdown}>☰</button>
        <div className={`dropdownContent ${isDropdownVisible ? 'show' : ''}`}>
          <Link to="/history" className="menuItem">Historial de Compras</Link>
          <Link to="/account-info" className="menuItem">Información de Cuentas</Link>
          <Link to="/recarga-saldo" className="menuItem">Recargar Saldo</Link>
        </div>
      </div>
      <div className="logo">
        <a href="/"><img src={Logo} alt="Logo" className="logoImage" /></a>
      </div>
      <div className="rightSection">
        <div className="balance" style={{ marginRight: '20px' }}>Saldo: ${balance} COP</div>
        {isAuthenticated ? (
          <>
            <span className="username">{username}</span>
            <button onClick={handleLogout} className="button logout">Cerrar sesión</button>
          </>
        ) : isAdminAuthenticated ? (
          <>
            <span className="username">{username} (Admin)</span>
            <button onClick={handleAdminLogout} className="button logout">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="button login">Iniciar sesión</Link>
            {/* <Link to="/admin-login" className="button login">Admin</Link> */}
          </>
        )}
        <div style={{ position: 'relative' }}>
          <Link to="/cart" className="button login">
            <i className="fas fa-shopping-cart"></i>
            <span className="cartCount">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;