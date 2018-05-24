import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';

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

        this.state = {

        }
      }

    render() {
        return (
            <div className="header">
                
            </div>
        );
    }
}

export default Header;
