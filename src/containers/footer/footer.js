import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './footer.css';

class Footer extends Component {
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

        this.state = {

        }
      }

    render() {
        return (
            <div className="footer">
                <div className="footer-navLinks">
                    <Link to={"/"}><p className="footer-navLinks-text">Home</p></Link>
                    <Link to={"/contact"}><p className="footer-navLinks-text">Contact</p></Link>
                    <Link to={"/jobs"}><p className="footer-navLinks-text">Jobs</p></Link>
                </div>
            </div>
        );
    }
}

export default Footer;
