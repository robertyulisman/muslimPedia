import {View, Text} from 'react-native';
import React from 'react';
import {Header} from '../../components';
import {COLORS} from '../../constant';

const Hubungi = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title="Hubungi" />
    </View>
  );
};

export default Hubungi;
