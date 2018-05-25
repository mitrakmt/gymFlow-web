import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getWorkout } from 'utils/workout';
import { saveWorkout } from 'actions/workouts';

import ViewWorkoutTemplate from './components/view-workout-template/viewWorkoutTemplate';

import './viewWorkout.css';


class ViewWorkout extends Component {
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
    let workoutId = path.slice(10)
    getWorkout(workoutId)
      .then(response => {
        this.setState({
          workout: response.workout,
          workoutName: response.name
        })
      })
  }

  startWorkout = () => {
    let path = this.props.location.pathname;
    let workoutId = path.slice(10)

    // TODO: begin workout
  }

  render() {
    return (
      <div className="viewWorkout">
        <h1>View Workout</h1>
        <div className="viewWorkout-viewWorkoutTemplate">
          <h3 className="viewWorkout-viewWorkoutTemplate-name">{this.state.workoutName}</h3>
          <ViewWorkoutTemplate
            workoutName={this.state.workoutName}
            workout={this.state.workout}
          />
        </div>
        <div className="viewWorkout-bulkActions">
          <button onClick={this.startWorkout}>Begin workout</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ViewWorkout);
