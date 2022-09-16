import {View, Text, StatusBar, Alert, Image, Dimensions} from 'react-native';
import React from 'react';
import {images} from '@/constant';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/atom/Button';
import {COLORS} from '../../constant';
import {useSelector, useDispatch} from 'react-redux';
import {getSholat} from '../../redux/action/sholatAction';
import publicIP from 'react-native-public-ip';
import {getCountry} from '../../redux/action/locationAction';

const {WelcomeScreenImage} = images;
const {width, height} = Dimensions.get('screen');

const WelcomePage = ({navigation}) => {
  const dispatch = useDispatch();
  const {country} = useSelector(state => state.location);

  const [text, setText] = React.useState('Ngaji Yuk !');
  const [loading, setLoading] = React.useState(false);
  console.log('country =========>', country);

  React.useEffect(() => {
    if (Object.keys(country).length > 0) {
      dispatch(getSholat(country.city))
        .then(() => {
          setText('Harap tunggu...');
          setLoading(false);
          navigation.navigate('Dashboard');
        })
        .catch(err => {
          alert(
            'gagal mendapatkan Jadwal Sholat, pastikan anda terkoneksi dengan Internet',
          );
          console.log('err', err);
        });
    }
  }, [country]);

  const handleStarted = () => {
    setText('Harap Menunggu...');
    setLoading(true);

    if (Object.keys(country).length > 0) {
      setTimeout(() => {
        setLoading(false);
        setText('Get Started');
        navigation.navigate('Dashboard');
      }, 1000);
    } else {
      publicIP()
        .then(ip => {
          setText('Berhasil mendapatkan ip');
          console.log(ip);

          setTimeout(() => {
            setText('Mendapatkan Lokasi...');
          }, 1000);

          // setTimeout(() => {
          dispatch(getCountry(ip))
            .then(() => {
              setText('Berhasil mendapatkan lokasi');
              console.log('country==============================>', country);
            })
            .catch(err => console.log('err', err));
          // }, 5000);

          // setTimeout(() => {
          //   dispatch(getSholat(country.city));
          // }, 10000);

          // setTimeout(() => {
          //   setText('Berhasil mendapatkan lokasi');
          // }, 5000);

          // setTimeout(() => {
          //   setText('Get Started');
          //   setLoading(false);
          //   navigation.navigate('Dashboard');
          // }, 10000);
        })
        .catch(error => {
          console.log(error);
          Alert.alert('ERROR', error);
          setLoading(false);
          setText('Get Started');
        });
    }
  };
  return (
    <View style={{width, height: '100%', backgroundColor: COLORS.primary.dark}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        resizeMode="contain"
        style={{width: undefined, height: undefined, flex: 1}}
        source={WelcomeScreenImage}
      />
      <Button
        disabled={loading}
        title={text}
        styleContainer={{position: 'absolute', left: 20, right: 20, bottom: 20}}
        onPress={handleStarted}
      />
    </View>
  );
};

export default WelcomePage;
