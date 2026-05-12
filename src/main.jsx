import '@fontsource/vazir';
////////////////////////////
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
///////////////////////////////////////////////
import { ConfirmReserveProvider } from './context/ConfirmReserveContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ExitProvider } from './context/ExitContex.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';
import { SignupProvider } from './context/SignupContext.jsx';
import { PayProvider } from './context/PayContext.jsx';
/////////////////////////////////////////////////////////////
import App from './App.jsx';
////////////////////////////
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SignupProvider>
        <ExitProvider>
          <SidebarProvider>
            <ConfirmReserveProvider>
              <PayProvider>
                <App />
              </PayProvider>
            </ConfirmReserveProvider>
          </SidebarProvider>
        </ExitProvider>
      </SignupProvider>
    </AuthProvider>
  </StrictMode>
);
