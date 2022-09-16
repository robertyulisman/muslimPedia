import Share from 'react-native-share';
import dataAplikasi from './dataJSON/dataAplikasi';

const shareFunction = message => {
  const options = {
    title: 'Share via',
    message,
    url: dataAplikasi.url.playstore,
  };
  Share.open(options)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};

export default shareFunction;
