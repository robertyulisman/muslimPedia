import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header, TextTitle} from '../../components';
import {COLORS} from '../../constant';
import {useSelector} from 'react-redux';

const Setting = ({navigation}) => {
  const {app} = useSelector(state => state.firestore);
  console.log('app', app);
  const setting = [
    {
      nama: 'Tentang',
      route: 'Tentang',
    },
    {
      nama: 'Privacy Policy',
      route: 'Privacy',
    },
    {
      nama: 'Hubungi Kami',
      route: 'Hubungi',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title="Pengaturan" />
      {setting.map(item => (
        <TouchableOpacity
          key={`${item.nama}`}
          onPress={() =>
            navigation.navigate(item.route, {data: app, name: item.nama})
          }
          style={{
            marginHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightGray2,
          }}>
          <TextTitle title={item.nama} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Setting;
