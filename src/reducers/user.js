import {
    CLEAR_USER,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILURE
  } from '../actions/user';
  
  export default function user(state = { response: {} }, action) {
    switch (action.type) {
      case POST_USER_REQUEST:
        return Object.assign({}, state);
      case POST_USER_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          response: action
        });
      case POST_USER_FAILURE:
        return {
          ...state,
          response: action
        };
      case CLEAR_USER:
        return {
          response: Object.assign(state, { user: {}, type: 'Clear user info' })
        };
      default:
        return state;
    }
  }
  