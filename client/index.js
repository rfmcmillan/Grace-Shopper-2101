// Where Render React Main Component
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
