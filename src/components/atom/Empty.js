import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constant';
import {TextBody, TextTitle} from './Text';

const Empty = ({deskripsi}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextTitle title="Belum ada Data" />
      <TextBody
        style={{
          color: COLORS.gray,
          fontSize: 16,
          width: '75%',
          textAlign: 'center',
        }}
        title={deskripsi}
      />
    </View>
  );
};

export default Empty;
