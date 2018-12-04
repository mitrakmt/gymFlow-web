/**
 * Contents
 */
import _omitBy from "lodash/omitBy";
import _isNil from "lodash/isNil";
import { callApiWithJWT } from "../utils/api";

export const GET_ACTIVITY_REQUEST = "GET_ACTIVITY_REQUEST";
export const GET_ACTIVITY_SUCCESS = "GET_ACTIVITY_SUCCESS";
export const GET_ACTIVITY_FAILURE = "GET_ACTIVITY_FAILURE";
export const CLEAR_ACTIVITY = "CLEAR_ACTIVITY";

export function getActivity() {
  const config = {
    url: `/activity`,
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return callApiWithJWT(
    config,
    getActivityRequest,
    getActivitySuccess,
    getActivityFailure
  );
}

export function clearActivity() {
  return {
    type: CLEAR_ACTIVITY
  };
}

function getActivityRequest() {
  return {
    type: GET_ACTIVITY_REQUEST
  };
}

function getActivitySuccess(activity) {
  return {
    type: GET_ACTIVITY_SUCCESS,
    activity
  };
}

function getActivityFailure(error) {
  return {
    type: GET_ACTIVITY_FAILURE,
    error: error,
    errorMessage: error.error
  };
}
