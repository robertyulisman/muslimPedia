import moment from 'moment';

export const tanggalSholat = () => {
  //   const jam = item.jam.slice(0, 2);
  //   const menit = item.jam.slice(3, 5);

  //   console.log('jam', jam);
  //   console.log('menit', menit);

  const JamSekarang = moment(new Date()).format('HH');
  const menitSekarang = moment(new Date()).format('mm a');

  return `${JamSekarang}:${menitSekarang}`;
};

export const sisaJam = item => {
  console.log('item', item);
  const jam = item.jam.slice(0, 2);
  const menit = item.jam.slice(3, 5);

  //   console.log('jam', jam);
  //   console.log('menit', menit);

  const JamSekarang = moment(new Date()).format('HH');
  const menitSekarang = moment(new Date()).format('mm');

  const sisaJam = +jam - +JamSekarang;
  const sisaMenit = +menit - +menitSekarang;

  return item > JamSekarang
    ? `${Math.round(sisaJam)} jam ${sisaMenit} menit lagi menjelang ${
        item.name
      }`
    : `${item.name} sudah lewat `;
};
