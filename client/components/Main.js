import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

class Main extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <div>Welcome To Global Snacker!</div>
      //   <Router>

      //     {/* <Route component={Users} path="/users" exact /> */}
      //   </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
