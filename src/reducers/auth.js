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
    profile: null,
    loggingIn: false,
    loggingOut: false,
    loginError: null
  };
  
  function initializeState() {
    const userProfile = {
      profile: loadUserProfile()
    };
    return Object.assign({}, initialState, userProfile);
  }
  
  export default function auth(state = initializeState(), action = {}) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return Object.assign({}, state, { 
          loggingIn: true,
          loginError: null
        });
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
          profile: action.profile,
          loggingIn: false,
          loginError: null
        });
      case LOGIN_FAILURE:
        return {
          ...state,
          profile: null,
          loggingIn: false,
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
          profile: null,
          loginError: null
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          loggingOut: false,
          profile: null,
          user: {},
          logoutError: action.error
        };
      case REGISTER_REQUEST:
        return Object.assign({}, state);
      case REGISTER_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          profile: action.profile
        });
      case REGISTER_FAILURE:
        return {
          ...state,
          profile: null
        };
      case 'CLEAR_USER_SUCCESS':
        return {
          ...state,
          profile: null
        };
      case 'SAVE_USER_SUCCESS':
        return {
          ...state
        };
      default:
        return state;
    }
  }
  