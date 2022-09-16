import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS, icons} from '../constant';

const {Home, HomeActive, Bookmark, BookmarkActive, Setting, SettingActive} =
  icons;
import {
  Dashboard,
  Bookmark as BookmarkPage,
  Setting as SettingPage,
} from '../pages';
import {TabIcon} from '../components';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,

        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={focused ? <HomeActive /> : <Home />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={focused ? <BookmarkActive /> : <Bookmark />}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={focused ? <SettingActive /> : <Setting />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
