import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React from 'react';
import {icons, COLORS, FONTS} from '../../constant';
import {CardItem} from '@/components';
import {TextBody, TextTitle} from '../../components';

const {
  Header,
  CardBlue,
  CardOrange,
  CardRed,
  CardViolet,
  Arab,
  Inggris,
  Mandarin,
  Bars,
} = icons;
const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    id: '1',
    key: 'englishAdvancedStudent',
    title: 'Bahasa Inggris',
    subtitle: 'Beginner Student',
    icon: <Inggris />,
    background: <CardOrange />,
  },
  {
    id: '2',
    key: 'englishIntermediateStudent',
    title: 'Bahasa Inggris',
    subtitle: 'Beginner Student',
    icon: <Inggris />,
    background: <CardOrange />,
  },
];

const Dashboard = ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const handleOnpress = (value, title) => {
    console.log('value', value);
    navigation.navigate('Silabus', {item: value, title});
  };

  const translateY = scrollY.interpolate({
    inputRange: [50, 200],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });
  const translateYTitle = scrollY.interpolate({
    inputRange: [50, 200],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });
  const translateXTitle = scrollY.interpolate({
    inputRange: [50, 200],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const scaleTitle = scrollY.interpolate({
    inputRange: [50, 200],
    outputRange: [1, 1.1],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [50, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderHeader = () => {
    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          // position: 'absolute',
          // left: 0,
          // right: 0,
          // bottom: 0,
        }}>
        <Animated.View
          style={{
            transform: [
              {
                translateY,
              },
            ],
          }}>
          <Header />
        </Animated.View>

        {/* content header */}
        <View
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          {/* Icon Bars */}
          <TouchableOpacity
            style={{
              marginTop: 50,
              marginRight: 20,
              width: 30,
              height: 30,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Bars />
          </TouchableOpacity>

          {/* User */}
          <View
            style={{marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
            <Animated.Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                opacity,
                transform: [{translateY}],
              }}
              source={{
                uri: 'https://admin.proo.co.id/asset/images/164525463615730.-efitri-siregar,-s.pd.png',
              }}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Animated.Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  transform: [
                    {
                      translateY: translateYTitle,
                    },
                    {translateX: translateXTitle},
                  ],
                }}>
                Efitri Siregar, S.Pd
              </Animated.Text>
              <Animated.Text
                style={{
                  color: COLORS.white,
                  opacity,
                  ...FONTS.body3,
                  transform: [{translateY}],
                }}>
                Tiban Lama RT 006 RW 007 No. 33
              </Animated.Text>
              {/* <TextTitle
                  style={{color: COLORS.white, opacity}}
                  title="Efitri Siregar, S.Pd"
                /> */}
              {/* <TextBody
                  style={{color: COLORS.white, width: '75%'}}
                  title="Tiban Lama RT 006 RW 007 No. 33"
                /> */}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />
      {renderHeader()}

      <Animated.ScrollView
        // StickyHeaderComponent={<View>{}</View>}
        // stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}>
        <View style={{alignItems: 'center'}}>
          <CardItem
            icon={<Arab />}
            background={<CardBlue />}
            title="Bahasa Arab"
            subtitle="pelajaran bahasa arab"
            onPress={() => handleOnpress('arabicBeginnerKids', 'Bahasa Arab')}
          />
          <CardItem
            icon={<Inggris />}
            background={<CardOrange />}
            title="Bahasa Inggris"
            subtitle="Beginner Student"
            onPress={() =>
              handleOnpress('englishBeginnerStudent', 'Bahasa Inggris')
            }
          />
          <CardItem
            icon={<Inggris />}
            background={<CardOrange />}
            title="Bahasa Inggris"
            subtitle="Advanced Student"
            onPress={() =>
              handleOnpress('englishAdvancedStudent', 'Bahasa Inggris')
            }
          />
          <CardItem
            icon={<Inggris />}
            background={<CardOrange />}
            title="Bahasa Inggris"
            subtitle="Intermediate Student"
            onPress={() =>
              handleOnpress('englishIntermediateStudent', 'Bahasa Inggris')
            }
          />
          <CardItem
            icon={<Mandarin />}
            background={<CardRed />}
            title="Bahasa Mandarin"
            subtitle="pelajaran bahasa mandarin"
            onPress={() => handleOnpress('mandarin', 'Bahasa Mandarin')}
          />
          <CardItem
            icon={<Arab />}
            background={<CardViolet />}
            title="Bahasa Arab"
            subtitle="pelajaran bahasa arab"
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Dashboard;
