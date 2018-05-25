import React from 'react';
import PropTypes from 'prop-types';

import './exerciseTemplate.css';

const ExerciseTemplate = ({ exercise, setId, exerciseId, deleteExercise, updateExercise }) => {
    const deleteThisExercise = () => {
        deleteExercise(setId, exerciseId)
    }

    const updateThisExercise = (event) => {
        exercise[event.target.id] = event.target.value;
        updateExercise(setId, exerciseId, exercise)
    }

    return (
        <div className="exerciseTemplate">
            <button onClick={deleteThisExercise} className="exerciseTemplate-delete">X</button>
            <input className="exerciseTemplate-heading" onChange={updateThisExercise} id="name" />
        </div>
    )
};

ExerciseTemplate.propTypes = {

};

export default ExerciseTemplate;
