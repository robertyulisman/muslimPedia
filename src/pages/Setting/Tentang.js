import {View, Text} from 'react-native';
import React from 'react';
import {Header} from '../../components';
import {COLORS} from '../../constant';

const Tentang = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title="Tentang" />
    </View>
  );
};

export default Tentang;
