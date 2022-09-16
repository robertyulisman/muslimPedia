import {View, Text} from 'react-native';
import React from 'react';
import CompassHeading from 'react-native-compass-heading';

import {Header, TextBody, TextTitle} from '../../components';
import {images} from '../../constant';
import {useSelector} from 'react-redux';
import {BannerAdmob} from '../../components/Admob';

const {Kompas1, Kompas2} = images;

const ArahKiblat = ({route}) => {
  // redux

  const {data} = useSelector(state => state.location);

  // console.log('data', data);

  const {title} = route.params;
  const [compassHeading, setCompassHeading] = React.useState(0);
  const [qiblad, setQiblad] = React.useState(0);

  const calculate = (latitude, longitude) => {
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda),
      );

    setQiblad(qiblad);
  };
  React.useEffect(() => {
    calculate(data.latitude, data.longitude);
  }, []);

  React.useEffect(() => {
    const degree_update_rate = 3;

    // accuracy on android will be hardcoded to 1
    // since the value is not available.
    // For iOS, it is in degrees
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={title} />
      {/* deskripsi */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextTitle title="Latitude" />
          <TextBody title={data.latitude} />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextTitle title="Longitude" />
          <TextBody title={data.longitude} />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TextTitle title="Kiblat" />
          <TextBody title={qiblad} />
        </View>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{rotate: `${360 - compassHeading}deg`}],
            // backgroundColor: 'red',
            width: 300,
            height: 300,
          }}>
          <Kompas1 />
        </View>
        <View
          style={{
            position: 'absolute',
            // zIndex: 999,
            // top: 200,
            transform: [{rotate: `${qiblad}deg`}],
          }}>
          <Kompas2 />
        </View>
      </View>
      <BannerAdmob />
    </View>
  );
};

export default ArahKiblat;
