import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatsContextProvider } from './context/chatContext';
import { AuthContextProvider } from './context/AuthContext';
import { OfferContextProvider } from './context/OffersContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationContextProvider } from './context/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <OfferContextProvider>
      <ChatsContextProvider>
        <SocketProvider>
          <NotificationContextProvider>
              <App />
            </NotificationContextProvider>
        </SocketProvider>
      </ChatsContextProvider>
    </OfferContextProvider>
  </AuthContextProvider>
);

reportWebVitals();
