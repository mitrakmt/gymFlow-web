/**
 * Contents
 */
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import {
  callApiWithJWT
} from '../utils/api';

export const GET_WORKOUTS_REQUEST = 'GET_WORKOUTS_REQUEST';
export const GET_WORKOUTS_SUCCESS = 'GET_WORKOUTS_SUCCESS';
export const GET_WORKOUTS_FAILURE = 'GET_WORKOUTS_FAILURE';
export const SAVE_WORKOUT_REQUEST = 'SAVE_WORKOUT_REQUEST';
export const SAVE_WORKOUT_SUCCESS = 'SAVE_WORKOUT_SUCCESS';
export const SAVE_WORKOUT_FAILURE = 'SAVE_WORKOUT_FAILURE';

// GET WORKOUTS

export function getWorkouts() {
  const config = {
    url: '/workout',
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return callApiWithJWT(
    config,
    getWorkoutsRequest,
    getWorkoutsSuccess,
    getWorkoutsFailure
  );
}

function getWorkoutsRequest() {
    return {
        type: GET_WORKOUTS_REQUEST
    };
}

function getWorkoutsSuccess(workouts) {
    return {
        type: GET_WORKOUTS_SUCCESS,
        workouts
    };
}

function getWorkoutsFailure(error) {
    return {
        type: GET_WORKOUTS_FAILURE,
        error: error,
        errorMessage: error.error
    };
}

// SAVE WORKOUTS

export function saveWorkout(name, workout) {
    const config = {
      url: '/workout',
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
          name,
          workout
      }
    };
  
    return callApiWithJWT(
      config,
      saveWorkoutRequest,
      saveWorkoutSuccess,
      saveWorkoutFailure
    );
  }
  
  function saveWorkoutRequest() {
      return {
          type: SAVE_WORKOUT_REQUEST
      };
  }
  
  function saveWorkoutSuccess(workouts) {
      return {
          type: SAVE_WORKOUT_SUCCESS
      };
  }

  function saveWorkoutFailure(error) {
      return {
          type: SAVE_WORKOUT_FAILURE,
          error: error,
          errorMessage: error.error
      };
  }
  