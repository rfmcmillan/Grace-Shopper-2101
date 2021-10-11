import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import reduxStore from './store';
import Main from './components/Main';

const theme = createTheme({
  palette: {
    background: {
      default: '#F6F9FC',
      paper: '#ffffff',
    },
    error: {
      contrastText: '#000000',
      main: '#a83942',
    },
    primary: {
      contrastText: '#000000',
      main: '#5061a9',
    },
    secondary: {
      contrastText: '#000000',
      main: '#5c4fa8',
    },
    success: {
      contrastText: '#000000',
      main: '#261689',
    },
    info: {
      main: '#5061a9',
    },
    text: {
      primary: '#2B3445',
      secondary: '#5d5f70',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

render(
  <Provider store={reduxStore.store}>
    <MuiThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <Main />
      </PersistGate>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
