import {ADD_BOOKMARK, DELETE_BOOKMARK} from '../type';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_BOOKMARK:
      const dataFilter = state.data.filter(
        item => item.id !== action.payload.id,
      );
      return {
        ...state,
        data: dataFilter,
      };

    default:
      return state;
  }
}
