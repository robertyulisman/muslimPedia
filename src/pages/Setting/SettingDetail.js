import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constant';
import {Header, TextBody} from '../../components';

const SettingDetail = ({route}) => {
  const {name, data} = route.params;
  console.log('name', name);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={name} />
      {name === 'Tentang' ? (
        <View style={{padding: 10}}>
          {data.tentang.map(item => (
            <TextBody style={{padding: 10}} title={item} />
          ))}
        </View>
      ) : name === 'Privacy Policy' ? (
        <View style={{padding: 10}}>
          <TextBody title={data.privacyPolicy} />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default SettingDetail;
