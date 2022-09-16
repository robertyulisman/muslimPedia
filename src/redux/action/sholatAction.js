import {GET_SHOLAT} from '../type';
import axios from 'axios';
import moment from 'moment';

// get location user by lat and lang
// export const getSholat = country => async dispatch => {
//   axios
//     .get(
//       `https://muslimsalat.com/${country}/true.json?key=5d9e33331e3944a2c60e95497f7e3fee`,
//     )
//     .then(response => {
//       console.log('sukses get data jadwal sholat', response.data);
//       const keys = Object.keys(response.data.items[0]);
//       const dataSholatArray = keys.map((key, index) => {
//         return {
//           id: index,
//           name: key,
//           jam: response.data.items[0][key],
//         };
//       });
//       console.log('dataSholatArray', dataSholatArray);
//       // dispatch({
//       //   type: GET_SHOLAT,
//       //   payload: dataSholatArray,
//       // });
//     })
//     .catch(err => {
//       console.log('err', err);
//     });
// };

export const getSholat = country => dispatch => {
  const date = moment(new Date()).format('DD');
  const month = moment(new Date()).format('MM');
  const year = moment(new Date()).format('YYYY');

  return new Promise((resolve, reject) => {
    console.log('country xxxxxxxxxxxxxxxxx1', country);
    axios
      .get(`https://api.myquran.com/v1/sholat/kota/cari/${country}`)
      .then(response => {
        console.log('response.data cari sholat', response.data);
        if (response.data.status === false) {
          console.log('country xxxxxxxxxxxxxxxxx2', country);
          return alert(response.data.message);
        }

        axios
          .get(
            `https://api.myquran.com/v1/sholat/jadwal/${response.data.data[0].id}/${year}/${month}/${date}`,
          )
          .then(res => {
            console.log('res.data', res.data);
            const keys2 = Object.keys(res.data.data.jadwal);
            const keys3 = Object.keys(res.data.data.jadwal);
            const dataSholatArray2 = keys2.map((key, index) => {
              return {
                id: index,
                name: key,
                jam: res.data.data.jadwal[key],
              };
            });
            console.log('dataSholatArray2', dataSholatArray2);
            console.log('keys3', keys3);
            dispatch({
              type: GET_SHOLAT,
              payload: dataSholatArray2,
            });
            resolve(res.data);
          })

          .catch(err => {
            console.log('err get sholat', err);
            reject(err);
          });
      })
      .catch(err => {
        console.log('err', err);
        // reject(err);
      });
  });
};
