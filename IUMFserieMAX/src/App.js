import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Credentials/login';
import AdminLogin from './components/Admin/AdminLogin';
import { Productos } from './components/Products';
import { History } from './components/Accounts/History';  
import { AccountInfo } from './components/Accounts/Accountinfo';
import Registro from './components/Credentials/register';
import Cart from './components/Cart/Cart';
import RecargaSaldo from './components/Saldo/RecargaSaldo';
import { CartProvider } from './components/Cart/CartContext';
import AdminDashboard from './components/Admin/admin';
import { AuthProvider } from './components/Auth/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
            <Route path="/register" element={<Registro />} />
            <Route path="/history" element={<ProtectedRoute element={<History />} />} />
            <Route path="/account-info" element={<ProtectedRoute element={<AccountInfo />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/recarga-saldo" element={<ProtectedRoute element={<RecargaSaldo />} />} />
            <Route path="/admin-dashboard/:idAdmin" element={<ProtectedRoute element={<AdminDashboard />} isAdmin />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;