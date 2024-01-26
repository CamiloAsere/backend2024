import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './Routes';
import GlobalStyles from './GlobalStyles';
    
    ReactDOM.render(
      <React.StrictMode>
        <GlobalStyles />
        <AppRoutes />
      </React.StrictMode>,
      document.getElementById('root')
    );