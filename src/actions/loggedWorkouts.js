/**
 * Contents
 */
import _omitBy from "lodash/omitBy";
import _isNil from "lodash/isNil";
import { callApiWithJWT } from "../utils/api";

export const GET_LOGGED_WORKOUTS_REQUEST = "GET_LOGGED_WORKOUTS_REQUEST";
export const GET_LOGGED_WORKOUTS_SUCCESS = "GET_LOGGED_WWORKOUTS_SUCCESS";
export const GET_LOGGED_WORKOUTS_FAILURE = "GET_LOGGED_WWORKOUTS_FAILURE";

export function getLoggedWorkouts() {
  const config = {
    url: "/loggedWorkout",
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return callApiWithJWT(
    config,
    getLoggedWorkoutsRequest,
    getLoggedWorkoutsSuccess,
    getLoggedWorkoutsFailure
  );
}

function getLoggedWorkoutsRequest() {
  return {
    type: GET_LOGGED_WORKOUTS_REQUEST
  };
}

function getLoggedWorkoutsSuccess(workouts) {
  return {
    type: GET_LOGGED_WORKOUTS_SUCCESS,
    workouts
  };
}

function getLoggedWorkoutsFailure(error) {
  return {
    type: GET_LOGGED_WORKOUTS_FAILURE,
    error: error,
    errorMessage: error.error
  };
}
