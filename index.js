/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Alarm from 'react-native-alarm-manager';
import messaging from '@react-native-firebase/messaging';

const Main = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  Alarm.stop(
    success => console.log(success), // success message
    fail => console.log(fail), // fail message
  );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Main;

AppRegistry.registerComponent(appName, () => Main);
