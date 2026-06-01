import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { InstrumentProvider } from './context/InstrumentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <InstrumentProvider>
      <App />
    </InstrumentProvider>
  </AuthProvider>
);
