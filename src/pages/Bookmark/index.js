import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Empty, Header, Icon, TextBody, TextTitle} from '../../components';
import {COLORS, icons} from '../../constant';
import {deleteBookmark} from '../../redux/action/bookmarkAction';

const {BookmarkActive, Times} = icons;

const Bookmark = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.bookmark);
  // console.log('data bookmark', data);

  const handleDeleteBookmark = item => {
    console.log('item bookmerk deleted', item);
    dispatch(deleteBookmark(item));
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title="Bookmark" />
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BookmarkDetail', {data: item})
                }
                style={{
                  marginHorizontal: 20,
                  paddingBottom: 10,
                  paddingTop: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.lightGray2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <BookmarkActive />
                </View>
                <View style={{marginLeft: 20, flex: 1}}>
                  <TextTitle title={item.transliteration} />
                  <TextBody title={`surat ke ${item.ayat.id}`} />
                </View>
                <View>
                  <Icon
                    onPress={() => handleDeleteBookmark(item)}
                    icon={<Times />}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Empty deskripsi={'kamu belum memiliki data yang di Bookmark'} />
      )}
    </View>
  );
};

export default Bookmark;
