import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatsContextProvider } from './context/chatContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatsContextProvider>
  </AuthContextProvider>
);

reportWebVitals();
