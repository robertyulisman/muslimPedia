import {View, Text} from 'react-native';
import React from 'react';
import {BannerAd, TestIds} from '@react-native-admob/admob';
import {useSelector} from 'react-redux';

const BannerAdmob = ({styleContainer, relative}) => {
  //  ads
  const {ads} = useSelector(state => state.firestore);
  const admob = ads.find(item => item.name === 'Admob');

  console.log('admob', admob);

  return admob?.status === true ? (
    <View
      style={{
        position: relative ? 'relative' : 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...styleContainer,
      }}>
      <BannerAd size="ADAPTIVE_BANNER" unitId={admob?.banner} />
    </View>
  ) : null;
};

export default BannerAdmob;
