/**
 * =====================================================
 * Agrobusiness Marketplace
 * Copyright (c) 2026 iluze_ear
 * Author: iluze_ear
 * Created      : 2026-07-06
 * Last Updated : 2026-07-09
 * GitHub: https://github.com/Iluze25
 *
 * This project was created for educational purposes.
 * =====================================================
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
