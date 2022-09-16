import {GET_APPLICATION, GET_ADS} from '../type';

const initialState = {
  app: {},
  ads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATION:
      return {
        ...state,
        app: action.payload,
      };
    case GET_ADS:
      return {
        ...state,
        ads: action.payload,
      };

    default:
      return state;
  }
}
