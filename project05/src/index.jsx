import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import AppThemeProvider from './design-system/theme/AppThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppThemeProvider defaultMode="light">
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
