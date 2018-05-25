import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLoggedWorkouts } from 'actions/loggedWorkouts';

import './loggedWorkouts.css';


class LoggedWorkouts extends Component {
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

        this.state = {};
    }

    componentWillMount() {
        this.props.dispatch(getLoggedWorkouts())
    }

  render() {
    return (
        <div className="loggedWorkouts">
            {
                this.props.loggedWorkouts.data.workouts.map(workout => (
                    <Link to={`loggedWorkouts/${workout.id}`}>
                        <h3 key={workout.id}>{workout.name}</h3>
                    </Link>
                ))
            }
            {
                this.props.loggedWorkouts.data.workouts.length === 0 && <h3>No logged workouts</h3>
            }
        </div>
    );
  }
}

function mapStateToProps({ auth, loggedWorkouts }) {
    return { auth, loggedWorkouts };
}

export default connect(mapStateToProps)(LoggedWorkouts);
