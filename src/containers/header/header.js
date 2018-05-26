import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from 'actions/auth';
import { clearUserInfo } from 'actions/user';

import './header.css';

class Header extends Component {
    static contextTypes = {
        location: PropTypes.object,
        router: PropTypes.object
    }

    static defaultProps = {
        location: {}
    };

    static propTypes = {
        location: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {}
    }

    logout = () => {
        this.props.dispatch(logout())
        this.props.dispatch(clearUserInfo())
        this.context.router.history.push("/");
    }

    render() {
        return (
            <div className="header" role="navigation">
                <Link to={"/"}><p className="header-navLinks">Home</p></Link>
                {
                    this.props.auth.profile &&
                        <div className="header-navLinks-row">
                            <Link to={"/workouts"}><p className="header-navLinks">Workouts</p></Link>
                            <Link to={"/loggedworkouts"}><p className="header-navLinks">Logged Workouts</p></Link>
                        </div>
                }
                <div className="header-authActions">
                    {
                        this.props.auth.profile ?
                            <div className="header-navLinks-row">
                                <Link to={"/profile"}><p className="header-navLinks">My Profile</p></Link>
                                <p className="header-navLinks" onClick={this.logout}>Logout</p>
                            </div> :
                            <div className="header-navLinks-row">
                                <Link to={"/login"}><p className="header-navLinks">Login</p></Link>
                                <Link to={"/signup"}><p className="header-navLinks">Signup</p></Link>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
  }
  
  export default connect(mapStateToProps)(Header);
  