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
const asyncEmailValidation = asyncLoader(() => require('../../containers/email-validation/emailValidation'))

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProp = {

  }

  static contextTypes = {
    history: PropTypes.object,
    router: PropTypes.object
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
          <Header />
          <div className="app-container">
            <Switch>
              <Route path="/signup" component={asyncSignup} />
              <Route path="/emailvalidation/:token" component={asyncEmailValidation} />
              <Route path="/login" component={asyncLogin} location={this.props.location} />
              <Route path="/passwordreset" component={asyncPasswordReset} />
              <PrivateRoute path="/profile" component={asyncProfile} />
              <Route exact path="/:username" component={asyncProfile} />
              <Route component={asyncLogin} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = ({  }) => {
  return { user: null };
};

export default connect(mapStateToProps)(App);
