import {View} from 'react-native';
import React from 'react';
import Icon from '../atom/Icon';
import {icons} from '../../constant';
import {TextBody} from '../atom/Text';
import {useNavigation} from '@react-navigation/native';

const {Alquran, Kompas, Sholat, Doa} = icons;

const MenuDashboard = () => {
  const navigation = useNavigation();

  const handleOnpress = title => {
    switch (title) {
      case "Al-Qur'an":
        navigation.navigate('Alquran', {title});
        break;
      case 'Arah Kiblat':
        navigation.navigate('ArahKiblat', {title});
        break;
      case 'Jadwal Sholat':
        navigation.navigate('JadwalSholat', {title});
        break;
      case "Do'a":
        navigation.navigate('Doa', {title});
        break;

      default:
        break;
    }
  };
  const MenuItem = ({icon, title}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Icon onPress={() => handleOnpress(title)} icon={icon} />
        <TextBody title={title} />
      </View>
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 50,
        paddingBottom: 10,
      }}>
      <MenuItem icon={<Alquran />} title="Al-Qur'an" />
      <MenuItem icon={<Kompas />} title="Arah Kiblat" />
      <MenuItem icon={<Sholat />} title="Jadwal Sholat" />
      <MenuItem icon={<Doa />} title="Do'a" />
    </View>
  );
};

export default MenuDashboard;
