import {GET_ADS, GET_APPLICATION} from '../type';
import firestore from '@react-native-firebase/firestore';

// get data app from firebase firestore
export const getApplicationFirestore = () => async dispatch => {
  firestore()
    .collection('application')
    .doc('D8tZ7GC6iyqtVWcSFXOG')
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
        dispatch({
          type: GET_APPLICATION,
          payload: documentSnapshot.data(),
        });
      }
    });
};

// get data app from firebase firestore
export const getAdsFirestore = () => async dispatch => {
  firestore()
    .collection('ads')
    .get()

    .then(documentSnapshot => {
      const tempDoc = [];
      documentSnapshot.forEach(doc => {
        tempDoc.push({id: doc.id, ...doc.data()});
      });
      console.log('data ads', tempDoc);
      dispatch({
        type: GET_ADS,
        payload: tempDoc,
      });
    });
};
