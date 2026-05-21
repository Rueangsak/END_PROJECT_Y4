import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { AppThemeProvider } from './design-system';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppThemeProvider defaultMode="light">
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
