import {View, Text, StatusBar, Image, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {images, COLORS} from '@/constant';
import {TextBody, TextHeader} from '@/components';

import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {
  getAdsFirestore,
  getApplicationFirestore,
} from '../../redux/action/firestoreAction';

const {SplashScreenImage} = images;
const {width, height} = Dimensions.get('screen');

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getApplicationFirestore());
    dispatch(getAdsFirestore());

    setTimeout(() => {
      navigation.replace('WelcomePage');
    }, 7000);
  }, []);

  // const usersCollection = firestore()
  //   .collection('application')
  //   .doc('D8tZ7GC6iyqtVWcSFXOG')
  //   .get()
  //   .then(documentSnapshot => {
  //     console.log('User exists: ', documentSnapshot.exists);

  //     if (documentSnapshot.exists) {
  //       console.log('User data: ', documentSnapshot.data());
  //     }
  //   });

  // console.log('usersCollection', usersCollection);

  return (
    <View style={{width, height: '100%', backgroundColor: COLORS.primary.dark}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        resizeMode="contain"
        style={{width: undefined, height: undefined, flex: 1}}
        source={SplashScreenImage}
      />
    </View>
  );
};

export default SplashScreen;
