import '@fontsource/vazir';
////////////////////////////
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ExitProvider } from './context/ExitContex.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExitProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ExitProvider>
    </AuthProvider>
  </StrictMode>
);
