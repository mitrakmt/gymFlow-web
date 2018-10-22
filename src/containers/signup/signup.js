import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getUserInfo } from "actions/user";
import { registerUser } from "../../actions/auth";
import { checkUsername } from "utils/user";

import _ from "lodash";

import "./signup.css";

class Signup extends Component {
  static defaultProps = {
    user: null
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      emailError: "",
      emailTouched: false,
      password: "",
      username: "",
      signingUp: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("access_token")) {
      this.context.router.history.push("/");
    }
  }

  /**
   * Checks for successful or unsuccessful login and either redirects
   * them or shows failed login error.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.profile) {
      try {
        const redirect = this.props.location.state.from.pathname || "/";
        this.context.router.history.push(redirect);
      } catch (err) {
        this.context.router.history.push("/");
      }
    }
  }

  /**
   * Updates the local state of Login Component.
   */
  inputChanged = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  isValidEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(this.state.email);
  };

  validateEmail = () => {
    if (this.state.emailTouched && !this.isValidEmail()) {
      this.setState({
        emailError: "Should be a valid email (valid@email.com)"
      });
    } else {
      this.setState({
        emailError: ""
      });
    }
  };

  updateEmail = event => {
    this.setState(
      {
        email: event.target.value
      },
      this.validateEmail
    );
  };

  checkUsernameTakenDebounced = _.debounce(() => {
    checkUsername(this.state.username).then(status => {
      this.setState({
        usernameTaken: status.taken
      });
    });
  }, 500);

  updateUsername = event => {
    let newUsername = event.target.value;
    this.setState({
      username: newUsername
    });

    this.checkUsernameTakenDebounced();
  };

  emailTouched = () =>
    this.setState({
      emailTouched: true
    });

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSignup();
    }
  };

  /**
   * Handles a login attempt by dispatching the login action.
   */
  handleSignup = () => {
    this.toggleSigningUp();

    this.props
      .dispatch(
        registerUser(this.state.email, this.state.password, this.state.username)
      )
      .then(response => {
        if (response.type === "LOGIN_SUCCESS") {
          this.props.dispatch(getUserInfo());
        }
        this.toggleSigningUp();
      });
  };

  toggleSigningUp = () =>
    this.setState({
      signingUp: !this.state.signingUp
    });

  render() {
    return (
      <div className="signup" autoComplete="off">
        <h1 className="signup-heading">Welcome!</h1>
        <input
          id="email"
          className="signup-input"
          placeholder="Email"
          value={this.state.email}
          onChange={this.updateEmail}
          onKeyPress={this.handleKeyPress}
          onBlur={this.emailTouched}
          autoComplete="email"
          type="email"
        />
        <input
          id="username"
          className="signup-input"
          placeholder="Username"
          autoComplete="username"
          value={this.state.username}
          onChange={this.updateUsername}
          onKeyPress={this.handleKeyPress}
          onBlur={this.emailTouched}
          type="username"
        />
        <input
          id="password"
          className="signup-input"
          autoComplete="password"
          placeholder="Password"
          onKeyPress={this.handleKeyPress}
          onChange={this.inputChanged}
          type="password"
        />
        <button
          disabled={this.state.loggingIn}
          className="signup-submit"
          label="Signup"
          onTouchTap={this.handleSignup}
        >
          Signup
        </button>
        <div className="signup-textLinks">
          <p className="link">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Signup);
