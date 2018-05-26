import React from 'react';
import PropTypes from 'prop-types';

import ViewSetTemplate from '../view-set-template/viewSetTemplate';

import './viewWorkoutTemplate.css';

const ViewWorkoutTemplate = ({ workout, workoutName, completeSet, workoutId }) => {
    return (
        <div className="viewWorkoutTemplate">
            {
                workout.map(set => (
                    <div className="viewWorkoutTemplate-set" key={`viewWorkoutTemplate-set-${workoutName}-${set.id}`}>
                        <ViewSetTemplate
                            set={set}
                            workoutName={workoutName}
                            completeSet={completeSet}
                        />
                    </div>
                ))
            }
        </div>
    )
};

ViewWorkoutTemplate.propTypes = {

};

export default ViewWorkoutTemplate;
