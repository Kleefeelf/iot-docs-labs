import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import AppDetailWrapper from './AppDetail.tsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/store/apps" element={<App />} />
        <Route path="/store/apps/:developerId/:id" element={<AppDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
