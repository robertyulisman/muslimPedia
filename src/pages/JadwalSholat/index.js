import {View, Text} from 'react-native';
import React from 'react';
import {Header, Icon, TextBody, TextTitle} from '../../components';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, icons} from '../../constant';
import moment from 'moment';
import {sisaJam, tanggalSholat} from '../../utils/sholatFunction';
import {BannerAdmob} from '../../components/Admob';

const {Check, Uncheck, Subuh, Syuruq, Zuhur, Ashar, Maghrib, Isya} = icons;

const JadwalSholat = ({route}) => {
  const {title} = route.params;
  const {data} = useSelector(state => state.sholat);
  const [showShadow, setShowShadow] = React.useState(false);

  console.log('data', data);

  const handleScroll = event => {
    const eventScroll = event.nativeEvent.contentOffset.y;

    if (eventScroll > 20) {
      setShowShadow(true);
    } else {
      setShowShadow(false);
    }
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <Header title={title} />
      <BannerAdmob relative />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          backgroundColor: COLORS.white,
          paddingTop: 20,
          paddingBottom: 10,
          paddingHorizontal: 20,
          shadowColor: showShadow ? '#000' : '#fff',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <TextBody title="Tanggal :" />
        <TextTitle style={{marginLeft: 20}} title={data[0].jam} />
      </View>
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({item, index}) => {
          // const sekarang = moment(new Date()).format('YYYY-MM-DD');

          // const jam = item.jam.split(' ');
          // const jamsplitted = jam[0].split(':');

          // const date = `${sekarang} ${
          //   jamsplitted[0].length === 1 ? `0${jamsplitted[0]}` : jamsplitted[0]
          // }:${jamsplitted[1]}`;
          // const stringFormat = moment(date).format('YYYY-MM-DDTHH:mm:ss');

          // const tanggalSholat = new Date(stringFormat).getTime();

          return (
            <View>
              {index > 0 && index < 9 && (
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingBottom: 10,
                    marginTop: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightGray2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 25,
                      backgroundColor: COLORS.lightGray,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      icon={
                        item.name === 'subuh' ? (
                          <Subuh />
                        ) : item.name === 'dzuhur' ? (
                          <Zuhur />
                        ) : item.name === 'ashar' ? (
                          <Ashar />
                        ) : item.name === 'maghrib' ? (
                          <Maghrib />
                        ) : item.name === 'isya' ? (
                          <Isya />
                        ) : (
                          <Syuruq />
                        )
                      }
                    />
                  </View>

                  <View style={{flex: 1, marginLeft: 20}}>
                    <TextTitle title={item.name} />
                    <TextBody title={`${item.jam}`} />
                    {tanggalSholat() < item.jam && (
                      <TextBody title={`${sisaJam(item)}`} />
                    )}
                  </View>
                  <Icon
                    icon={tanggalSholat() < item.jam ? <Uncheck /> : <Check />}
                  />

                  {/* <TextBody
                    title={new Date(
                      `${data[0].jam}, ${item.jam}`,
                    ).toDateString()}
                  /> */}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default JadwalSholat;
