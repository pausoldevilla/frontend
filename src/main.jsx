import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import Contact from './pages/Contacto.jsx';
import './index.css';

import { CartProvider } from './pages/CartContext.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import About from './pages/About.jsx';
import Jardines from './pages/Jardines.jsx';
import Shop from './pages/Shop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="acerca" element={<About />} />
            <Route path="paisajismo" element={<Jardines />} />
            <Route path="tienda" element={<Shop />} />
            <Route path="producto/:id" element={<ProductDetail />} />
            <Route path="categoria/:categoryName" element={<CategoryPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
