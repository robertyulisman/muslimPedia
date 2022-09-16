import {View, Text, Platform, Alert} from 'react-native';
import React from 'react';
import Router from '@/router/Router';
import 'react-native-gesture-handler';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
// import Router from './src/router/Router';

const App = () => {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      }),
    ).then(result => {
      console.log(`result request permission`, result);
    }),
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('RESULTS.UNAVAILABLE');
              break;
            case RESULTS.DENIED:
              console.log('RESULTS.DENIED');

              break;
            case RESULTS.GRANTED:
              console.log('RESULTS.GRANTED');

              break;
            case RESULTS.BLOCKED:
              console.log('RESULTS.BLOCKED');

              break;
          }
        })
        .catch(error => {
          console.log('error permission', error);
        });
  }, []);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
