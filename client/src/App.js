// Desc: Main component that contains the routing for the app


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing_page.js';
import Login from './components/login.js';
import CreateAccount from './components/create_account.js';
import AccountPage from './components/account_page.js';
import ProductsPage from './components/shop.js';
import PublishProductPage from './components/publish_product.js';
import MyProductsPage from './components/my_products.js';
import ProductPage from './components/product.js';
import OrdersPage from './components/my_orders.js';
import { AuthProvider } from './components/auth_context.js';
import Navigation from './components/navigation.js';

let user = {
  username: '',
  isCreator: false
};

const App = () => {
  return (
    <AuthProvider>
    <Router>
    <Navigation/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="login" element={<Login user={user}/>} />
        <Route path="create-account" element={<CreateAccount/>} />
        <Route path="account" element={<AccountPage/>} />
        <Route path="shop" element={<ProductsPage/>} />
        <Route path="publish-product" element={<PublishProductPage/>} />
        <Route path="my-products" element={<MyProductsPage/>} />
        <Route path="shop/:productID" element={<ProductPage/>} />
        <Route path="my_orders" element={<OrdersPage/>} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
