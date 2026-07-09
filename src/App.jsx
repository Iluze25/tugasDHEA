import { useState } from 'react'
import './App.css'
import Home from './pages/marketplace/home.jsx'
import MCart from './pages/marketplace/MCart.jsx'
import Marketplace from './pages/marketplace/marketplace.jsx'
import Petani from './pages/marketplace/petani.jsx'
import News from './pages/marketplace/news.jsx'
import Profile from './pages/marketplace/profile.jsx'

// Vendor
import DashboardVendor from "./pages/vendor/dashboard/dashboardvendor.jsx"
import Navbar1 from "./components/vendor/navbar.jsx"
import ProductsVendor from "./pages/vendor/products/productsvendor.jsx"
import OrderVendor from "./pages/vendor/orders/ordesvendor.jsx"
import InventoryVendor from "./pages/vendor/inventory/inventoryvendor.jsx"
import FinanceVendor from "./pages/vendor/finance/FinanceVendor.jsx"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar1 />} />
      {/* Vendor */}
      <Route path="/Dashboardvendor" element={<DashboardVendor />} />
      <Route path="/ProdukVendor" element={<ProductsVendor />} />
      <Route path="/PesananVendor" element={<OrderVendor />} />
      <Route path="/InventarisVendor" element={<InventoryVendor />} />
      <Route path="/KeuanganVendor" element={<FinanceVendor />} />
      {/* Marketplace */}
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/petani" element={<Petani />} />
      <Route path="/news" element={<News />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<MCart />} />
    </Routes>
  );
}

export default App
