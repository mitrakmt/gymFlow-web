import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import asyncLoader from 'shared-components/asyncComponentLoader';
import PrivateRoute from 'shared-components/privateRoute';
// import { refreshLogin } from 'actions/auth';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import _isEqual from 'lodash/isEqual';

import { getUserInfo } from 'actions/user';
import { getAuth } from 'utils/api';

// Relative imports
import Footer from '../footer/footer';
import Header from '../header/header';

import './app.css';

const asyncLogin = asyncLoader(() => require('../../containers/login/login'));
const asyncSignup = asyncLoader(() => require('../../containers/signup/signup'));
const asyncPasswordReset = asyncLoader(() => require('../../containers/password-reset/password-reset'));
const asyncProfile = asyncLoader(() => require('../../containers/profile/profile'));
const asyncEmailValidation = asyncLoader(() => require('../../containers/email-validation/emailValidation'))
const asyncHome = asyncLoader(() => require('../../containers/home/home'));
const asyncWorkouts = asyncLoader(() => require('../../containers/workouts/workouts'));
const asyncLoggedWorkouts = asyncLoader(() => require('../../containers/logged-workouts/loggedWorkouts'));
const asyncCreateWorkout = asyncLoader(() => require('../../containers/create-workout/createWorkout'));

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static contextTypes = {
    history: PropTypes.object,
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    getAuth()
    if (this.props.auth.profile)  {
      this.props.dispatch(getUserInfo(this.props.auth.profile.id))
    }
  }

  render() {
    return (
      <ScrollToTop history={this.props.history}>
        <div className="app">
          <Header />
          <div className="app-container">
            <Switch>
              <Route exact path="/" component={asyncHome} />
              <Route path="/signup" component={asyncSignup} />
              <Route path="/emailvalidation/:token" component={asyncEmailValidation} />
              <Route path="/login" component={asyncLogin} location={this.props.location} />
              <Route path="/passwordreset" component={asyncPasswordReset} />
              <PrivateRoute path="/profile" component={asyncProfile} />
              <PrivateRoute exact path="/profile/:username" component={asyncProfile} />
              <PrivateRoute exact path="/workouts" component={asyncWorkouts} />
              <PrivateRoute exact path="/loggedworkouts" component={asyncLoggedWorkouts} />
              <PrivateRoute exact path="/create" component={asyncCreateWorkout} />
              <Route component={asyncHome} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps)(App);
