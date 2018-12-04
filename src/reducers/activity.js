import {
  CLEAR_ACTIVITY,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE
} from "../actions/activity";

export default function activity(state = { data: {} }, action) {
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return Object.assign({}, state);
    case GET_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        data: action.activity
      });
    case GET_ACTIVITY_FAILURE:
      return {
        ...state,
        data: action
      };
    case CLEAR_ACTIVITY:
      return {
        ...state,
        data: {}
      };
    default:
      return state;
  }
}
