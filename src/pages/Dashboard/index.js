import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, icons} from '../../constant';
import {Icon, MenuDashboard, TextBody, TextTitle} from '../../components';
import {useSelector, useDispatch} from 'react-redux';

import {getSholat} from '../../redux/action/sholatAction';
import {sisaJam, tanggalSholat} from '../../utils/sholatFunction';
import Alarm from 'react-native-alarm-manager';
import {getLocationUser} from '../../redux/action/locationAction';
import {BannerAdmob} from '../../components/Admob';

const {Bell} = icons;
const Dashboard = () => {
  const dispatch = useDispatch();
  const {country} = useSelector(state => state.location);
  const {data} = useSelector(state => state.sholat);

  const [dataSholatNow, setDataSholatNow] = React.useState([]);

  //  ads
  const {ads} = useSelector(state => state.firestore);
  const admob = ads.find(item => item.name === 'Admob');

  // console.log('dataSholatNow', dataSholatNow);
  // console.log('data sholat dashboard', data);
  // console.log('country', country);

  const dataSholat = () => {
    const sholat = data.filter(
      (item, index) => index > 0 && index < 9 && tanggalSholat() < item.jam,
    );
    setDataSholatNow(sholat);
    console.log('sholat', sholat);
  };

  React.useEffect(() => {
    if (Object.keys(country).length > 0) {
      dispatch(getSholat(country?.city.replace(/\s/g, '').toLowerCase()));
      dispatch(getLocationUser());
    }
  }, [country]);

  React.useEffect(() => {
    if (data.length > 0) {
      dataSholat();
      registerAlarm();
    }
  }, [data]);

  const createAlarm = data => {
    const alarm = {
      alarm_time: `${data?.jam}:00`, // HH:mm:00
      alarm_title: `${data?.name} telah masuk`,
      alarm_text: 'text',
      alarm_sound: data?.name === 'subuh' ? 'azansubuh' : 'azan', // sound.mp3
      alarm_icon: 'ic_launcher', // icon.png
      alarm_sound_loop: false,
      alarm_vibration: true,
      alarm_noti_removable: true,
      alarm_activate: true,
      alarm_noti_removable: true,
    };
    Alarm.schedule(
      alarm,
      success => console.log(success), // success message
      fail => console.log(fail), // fail message
    );
  };

  const modifyAlarm = (data, alarm) => {
    const alarmModify = {
      alarm_id: alarm.alarm_id,
      alarm_time: `${data?.jam}:00`, // HH:mm:00
      alarm_title: `telah masuk waktu ${data?.name}`,
      alarm_text: `saatnya Sholat ${data?.name}, selamat melakasanakan ibadah Sholat ${data.name}`,
      alarm_sound: data?.name === 'subuh' ? 'azansubuh' : 'azan',
      alarm_icon: 'ic_launcher', // icon.png
      alarm_sound_loop: false,
      alarm_vibration: true,
      alarm_noti_removable: true,
      alarm_activate: true,
      alarm_noti_removable: true,
    };
    Alarm.modify(
      alarmModify,
      success => console.log(success), // success message
      fail => console.log(fail), // fail message
    );
  };

  const registerAlarm = () => {
    Alarm.searchAll(
      success => {
        console.log('success', success);
        if (success.length === 0) {
          createAlarm(data[2]);
          createAlarm(data[5]);
          createAlarm(data[6]);
          createAlarm(data[7]);
          createAlarm(data[8]);
        } else {
          modifyAlarm(data[2], success[0]);
          modifyAlarm(data[5], success[1]);
          modifyAlarm(data[6], success[2]);
          modifyAlarm(data[7], success[3]);
          modifyAlarm(data[8], success[4]);
        }
      }, // alarm list
      fail => console.log(fail), // fail message
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <LinearGradient
        colors={[COLORS.primary.satu, COLORS.primary.dua]}
        style={{
          width: '100%',
          height: 250,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        {/* Header */}
        <View
          style={{marginTop: 50, paddingHorizontal: 20, flexDirection: 'row'}}>
          <TextTitle
            style={{color: COLORS.white, flex: 1}}
            title="Assalamu'alaikum"
          />

          <Icon icon={<Bell />} />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            marginHorizontal: 20,
            padding: 10,
            marginTop: 20,
            shadowColor: COLORS.primary.satu,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 13,
          }}>
          {/* Jadwl Sholat dan Lokasi */}
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            {dataSholatNow.length > 0 && (
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TextBody title={dataSholatNow[0]?.name} />
                <TextTitle
                  style={{marginTop: 10}}
                  title={dataSholatNow[0]?.jam}
                />
              </View>
            )}

            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <TextBody title="Lokasi Anda" />
              <TextTitle style={{marginTop: 10}} title={country.city} />
            </View>
          </View>
          {dataSholatNow.length > 0 && (
            <TextBody
              style={{margin: 10}}
              title={`${sisaJam(dataSholatNow[0])}`}
            />
          )}

          {/* Menu */}
          <MenuDashboard />
        </View>
      </LinearGradient>
      <BannerAdmob />
    </View>
  );
};

export default Dashboard;
