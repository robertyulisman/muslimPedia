import {TouchableOpacity} from 'react-native';
import React from 'react';
import {icons} from '@/constant';
import {useNavigation} from '@react-navigation/native';
const {ArrowLeft} = icons;

const BackButton = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => navigation.goBack()}
      style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ArrowLeft />
    </TouchableOpacity>
  );
};

export default BackButton;
