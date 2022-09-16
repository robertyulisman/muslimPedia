import {GET_SHOLAT} from '../type';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHOLAT:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
