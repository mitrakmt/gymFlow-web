import React from 'react';
import PropTypes from 'prop-types';

import SetTemplate from '../set-template/setTemplate';

import './workoutTemplate.css';

const WorkoutTemplate = ({ workout, workoutName, addSet, addExercise, deleteSet, deleteExercise, updateExercise }) => {
    const deleteThisSet = (event) => {
        deleteSet(event.target.id)
    }
    
    return (
        <div className="workoutTemplate">
            {
                workout.map(set => (
                    <div className="workoutTemplate-set" key={`workoutTemplate-set-${workoutName}-${set.id}`}>
                        <SetTemplate
                            set={set}
                            addExercise={addExercise}
                            workoutName={workoutName}
                            deleteExercise={deleteExercise}
                            updateExercise={updateExercise}
                            deleteSet={deleteSet}
                        />
                    </div>
                ))
            }
            <button onClick={addSet}>Add Set</button>
        </div>
    )
};

WorkoutTemplate.propTypes = {

};

export default WorkoutTemplate;
