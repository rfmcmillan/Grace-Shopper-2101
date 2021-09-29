// Where Render React Main Component
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import {
//   ThemeProvider as MuiThemeProvider,
//   createTheme,
// } from '@material-ui/styles';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import reduxStore from './store';
import Main from './components/Main';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    error: {
      contrastText: '#ffffff',
      main: '#a83942',
    },
    primary: {
      contrastText: '#e4ddee',
      main: '#5061a9',
    },
    secondary: {
      contrastText: '#9FE2BF',
      main: '#5c4fa8',
    },
    success: {
      contrastText: '#ffffff',
      main: '#261689',
    },
    info: {
      main: '#5061a9',
    },
    text: {
      primary: '#4d2a4e',
      secondary: '#9671a2',
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
