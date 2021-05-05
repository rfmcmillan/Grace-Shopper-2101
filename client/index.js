// Where Render React Main Component
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './store';
import Main from './components/Main';

render(
  <Provider store={reduxStore.store}>
    <PersistGate loading={null} persistor={reduxStore.persistor}>
      <Main />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
);
