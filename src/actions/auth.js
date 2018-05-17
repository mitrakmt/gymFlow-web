/**
 * Contents
 * 1. Login
 * 2. Registration
 */

import {
    ACCESS_TOKEN,
    callApi,
    callApiWithJWT,
    decodeUserProfile,
    loadRefreshToken,
    REFRESH_TOKEN,
    removeTokens,
    setAccessToken,
    setRefreshToken,
    setUserId,
    USER_ID
  } from '../utils/api';
  
  export const LOGIN_REQUEST = 'LOGIN_REQUEST';
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGIN_FAILURE = 'LOGIN_FAILURE';
  export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
  export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
  export const REGISTER_REQUEST = 'REGISTER_REQUEST';
  export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  export const REGISTER_FAILURE = 'REGISTER_FAILURE';
  
  // Login
  function loginRequest(user) {
    return {
      type: LOGIN_REQUEST,
      user
    };
  }
  
  function loginSuccess(payload) {
    if (payload.data) {
      const accessToken = payload.data[ACCESS_TOKEN];
      const refreshToken = payload.data[REFRESH_TOKEN];
      const userId = payload.data[USER_ID];
      const profile = decodeUserProfile(accessToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(userId);
      return {
        type: LOGIN_SUCCESS,
        profile
      };
    }
    return {
      type: LOGIN_FAILURE
    };
  }
  
  function loginFailure(error) {
    if (error) {
      removeTokens();
      return {
        type: LOGIN_FAILURE,
        error
      };
    }
    return {
      type: LOGIN_FAILURE,
      error
    };
  }
  
  /**
   * Calls the login API.
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   * @returns {object} The status object returned by the server.
   */
  export function login(email, password) {
    const config = {
      url: `${process.env.REACT_APP_API_DOMAIN}/cp/auth/login`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password
      }
    };
  
    return callApi(
      config,
      loginRequest(email),
      loginSuccess,
      loginFailure
    );
  }
  
  /**
   * Reauthenticates the user based on the refresh token in local storage.
   * @param {string} refreshToken
   */
  export function refreshLogin(refresh_token = loadRefreshToken()) {
    const config = {
      url: `${process.env.REACT_APP_API_DOMAIN}/cp/auth/verify`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        refresh_token
      }
    };
  
    return callApi(
      config,
      loginRequest(refresh_token),
      loginSuccess,
      loginFailure
    );
  }
  
  function logoutRequest(user) {
    return {
      type: LOGOUT_REQUEST,
      user
    };
  }
  
  function logoutSuccess(payload) {
    removeTokens();
    return {
      type: LOGOUT_SUCCESS,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      userId: payload.user_id
    };
  }
  
  function logoutFailure(error) {
    return {
      type: LOGOUT_FAILURE,
      error
    };
  }
  
  /**
   * Removes the locally stored refresh and access tokens and calls the logout API.
   */
  export function logout() {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN).toString();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const config = {
      url: `${process.env.REACT_APP_API_DOMAIN}/cp/auth/logout`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        refresh_token
      }
    };
  
    return callApiWithJWT(
      config,
      logoutRequest,
      logoutSuccess,
      logoutFailure
    );
  }
  
  // Registration
  function registerFailure(response) {
    return {
      response,
      type: REGISTER_FAILURE
    };
  }
  
  function registerRequest(response) {
    return {
      type: REGISTER_REQUEST,
      response
    };
  }
  
  function registerSuccess(response) {
    const accessToken = response.data[ACCESS_TOKEN];
    const refreshToken = response.data[REFRESH_TOKEN];
    const userId = response.data[USER_ID];
    const profile = decodeUserProfile(accessToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserId(userId);
    return {
      profile,
      response,
      type: REGISTER_SUCCESS
    };
  }
  
  /**
   * Registers a new user with the provided information.
   * @param {object} formData Should contain the email, password, first name, and last name.
   */
  export function registerUser(formData) {
    const { email, password, first_name, last_name } = formData;
    const config = {
      url: '/cp/member',
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password,
        first_name,
        last_name
      }
    };
  
    return callApi(
      config,
      registerRequest,
      registerSuccess,
      registerFailure
    );
  }
  
  function clearUserSuccess() {
    return {
      type: 'CLEAR_USER_SUCCESS'
    };
  }
  
  function saveUserSuccess() {
    return {
      type: 'SAVE_USER_SUCCESS'
    };
  }
  
  /**
   * [Beta] Haven't used this too much, may have bugs.
   * Saves the user to the redux store.
   */
  export function saveUserToStore() {
    return dispatch => dispatch(saveUserSuccess());
  }
  
  /**
   * [Beta] Haven't used this too much, may have bugs.
   * Clears the user from the redux store.
   */
  export function clearUserInStore() {
    return dispatch => dispatch(clearUserSuccess());
  }
  