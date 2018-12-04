/**
 * Contents
 */
import _omitBy from "lodash/omitBy";
import _isNil from "lodash/isNil";
import { callApiWithJWT } from "../utils/api";

export const GET_INFLUENCER_REQUEST = "GET_INFLUENCER_REQUEST";
export const GET_INFLUENCER_SUCCESS = "GET_INFLUENCER_SUCCESS";
export const GET_INFLUENCER_FAILURE = "GET_INFLUENCER_FAILURE";
export const CLEAR_INFLUENCER = "CLEAR_INFLUENCER";

export function getInfluencer(influencerId) {
  const config = {
    url: `/influencer/${influencerId}`,
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return callApiWithJWT(
    config,
    getInfluencerRequest,
    getInfluencerSuccess,
    getInfluencerFailure
  );
}

export function clearInfluencer() {
  return {
    type: CLEAR_INFLUENCER
  };
}

function getInfluencerRequest() {
  return {
    type: GET_INFLUENCER_REQUEST
  };
}

function getInfluencerSuccess(influencer) {
  return {
    type: GET_INFLUENCER_SUCCESS,
    influencer
  };
}

function getInfluencerFailure(error) {
  return {
    type: GET_INFLUENCER_FAILURE,
    error: error,
    errorMessage: error.error
  };
}
