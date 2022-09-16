import React from 'react';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  Alquran,
  AlquranDetail,
  ArahKiblat,
  Dashboard,
  Doa,
  DoaDetail,
  JadwalSholat,
  SplashScreen,
  WelcomePage,
  BookmarkDetail,
  SettingDetail,
} from '../pages';
import Tabs from './tabs';
import Tentang from '../pages/Setting/Tentang';
import Privacy from '../pages/Setting/Privacy';
import Hubungi from '../pages/Setting/Hubungi';

const Stack = createStackNavigator();

const Router = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Dashboard" component={Tabs} />
        <Stack.Screen name="Alquran" component={Alquran} />
        <Stack.Screen name="AlquranDetail" component={AlquranDetail} />
        <Stack.Screen name="ArahKiblat" component={ArahKiblat} />
        <Stack.Screen name="JadwalSholat" component={JadwalSholat} />
        <Stack.Screen name="Doa" component={Doa} />
        <Stack.Screen name="DoaDetail" component={DoaDetail} />
        <Stack.Screen name="BookmarkDetail" component={BookmarkDetail} />
        <Stack.Screen name="SettingDetail" component={SettingDetail} />
        <Stack.Screen name="Tentang" component={Tentang} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Hubungi" component={Hubungi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
