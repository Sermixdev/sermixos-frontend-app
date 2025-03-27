import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store';
import Desktop from './components/Desktop/Desktop';
import GlobalStyles from './styles/GlobalStyles';

function App() {
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