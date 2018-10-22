import React from "react";
import PropTypes from "prop-types";

import "./viewExerciseTemplate.css";

const ViewExerciseTemplate = ({ exercise, setId, exerciseId }) => {
  return (
    <div className="viewExerciseTemplate">
      <h3 className="viewExerciseTemplate-heading">{exercise.name}</h3>
      <h3 className="viewExerciseTemplate-heading">Sets: {exercise.sets}</h3>
      <h3 className="viewExerciseTemplate-heading">Reps: {exercise.reps}</h3>
    </div>
  );
};

ViewExerciseTemplate.propTypes = {};

export default ViewExerciseTemplate;
