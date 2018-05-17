import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
  } from '../actions/auth';
  
  import { loadUserProfile } from '../utils/api';
  
  const initialState = {
    user: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null
  };
  
  function initializeState() {
    const userProfile = loadUserProfile();
    return Object.assign({}, initialState, userProfile);
  }
  
  export default function auth(state = initializeState(), action = {}) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return Object.assign({}, state, { loggingIn: true });
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
          loggingIn: false,
          user: action,
          loginError: undefined
        });
      case LOGIN_FAILURE:
        return {
          ...state,
          loggingIn: false,
          user: null,
          loginError: action.error
        };
      case LOGOUT_REQUEST:
        return {
          ...state,
          loggingOut: true
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          loggingOut: false,
          user: null,
          loginError: null
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          loggingOut: false,
          user: null,
          logoutError: action.error
        };
      case REGISTER_REQUEST:
        return Object.assign({}, state);
      case REGISTER_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          user: action
        });
      case REGISTER_FAILURE:
        return {
          ...state,
          user: action
        };
      case 'CLEAR_USER_SUCCESS':
        return {
          ...state,
          user: {}
        };
      case 'SAVE_USER_SUCCESS':
        return {
          ...state
        };
      default:
        return state;
    }
  }
  