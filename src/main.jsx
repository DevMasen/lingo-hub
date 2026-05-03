import '@fontsource/vazir';
////////////////////////////
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
///////////////////////////////////////////////
import { AuthProvider } from './context/AuthContext.jsx';
import { ExitProvider } from './context/ExitContex.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';
import { SignupProvider } from './context/SignupContext.jsx';
/////////////////////////////////////////////////////////////
import App from './App.jsx';
////////////////////////////
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SignupProvider>
        <ExitProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </ExitProvider>
      </SignupProvider>
    </AuthProvider>
  </StrictMode>
);
