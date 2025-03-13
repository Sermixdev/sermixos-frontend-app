import React from 'react';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import Desktop from './components/Desktop/Desktop';
import PasswordProtection from './components/Auth/PasswordProtection';
import GlobalStyles from './styles/GlobalStyles';
import { getEnvironmentConfig } from './config/environment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const config = getEnvironmentConfig();

  useEffect(() => {
    if (!config.isPasswordProtected) {
      setIsAuthenticated(true);
      return;
    }

    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, [config.isPasswordProtected]);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated && config.isPasswordProtected) {
    return (
      <>
        <GlobalStyles />
        <PasswordProtection onAuthenticate={handleAuthentication} />
      </>
    );
  }

  return (
    <Provider store={store}>
      <HelmetProvider>
        <DndProvider backend={HTML5Backend}>
          <GlobalStyles />
          <Desktop />
        </DndProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;