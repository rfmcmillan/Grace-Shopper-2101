// Where Render React Main Component
import { render } from 'react-dom';
import Main from './components/Main';
import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <div>Welcome To Global Snacker!</div>
    <Main />
  </Provider>,
  document.getElementById('app')
);

export { Main };
