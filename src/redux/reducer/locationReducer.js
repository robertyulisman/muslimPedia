import {GET_LOCATION, GET_COUNTRY, GET_COUNTRY_NAME} from '../type';

const initialState = {
  data: {},
  country: {},
  countryName: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        data: action.payload,
      };
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countryName: action.payload,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    default:
      return state;
  }
}
