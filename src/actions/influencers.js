/**
 * Contents
 */
import _omitBy from "lodash/omitBy";
import _isNil from "lodash/isNil";
import { callApiWithJWT } from "../utils/api";

export const GET_INFLUENCERS_REQUEST = "GET_INFLUENCERS_REQUEST";
export const GET_INFLUENCERS_SUCCESS = "GET_INFLUENCERS_SUCCESS";
export const GET_INFLUENCERS_FAILURE = "GET_INFLUENCERS_FAILURE";
export const CLEAR_INFLUENCERS = "CLEAR_INFLUENCERS";

export function getInfluencers() {
  const config = {
    url: "/influencer",
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return callApiWithJWT(
    config,
    getInfluencersRequest,
    getInfluencersSuccess,
    getInfluencersFailure
  );
}

export function clearInfluencers() {
  return {
    type: CLEAR_INFLUENCERS
  };
}

function getInfluencersRequest() {
  return {
    type: GET_INFLUENCERS_REQUEST
  };
}

function getInfluencersSuccess(influencers) {
  return {
    type: GET_INFLUENCERS_SUCCESS,
    influencers
  };
}

function getInfluencersFailure(error) {
  return {
    type: GET_INFLUENCERS_FAILURE,
    error: error,
    errorMessage: error.error
  };
}
