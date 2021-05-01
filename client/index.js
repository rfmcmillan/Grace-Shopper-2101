import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';
import store from './store';

render(<Main />, document.querySelector('#app'));
