import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkouts } from 'actions/workouts';

import './workouts.css';


class Workouts extends Component {
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
      this.props.dispatch(getWorkouts())
  }

  render() {
    return (
      <div className="workouts">
        <h1>Workouts</h1>
        {
            this.props.workouts.data.workouts.map(workout => (
                <Link to={`/workouts/${workout.id}`} key={`workouts-${workout.id}`}><h1>{workout.name}</h1></Link>
            ))
        }
        {
            this.props.workouts.data.workouts.length === 0 && <h3>No workouts to show</h3>
        }
      </div>
    );
  }
}

function mapStateToProps({ auth, workouts }) {
  return { auth, workouts };
}

export default connect(mapStateToProps)(Workouts);
