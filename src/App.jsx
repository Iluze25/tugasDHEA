import { useState } from 'react'
import './App.css'
import Home from './pages/marketplace/home.jsx'
import MCart from './pages/marketplace/MCart.jsx'
import Marketplace from './pages/marketplace/marketplace.jsx'
import Petani from './pages/marketplace/petani.jsx'
import News from './pages/marketplace/news.jsx'
import Profile from './pages/marketplace/profile.jsx'
import LoginMarketplace from "./pages/marketplace/login.jsx"

// Vendor
import DashboardVendor from "./pages/vendor/dashboard/dashboardvendor.jsx"
import Navbar1 from "./components/vendor/navbar.jsx"
import ProductsVendor from "./pages/vendor/products/productsvendor.jsx"
import OrderVendor from "./pages/vendor/orders/ordesvendor.jsx"
import InventoryVendor from "./pages/vendor/inventory/inventoryvendor.jsx"
import FinanceVendor from "./pages/vendor/finance/FinanceVendor.jsx"
import AnalVendor from "./pages/vendor/anal/analvendor.jsx"
import InvestmentVendor from "./pages/vendor/investment/investmentvendor.jsx"
import ReportVendor from "./pages/vendor/report/reportvendor.jsx"
import HomeAgro from "./pages/home.jsx"
import LoginVendor from "./pages/vendor/login.jsx"

// Investor
import LoginInvestor from "./pages/investor/login.jsx"
import Investor from "./pages/investor/investor.jsx"
import Navbar2 from "./components/investor/navbar.jsx"
import { Routes, Route } from "react-router-dom"

import Presentasi from "./pages/persentasi.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeAgro />} />

      {/* Investor */}

      <Route path="/logininvestor" element={<LoginInvestor />} />
      <Route path="/Investor" element={<Investor />} />

      {/* Vendor */}



      <Route path="/Presentasi" element={<Presentasi />} />


      <Route path="/loginvendor" element={<LoginVendor />} />
      <Route path="/Dashboardvendor" element={<DashboardVendor />} />
      <Route path="/ProdukVendor" element={<ProductsVendor />} />
      <Route path="/PesananVendor" element={<OrderVendor />} />
      <Route path="/InventarisVendor" element={<InventoryVendor />} />
      <Route path="/KeuanganVendor" element={<FinanceVendor />} />
      <Route path="/AnalisisVendor" element={<AnalVendor />} />
      <Route path="/InvestasiVendor" element={<InvestmentVendor />} />
      <Route path="/LaporanVendor" element={<ReportVendor />} />


      {/* Marketplace */}
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/loginmarketplace" element={<LoginMarketplace />} />
      <Route path="/petani" element={<Petani />} />
      <Route path="/news" element={<News />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<MCart />} />
    </Routes>
  );
}

export default App
