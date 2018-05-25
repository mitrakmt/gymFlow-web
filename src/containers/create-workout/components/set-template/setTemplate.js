import React from 'react';
import PropTypes from 'prop-types';

import ExerciseTemplate from '../exercise-template/exerciseTemplate';

import './setTemplate.css';

const SetTemplate = ({ set, addExercise, workoutName, deleteExercise, updateExercise, deleteSet }) => {
    const addNewExercise = () => {
        addExercise(set.id)
    }

    const deleteThisSet = (event) => {
        deleteSet(event.target.id)
    }

    return (
        <div className="setTemplate">
            <div>
                <p className="setTemplate-deleteSet" onClick={deleteThisSet} id={set.id}>Delete</p>
                {
                    set.exercises.map(exercise => (
                        <ExerciseTemplate
                            exercise={exercise}
                            setId={set.id}
                            exerciseId={exercise.id}
                            deleteExercise={deleteExercise}
                            updateExercise={updateExercise}
                            key={`setTemplate-${workoutName}-${exercise.id}`}
                        />
                    ))
                }
            </div>
            <button onClick={addNewExercise}>Add exercise</button>
        </div>
    )
};

SetTemplate.propTypes = {

};

export default SetTemplate;
