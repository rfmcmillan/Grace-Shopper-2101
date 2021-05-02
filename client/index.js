<<<<<<< HEAD
// Where Render React Main Component
console.log('hello');
=======
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './components/Main';

<<<<<<< HEAD
render(<Main />, document.querySelector('#app'));
>>>>>>> 44bed47432f22f3557badd1d5a87b6f0df13b541
=======
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.querySelector('#app')
);
>>>>>>> 9f104bc4dbfb94d79cde201b85318a4dcc7c01ab
