import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {COLORS, icons} from '../../constant';
import {Header, TextBody, TextTitle} from '../../components';
import quranData from '../../utils/dataJSON/quran_id.json';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BannerAdmob} from '../../components/Admob';

const {Frame} = icons;

const Alquran = ({route, navigation}) => {
  const {title} = route.params;
  // console.log('quranData', quranData);

  const [dataQuran, setDataQuran] = React.useState([]);
  const [dataQuranFilter, setDataQuranFilter] = React.useState([]);

  React.useEffect(() => {
    setDataQuran(quranData);
    setDataQuranFilter(quranData);
  }, []);

  const handleOnpressSurat = item => {
    console.log('item', item);
    navigation.navigate('AlquranDetail', {data: item});
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <Header
        setData={setDataQuran}
        dataFilter={dataQuranFilter}
        title={title}
        search
      />
      <BannerAdmob relative />

      {dataQuran.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 200,
          }}>
          <TextTitle title="NO DATA" />
          <TextBody
            style={{width: '70%', textAlign: 'center'}}
            title="upps, kayaknya data yang kamu cari tidak ditemukan"
          />
        </View>
      ) : (
        <FlatList
          data={dataQuran}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={25}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleOnpressSurat(item)}
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  borderBottomColor: COLORS.lightGray2,
                  borderBottomWidth: 1,
                  marginTop: 20,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <View>
                  <Frame />
                  <TextBody
                    style={{
                      position: 'absolute',
                      top: 7,
                      left: index < 9 ? 15 : index > 99 ? 9 : 12,
                      fontSize: 10,
                    }}
                    title={index + 1}
                  />
                </View>

                <View style={{flex: 1, marginLeft: 20}}>
                  <TextTitle title={item.transliteration} />
                  <TextBody
                    title={`${item.type} - ${item.total_verses} ayat`}
                  />
                </View>
                <TextTitle
                  style={{color: COLORS.primary.satu, fontFamily: 'LPMQ'}}
                  title={`${item.name}`}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default Alquran;
