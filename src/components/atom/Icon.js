import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Icon = ({onPress, icon}) => {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};

export default Icon;
