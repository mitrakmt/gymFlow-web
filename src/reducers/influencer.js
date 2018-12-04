import {
  CLEAR_INFLUENCER,
  GET_INFLUENCER_REQUEST,
  GET_INFLUENCER_SUCCESS,
  GET_INFLUENCER_FAILURE
} from "../actions/influencer";

export default function influencer(state = { data: {} }, action) {
  switch (action.type) {
    case GET_INFLUENCER_REQUEST:
      return Object.assign({}, state);
    case GET_INFLUENCER_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        data: action.user
      });
    case GET_INFLUENCER_FAILURE:
      return {
        ...state,
        data: action
      };
    case CLEAR_INFLUENCER:
      return {
        ...state,
        data: {}
      };
    default:
      return state;
  }
}
