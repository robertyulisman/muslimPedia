import {View, ToastAndroid, StatusBar, Animated} from 'react-native';
import React, {useRef} from 'react';
import {COLORS, icons, images} from '../../constant';
import {Header, Icon, TextBody, TextHeader, TextTitle} from '../../components';

import LinearGradient from 'react-native-linear-gradient';
import shareFunction from '@/utils/shareFunction';
import {useDispatch, useSelector} from 'react-redux';
import {addBookmark} from '../../redux/action/bookmarkAction';
import {BannerAdmob} from '../../components/Admob';

const {Frame, Share, Play, Book, BookAktiv} = icons;
const {Bismillah} = images;

const AlquranDetail = ({route}) => {
  const dispatch = useDispatch();
  const bookmarkData = useSelector(state => state.bookmark.data);

  const {data} = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [indexAyat, setIndexAyat] = React.useState(0);

  const opacity = scrollY.interpolate({
    inputRange: [100, 200],
    outputRange: [0, 1],
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [-30, 0],
    extrapolate: 'clamp',
  });

  const handleBookmark = item => {
    const {id, transliteration, translation, type, total_verses} = data;

    const dataBookmark = {
      id: new Date().getTime(),
      idSurat: id,
      transliteration,
      translation,
      type,
      total_verses,
      ayat: item,
    };

    const findBookmark = bookmarkData.find(bookmark => {
      const idSurat = bookmark.idSurat;
      const idAyat = bookmark.ayat.id;

      return idSurat === id && idAyat === item.id;
    });

    if (findBookmark)
      return ToastAndroid.show(
        'ayat ini sudah di Bookmark',
        ToastAndroid.SHORT,
      );

    // console.log('findBookmark', findBookmark);
    dispatch(addBookmark(dataBookmark));
    // console.log('item bookmark', item);
    // console.log('item data bookmark', data);
  };

  const isbookmarked = item => {
    return bookmarkData.find(bookmark => bookmark.ayat.id === item.id);
  };

  const handleShare = item => {
    const message = `
    ${item.text}
    

    ${item.translation}.\nQS.${data.transliteration} : ${item.id}

    `;
    shareFunction(message);
  };

  const onViewableItemsChanged = React.useCallback(
    ({viewableItems, changed}) => {
      setIndexAyat(viewableItems[0].key);
      //   console.log('Visible items are', viewableItems);
      console.log('Changed in this iteration, ', changed);
    },
    [],
  );

  return (
    <View style={{backgroundColor: COLORS.white}}>
      <Header
        styleContainer={{
          opacity,
          transform: [
            {
              translateY,
            },
          ],
          position: 'absolute',
        }}
        title={`${data.transliteration} ayat ${+indexAyat + 1}`}
      />
      <StatusBar barStyle="dark-content" />

      <Animated.FlatList
        data={data.verses}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <LinearGradient
            colors={[COLORS.primary.satu, COLORS.primary.dua]}
            style={{
              borderRadius: 20,
              marginHorizontal: 10,
              marginTop: 35,
              alignItems: 'center',
              padding: 10,
            }}>
            <TextHeader
              style={{
                color: COLORS.white,
              }}
              title={data.transliteration}
            />
            <TextTitle
              style={{
                color: COLORS.white,
              }}
              title={data.translation}
            />
            <TextBody
              style={{marginBottom: 20, color: COLORS.white}}
              title={`${data.type} - ${data.total_verses} ayat`}
            />
            <Bismillah />
          </LinearGradient>
        }
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                // flexDirection: 'row',
                paddingHorizontal: 20,
                borderBottomColor: COLORS.lightGray2,
                borderBottomWidth: 1,
                paddingTop: 20,
                paddingBottom: 10,
                alignItems: 'flex-start',
                backgroundColor:
                  index === +indexAyat ? COLORS.secondary.tiga : COLORS.white,
              }}>
              <View
                style={{
                  backgroundColor:
                    index === +indexAyat ? null : COLORS.primary.tiga,
                  width: '100%',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Frame />
                <TextBody
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: index < 9 ? 24 : index > 99 ? 19 : 21,
                    fontSize: 10,
                  }}
                  title={index + 1}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '40%',
                    justifyContent: 'space-between',
                  }}>
                  <Icon onPress={() => handleShare(item)} icon={<Share />} />
                  <Icon
                    onPress={() =>
                      ToastAndroid.show(
                        'Audio belum disupport',
                        ToastAndroid.SHORT,
                      )
                    }
                    icon={<Play />}
                  />
                  <Icon
                    onPress={() => handleBookmark(item)}
                    icon={isbookmarked(item) ? <BookAktiv /> : <Book />}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  marginRight: 20,
                  width: '100%',
                }}>
                <TextTitle
                  style={{
                    textAlign: 'right',
                    fontFamily: 'LPMQ',
                    fontSize: 28,
                    lineHeight: 70,
                  }}
                  title={item.text}
                />

                <TextBody title={`${item.translation}`} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AlquranDetail;
