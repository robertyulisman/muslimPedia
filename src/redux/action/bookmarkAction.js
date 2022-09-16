import {ADD_BOOKMARK, DELETE_BOOKMARK} from '../type';
import {ToastAndroid} from 'react-native';

// add bookmark
export const addBookmark = data => async dispatch => {
  console.log('data', data);
  ToastAndroid.show(
    `surat ${data.transliteration} ayat ${data.ayat.id} berhasil di bookmark`,
    ToastAndroid.SHORT,
  );

  dispatch({
    type: ADD_BOOKMARK,
    payload: data,
  });
};

// delete bookmark
export const deleteBookmark = data => async dispatch => {
  console.log('data', data);
  ToastAndroid.show(
    `surat ${data.transliteration} ayat ${data.ayat.id} berhasil di hapus`,
    ToastAndroid.SHORT,
  );

  dispatch({
    type: DELETE_BOOKMARK,
    payload: data,
  });
};
