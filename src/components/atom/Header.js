import {
  View,
  Text,
  Animated,
  Easing,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import React from 'react';
import {COLORS, icons} from '../../constant';
import {TextTitle} from './Text';
import Icon from './Icon';
import {useNavigation} from '@react-navigation/native';

const {ArrowLeft, Search, Times, ShareWhite} = icons;
const {width} = Dimensions.get('screen');

const Header = ({
  title,
  search,
  onPressBack,
  styleContainer,

  dataFilter,
  setData,
  doa,
  share,
  onPressShare,
}) => {
  const navigation = useNavigation();

  const SearchValue = React.useState(new Animated.Value(1))[0];
  const TimesValue = React.useState(new Animated.Value(0))[0];

  const [textSearch, setTextSearch] = React.useState('');
  // console.log('data', data);
  const handleChange = value => {
    setTextSearch(value);
    const newDataFilter = dataFilter.filter(item =>
      doa
        ? item.nama.toUpperCase().indexOf(value.toUpperCase()) > -1
        : item.transliteration.toUpperCase().indexOf(value.toUpperCase()) > -1,
    );
    setData(newDataFilter);
  };

  const onPressSearch = () => {
    console.log('oke');
    Animated.timing(SearchValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start(() => {
      Animated.timing(TimesValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      }).start();
    });
  };

  const onPressTimes = () => {
    console.log('times');
    setTextSearch('');
    Keyboard.dismiss();
    setData(dataFilter);

    Animated.timing(SearchValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start(() => {
      Animated.timing(TimesValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      }).start();
    });
  };

  const translateXTimes = TimesValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
    extrapolate: 'clamp',
  });

  const translateXSearch = TimesValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
    extrapolate: 'clamp',
  });

  const rotateTimes = TimesValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        backgroundColor: COLORS.primary.satu,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        zIndex: 999,
        ...styleContainer,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: COLORS.white,
          top: 40,
          left: 50,
          right: 10,
          // width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          zIndex: 990,
          opacity: TimesValue,
          borderRadius: 10,
        }}>
        <TextInput
          style={{flex: 1, fontSize: 16, fontFamily: 'Nunito-Regular'}}
          placeholder="cari ayat"
          value={textSearch}
          onChangeText={value => handleChange(value)}
        />
        <Animated.View
          style={{
            marginRight: 5,
            transform: [
              {
                scale: TimesValue,
              },
              {
                translateX: translateXTimes,
              },
              {
                rotate: rotateTimes,
              },
            ],
          }}>
          <Icon onPress={onPressTimes} icon={<Times />} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={{opacity: SearchValue, zIndex: 999}}>
        <Icon
          onPress={onPressBack ? onPressBack : () => navigation.goBack()}
          icon={<ArrowLeft />}
        />
      </Animated.View>
      <TextTitle
        style={{flex: 1, marginLeft: 20, color: COLORS.white}}
        title={title}
      />
      {search && (
        <>
          <Animated.View
            style={{
              zIndex: 995,
              transform: [
                {
                  translateX: translateXSearch,
                },
              ],
            }}>
            <Icon onPress={onPressSearch} icon={<Search />} />
          </Animated.View>
        </>
      )}
      {share && (
        <View style={{zIndex: 999}}>
          <Icon onPress={onPressShare} icon={<ShareWhite />} />
        </View>
      )}
    </Animated.View>
  );
};

export default Header;
