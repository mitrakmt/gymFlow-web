import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getLoggedWorkout, finalizeCompleteWorkout } from "utils/loggedWorkout";
import { saveLoggedWorkout } from "actions/loggedWorkouts";

import ViewWorkoutTemplate from "./components/view-workout-template/viewWorkoutTemplate";

import "./viewLoggedWorkout.css";

class ViewLoggedWorkout extends Component {
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
      workoutName: "",
      workout: []
    };
  }

  componentWillMount() {
    let path = this.props.location.pathname;
    let workoutId = path.slice(16);
    getLoggedWorkout(workoutId).then(response => {
      this.setState({
        workoutId: response.workout.id,
        workout: response.workout.workout,
        workoutName: response.name
      });
    });
  }

  completeWorkout = () => {
    let copiedWorkout = this.state.workout.slice();

    copiedWorkout.completed = true;
    copiedWorkout.timeCompleted = Date.now();

    this.setState({
      workout: copiedWorkout
    });

    finalizeCompleteWorkout(this.state.workoutId).then(status => {
      if (status.workoutUpdate) {
        this.context.router.history.push("/");
      }
    });
  };

  completeSet = event => {
    // TODO: Also need to update workout in API to save these
    let setIndex = event.target.id;
    let copiedWorkout = this.state.workout.slice();
    if (copiedWorkout[setIndex].completed) {
      copiedWorkout[setIndex].timeCompleted = null;
    } else {
      copiedWorkout[setIndex].timeCompleted = Date.now();
    }
    copiedWorkout[setIndex].completed = !copiedWorkout[setIndex].completed;

    this.setState({
      workout: copiedWorkout
    });
  };

  render() {
    return (
      <div className="viewWorkout">
        <h1>View Logged Workout</h1>
        <div className="viewWorkout-viewWorkoutTemplate">
          <h3 className="viewWorkout-viewWorkoutTemplate-name">
            {this.state.workoutName}
          </h3>
          <ViewWorkoutTemplate
            workoutName={this.state.workoutName}
            workout={this.state.workout}
            completeSet={this.completeSet}
            workoutId={this.state.workoutId}
          />
        </div>
        <div className="viewWorkout-bulkActions">
          <button onClick={this.completeWorkout}>Finish workout</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(ViewLoggedWorkout);
