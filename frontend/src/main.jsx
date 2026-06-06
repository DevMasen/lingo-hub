import '@fontsource/vazir';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ConfirmReserveProvider } from './context/ConfirmReserveContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ExitProvider } from './context/ExitContext.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';
import { SignupProvider } from './context/SignupContext.jsx';
import { PayProvider } from './context/PayContext.jsx';
import { HeaderProvider } from './context/HeaderContext.jsx';

import App from './App.jsx';
import { WalletProvider } from './context/WalletContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SignupProvider>
        <ExitProvider>
          <SidebarProvider>
            <ConfirmReserveProvider>
              <PayProvider>
                <HeaderProvider>
                  <WalletProvider>
                    <App />
                  </WalletProvider>
                </HeaderProvider>
              </PayProvider>
            </ConfirmReserveProvider>
          </SidebarProvider>
        </ExitProvider>
      </SignupProvider>
    </AuthProvider>
  </StrictMode>
);
