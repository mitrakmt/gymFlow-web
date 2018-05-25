import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLoggedWorkout } from 'utils/loggedWorkout';
import { saveLoggedWorkout } from 'actions/loggedWorkouts';

import ViewWorkoutTemplate from './components/view-workout-template/viewWorkoutTemplate';

import './viewLoggedWorkout.css';


class ViewLoggedWorkout extends Component {
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
      workoutName: '',
      workout: []
    };
  }

  componentWillMount() {
    let path = this.props.location.pathname;
    let workoutId = path.slice(16)
    getLoggedWorkout(workoutId)
      .then(response => {
            this.setState({
                workout: response.workout.workout,
                workoutName: response.name
            })
      })
  }

  render() {
    return (
      <div className="viewWorkout">
        <h1>View Logged Workout</h1>
        <div className="viewWorkout-viewWorkoutTemplate">
          <h3 className="viewWorkout-viewWorkoutTemplate-name">{this.state.workoutName}</h3>
          <ViewWorkoutTemplate
            workoutName={this.state.workoutName}
            workout={this.state.workout}
          />
        </div>
        <div className="viewWorkout-bulkActions">
          {/* <button onClick={this.startWorkout}>Begin workout</button> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ViewLoggedWorkout);
