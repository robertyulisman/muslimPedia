import {GET_LOCATION, GET_COUNTRY_NAME, GET_COUNTRY} from '../type';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

// get location user by lat and lang
export const getLocationUser = () => async dispatch => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      console.log(location);

      dispatch({
        type: GET_LOCATION,
        payload: location,
      });
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });
};
export const getCountry = ip => async dispatch => {
  console.log('ip =============> get country', ip);

  return new Promise((resolve, reject) => {
    axios
      .get(`https://ipapi.co/${ip}/json`)
      .then(response => {
        console.log('sukses get country by ip', response.data);
        dispatch({
          type: GET_COUNTRY,
          payload: response.data,
        });
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
        console.log('err get country', err);
      });
  });
};

export const getCountryName = (latitude, longitude) => async dispatch => {
  Geocoder.init('AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k'); // use a valid API key

  const country = await Geocoder.from({
    latitude: latitude,
    longitude: longitude,
  });
  const last =
    country.results[0].address_components[
      country.results[0].address_components.length - 2
    ];
  console.log('country', country);
  console.log('last', last.long_name);
  // setCountryName(last.long_name);
  dispatch({
    type: GET_COUNTRY_NAME,
    payload: last.long_name,
  });
};
