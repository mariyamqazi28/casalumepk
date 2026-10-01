import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import { WizzTechProtectionProvider } from "@wizztech/protection";
import "@wizztech/protection/dist/style.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WizzTechProtectionProvider platformUrl={import.meta.env.VITE_WIZZTECH_PLATFORM_URL}>
      <App /> 
    </WizzTechProtectionProvider>
  </React.StrictMode>
);
