import {View, ScrollView} from 'react-native';
import React from 'react';

import {Header, TextBody, TextTitle} from '@/components';
import {COLORS, icons} from '@/constant';
import shareFunction from '../../utils/shareFunction';

const DoaDetail = ({route}) => {
  const {data} = route.params;

  const handleShare = () => {
    const message = `
    ${data.nama}

    ${data.lafal}

    ${data.transliterasi}

    ${data.arti}

    ${data.riwayat}

    download Muslim app via Google Play
    `;

    shareFunction(message);
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header share title="Detail" onPressShare={handleShare} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',

          paddingHorizontal: 10,
        }}>
        <TextTitle style={{marginTop: 20}} title={data.nama} />
        <TextTitle
          style={{
            fontFamily: 'LPMQ',
            fontSize: 28,
            lineHeight: 70,
            marginTop: 50,
          }}
          title={data.lafal}
        />
        <TextBody title={data.transliterasi} />
        <View
          style={{
            marginTop: 40,
            padding: 20,
            backgroundColor: COLORS.secondary.tiga,
            borderRadius: 10,
            marginBottom: 20,
          }}>
          <TextBody title={data.arti} />
          <TextBody title={data.keterangan} />
          <TextBody style={{marginTop: 20}} title={`${data.riwayat}`} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DoaDetail;
