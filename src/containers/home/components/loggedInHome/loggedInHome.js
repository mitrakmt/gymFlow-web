import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './loggedInHome.css';

const LoggedInHome = props => (
    <div className="loggedInHome">
        <h1>Logged in</h1>
        <div>
            <p><Link to="/create">Create workout</Link></p>
            <p><Link to="/workouts">View Workouts</Link></p>
            <p><Link to="/loggedworkouts">Logged Workouts</Link></p>
        </div>
    </div>
);

LoggedInHome.propTypes = {

};

export default LoggedInHome;
