import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header, TextBody, TextTitle} from '../../components';
import doaData from '../../utils/dataJSON/doa.json';
import {COLORS, icons} from '../../constant';
import {BannerAdmob} from '../../components/Admob';

const {Frame} = icons;

const Doa = ({route, navigation}) => {
  const {title} = route.params;
  const [dataDoa, setDataDoa] = React.useState([]);
  const [dataDoaFilter, setDataDoaFilter] = React.useState([]);

  React.useEffect(() => {
    setDataDoa(doaData);
    setDataDoaFilter(doaData);
  }, []);

  const handleOnPress = item => {
    navigation.navigate('DoaDetail', {data: item});
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        doa
        setData={setDataDoa}
        dataFilter={dataDoaFilter}
        search
        title={title}
      />
      <BannerAdmob relative />
      <FlatList
        data={dataDoa}
        keyExtractor={item => `${item.id_doa}`}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={{
                marginHorizontal: 20,
                paddingBottom: 10,
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.lightGray2,
                flexDirection: 'row',
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
                <TextTitle style={{fontSize: 18}} title={item.nama} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Doa;
