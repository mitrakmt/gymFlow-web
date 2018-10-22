import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { saveWorkout } from "actions/workouts";

import WorkoutTemplate from "./components/workout-template/workoutTemplate";

import "./createWorkout.css";

class CreateWorkout extends Component {
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
    // TODO: generate random name
    this.setState({
      workoutName: "Best workout that ever was"
    });
  }

  addSet = () => {
    let copiedWorkout = this.state.workout.slice();
    copiedWorkout.push({
      id: this.state.workout.length,
      exercises: [
        {
          id: 0,
          name: "name",
          reps: 12,
          sets: 3
        }
      ]
    });
    this.setState({
      workout: copiedWorkout
    });
  };

  addExercise = id => {
    let copiedWorkout = this.state.workout.slice();
    copiedWorkout[id].exercises.push({
      id: copiedWorkout[id].exercises.length,
      name: "name",
      reps: 12,
      sets: 3
    });
    this.setState({
      workout: copiedWorkout
    });
  };

  updateExercise = (setId, exerciseId, exercise) => {
    let copiedWorkout = this.state.workout.slice();

    copiedWorkout[setId].exercises[exerciseId] = exercise;

    this.setState({
      workout: copiedWorkout
    });
  };

  deleteSet = setId => {
    let copiedWorkout = this.state.workout.slice();
    copiedWorkout.splice(setId, 1);

    for (let i = 0; i < copiedWorkout.length; i++) {
      copiedWorkout[i].id = i;
    }

    this.setState({
      workout: copiedWorkout
    });
  };

  deleteExercise = (setId, exerciseId) => {
    let copiedWorkout = this.state.workout.slice();

    copiedWorkout[setId].exercises.splice(exerciseId, 1);

    for (let i = 0; i < copiedWorkout[setId].exercises.length; i++) {
      copiedWorkout[setId].exercises.id = i;
    }

    this.setState({
      workout: copiedWorkout
    });
  };

  saveWorkout = () => {
    if (this.state.workoutName === "") {
      // TODO: error to fill out name
      return;
    } else if (this.state.workout.length === 0) {
      // TODO: error to not have empty workout
      return;
    }
    this.props
      .dispatch(saveWorkout(this.state.workoutName, this.state.workout))
      .then(status => {
        if (status.type === "SAVE_WORKOUT_SUCCESS") {
          this.context.router.history.push("/workouts");
        }
      });
  };

  updateWorkoutName = event => {
    this.setState({
      workoutName: event.target.value
    });
  };

  render() {
    return (
      <div className="createWorkout">
        <h1>Create workout</h1>
        <div className="createWorkout-workoutTemplate">
          <input
            className="createWorkout-workoutTemplate-name"
            value={this.state.workoutName}
            onChange={this.updateWorkoutName}
          />
          <WorkoutTemplate
            addSet={this.addSet}
            workoutName={this.state.workoutName}
            addExercise={this.addExercise}
            workout={this.state.workout}
            deleteSet={this.deleteSet}
            deleteExercise={this.deleteExercise}
            updateExercise={this.updateExercise}
          />
        </div>
        <div className="createWorkout-bulkActions">
          <button onClick={this.saveWorkout}>Save workout</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(CreateWorkout);
