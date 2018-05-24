import {
    GET_LOGGED_WORKOUTS_REQUEST,
    GET_LOGGED_WORKOUTS_SUCCESS,
    GET_LOGGED_WORKOUTS_FAILURE
  } from '../actions/workouts';
  
  export default function loggedWorkouts(state = { data: {} }, action) {
    switch (action.type) {
      case GET_LOGGED_WORKOUTS_REQUEST:
        return Object.assign({}, state);
      case GET_LOGGED_WORKOUTS_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          data: action.workouts
        });
      case GET_LOGGED_WORKOUTS_FAILURE:
        return {
          ...state,
          data: action
        };
      default:
        return state;
    }
  }
  