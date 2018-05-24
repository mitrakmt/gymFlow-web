import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserInfo } from 'actions/user';
import { login } from '../../actions/auth';

import './login.css';


class Login extends Component {
  static defaultProps = {
    user: null
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      emailError: '',
      emailTouched: false,
      password: '',
      loggingIn: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem('access_token')) {
      this.context.router.history.push('/home');
    }
  }

  /**
   * Checks for successful or unsuccessful login and either redirects
   * them or shows failed login error.
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.profile) {
      try {
        const redirect = this.props.location.state.from.pathname || '/';
        this.context.router.history.push(redirect);
      } catch (err) {
        this.context.router.history.push('/');
      }
    }
  }

  /**
   * Updates the local state of Login Component.
  */
  inputChanged = (event) => {
    this.setState({
        [event.target.id]: event.target.value
    })
  }

  isValidEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(this.state.email);
  }

  validateEmail = () => {
    if (this.state.emailTouched && !this.isValidEmail()) {
      this.setState({
        emailError: 'Should be a valid email (valid@email.com)'
      });
    } else {
      this.setState({
        emailError: ''
      });
    }
  }

  updateEmail = (event) => {
    this.setState({
      email: event.target.value
    }, this.validateEmail);
  }

  emailTouched = () => this.setState({
    emailTouched: true
  });

  /**
   * Key listener to login on 'enter'
  */
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  /**
   * Handles a login attempt by dispatching the login action.
  */
  handleLogin = () => {
    this.toggleLoggingIn();

    this.props.dispatch(login(this.state.email, this.state.password))
      .then((response) => {
        if (response.type === 'LOGIN_SUCCESS') {
          this.toggleLoggingIn();
          this.props.dispatch(getUserInfo());
          this.context.router.history.push('/');
        }
      });
  }

  toggleLoggingIn = () => this.setState({
    loggingIn: !this.state.loggingIn
  });

  render() {
    return (
      <div className="login">
        <div className="form-container">
            <div className="login__input-container">
              { /* fake fields are a workaround for chrome autofill getting the wrong fields */}
              { /* see http://stackoverflow.com/questions/15738259/disabling-chrome-autofill */}
              <input style={{ display: 'none' }} type="email" name="email" />
              <input style={{ display: 'none' }} type="password" name="password" />

              <input
                id="email"
                className="login-input-text"
                floatingLabelText="Email"
                onKeyPress={this.handleKeyPress}
                hintText="john.smith@gmail.com"
                value={this.state.email}
                onChange={this.updateEmail}
                onBlur={this.emailTouched}
                type="email"
                errorText={this.state.emailError}
                fullWidth
              />
              <input
                id="password"
                className="login-input-text"
                floatingLabelText="Password"
                onKeyPress={this.handleKeyPress}
                onChange={this.inputChanged}
                type="password"
                fullWidth
              />
              {
                (this.props.auth.loginError) &&
                <p className="color-warning">Incorrect email or password</p>
              }
              <button
                disabled={this.state.loggingIn}
                className="login__button"
                label="Login"
                onTouchTap={this.handleLogin}
                fullWidth
              />
            </div>
            <span className="login-inputContainer-textLinks">
              <p className="createAccountString"><Link to="/signup">Create Account</Link></p>
              <p><Link to="/passwordreset/request">Forgot Password</Link></p>
            </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Login);
