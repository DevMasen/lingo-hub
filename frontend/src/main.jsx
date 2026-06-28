import '@fontsource/vazir';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ExitProvider } from './context/ExitContext.jsx';

import { ConfirmReserveProvider } from './features/reserve/ConfirmReserveContext.jsx';
import { HeaderProvider } from './features/header/HeaderContext.jsx';
import { PayProvider } from './features/setting/PayContext.jsx';
import { SidebarProvider } from './features/sidebar/SidebarContext.jsx';
import { SignupProvider } from './features/authentication/SignupContext.jsx';
import { WalletProvider } from './features/wallet/WalletContext.jsx';

import App from './App.jsx';
//---

createRoot(document.getElementById('root')).render(
  <StrictMode>
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
  </StrictMode>
);
