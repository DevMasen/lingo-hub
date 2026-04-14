import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RoomsProvider } from './context/roomsContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RoomsProvider>
        <App />
      </RoomsProvider>
    </AuthProvider>
  </StrictMode>
);
