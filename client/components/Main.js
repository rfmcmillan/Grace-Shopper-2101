import React from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store, { loadUsers } from '../store';

class Main extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>Welcome To Global Snacker!</div>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadUsers());
    },
  };
};

//I couldn't get this to work with mapStateToProps or mapDispatchToProps yet
export default connect(mapStateToProps, mapDispatchToProps)(Main);
