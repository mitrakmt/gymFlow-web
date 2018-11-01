import {
  CLEAR_INFLUENCERS,
  GET_INFLUENCERS_REQUEST,
  GET_INFLUENCERS_SUCCESS,
  GET_INFLUENCERS_FAILURE
} from "../actions/influencer";

export default function influencer(state = { data: {} }, action) {
  switch (action.type) {
    case GET_INFLUENCERS_REQUEST:
      return Object.assign({}, state);
    case GET_INFLUENCERS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        data: action.user
      });
    case GET_INFLUENCERS_FAILURE:
      return {
        ...state,
        data: action
      };
    case CLEAR_INFLUENCERS:
      return {
        ...state,
        data: {}
      };
    default:
      return state;
  }
}
