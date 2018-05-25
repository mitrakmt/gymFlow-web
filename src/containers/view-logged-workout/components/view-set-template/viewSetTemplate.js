import React from 'react';
import PropTypes from 'prop-types';

import ViewExerciseTemplate from '../view-exercise-template/viewExerciseTemplate';

import './viewSetTemplate.css';

const ViewSetTemplate = ({ set, workoutName }) => {
    return (
        <div className="viewSetTemplate">
            {
                set.exercises.map(exercise => (
                    <ViewExerciseTemplate
                        exercise={exercise}
                        setId={set.id}
                        exerciseId={exercise.id}
                        key={`viewSetTemplate-${workoutName}-${exercise.id}`}
                    />
                ))
            }
        </div>
    )
};

ViewSetTemplate.propTypes = {

};

export default ViewSetTemplate;
