import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import asyncLoader from '../../shared-components/asyncComponentLoader';
// import { getAuth } from 'utils/api';
import PrivateRoute from '../../shared-components/privateRoute';
// import { refreshLogin } from 'actions/auth';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import _isEqual from 'lodash/isEqual';

// Relative imports
import Footer from '../footer/footer';
import Header from '../header/header';

import './app.css';

const asyncLogin = asyncLoader(() => require('../../containers/login/login'));
const asyncSignup = asyncLoader(() => require('../../containers/signup/signup'));
const asyncPasswordReset = asyncLoader(() => require('../../containers/password-reset/password-reset'));
const asyncProfile = asyncLoader(() => require('../../containers/profile/profile'));

class App extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };
  }

  static get defaultProps() {
    return {

    };
  }

  static get contextTypes() {
    return {
      history: PropTypes.object,
      router: PropTypes.object
    };
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <ScrollToTop history={this.props.history}>
        <div className="app">
          {/* <Header displayLobbyClosedAlert={this.displayLobbyClosedAlert} joinMatch={this.requestJoin} viewDashboard={this.viewDashboard} viewProfile={this.viewProfile} history={this.context.router} /> */}
          <div className="app-container">
            <Switch>
              <Route path="/signup" component={asyncSignup} />
              <Route path="/login" component={asyncLogin} location={this.props.location} />
              <Route path="/passwordreset" component={asyncPasswordReset} />
              <PrivateRoute path="/profile" component={asyncProfile} />
              <Route exact path="/:username" component={asyncProfile} />
              <Route component={asyncLogin} />
            </Switch>
          </div>
          {/* <Footer actions={this.actions} tosOpen={this.state.tosOpen} tosDialogClose={this.tosDialogClose} tosDialogOpen={this.tosDialogOpen} /> */}
        </div>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = ({  }) => {
  return { user: null };
};

export default connect(mapStateToProps)(App);
