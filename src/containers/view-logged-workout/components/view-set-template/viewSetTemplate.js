import React from "react";
import PropTypes from "prop-types";

import ViewExerciseTemplate from "../view-exercise-template/viewExerciseTemplate";

import "./viewSetTemplate.css";

const ViewSetTemplate = ({ set, workoutName, completeSet }) => {
  return (
    <div className="viewSetTemplate">
      <input
        type="checkbox"
        checked={set.completed}
        className="viewSetTemplate-completedCheckbox"
        onClick={completeSet}
        id={set.id}
      />
      <div>
        {set.exercises.map(exercise => (
          <ViewExerciseTemplate
            exercise={exercise}
            setId={set.id}
            exerciseId={exercise.id}
            key={`viewSetTemplate-${workoutName}-${exercise.id}`}
          />
        ))}
      </div>
    </div>
  );
};

ViewSetTemplate.propTypes = {};

export default ViewSetTemplate;
