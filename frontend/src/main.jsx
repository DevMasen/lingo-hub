import '@fontsource/vazir';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { HeaderProvider } from './features/header/HeaderContext.jsx';
import { SidebarProvider } from './features/sidebar/SidebarContext.jsx';
import { WalletProvider } from './features/wallet/WalletContext.jsx';
import App from './App.jsx';
//---

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <SidebarProvider>
        <HeaderProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </HeaderProvider>
      </SidebarProvider>
    </DarkModeProvider>
  </StrictMode>
);
