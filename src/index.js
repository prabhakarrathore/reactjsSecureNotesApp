import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { HashRouter, Route, Routes } from 'react-router-dom';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);