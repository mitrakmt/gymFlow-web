import {
    GET_WORKOUTS_REQUEST,
    GET_WORKOUTS_SUCCESS,
    GET_WORKOUTS_FAILURE,
    SAVE_WORKOUT_REQUEST,
    SAVE_WORKOUT_SUCCESS,
    SAVE_WORKOUT_FAILURE
  } from '../actions/workouts';
  
export default function workouts(state = { data: { workouts: [] }, saveSuccess: false, saveFailure: false }, action) {
    switch (action.type) {
        // GET WORKOUTS
        case GET_WORKOUTS_REQUEST:
            return Object.assign({}, state);
        case GET_WORKOUTS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                data: action.workouts
            });
        case GET_WORKOUTS_FAILURE:
            return {
                ...state,
                data: action
            };
        // SAVE WORKOUT
        case SAVE_WORKOUT_REQUEST:
            return Object.assign({}, state);
        case SAVE_WORKOUT_SUCCESS:
            return {
                ...state,
                saveSuccess: true
            };
        case SAVE_WORKOUT_FAILURE:
            return {
                ...state,
                saveFailure: true
            };
        default:
            return state;
        }
}
  