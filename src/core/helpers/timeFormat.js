import moment from 'moment';
import Storage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

const date = new Date();
date.getTime() / 1000;

const getLocale = async () => {
  try {
    const locale = await Storage.getItem('locale');
    if (locale !== null) {
      return locale.split('-')[0];
    }
  } catch (e) {
    console.log(e);
    return 'vi';
  }
};

export const timeFormat = timeStamp => {
  if (moment(timeStamp).isValid()) {
    if (moment().diff(moment.unix(timeStamp), 'days') === 0) {
      return moment.unix(timeStamp, ['hh:mm']).format('h:mm a'); // 3:20 pm
    } else if (moment().diff(moment.unix(timeStamp), 'days') < 7) {
      return moment.unix(timeStamp).format('ddd'); // Tue, Wed etc
    } else {
      return moment.unix(timeStamp).format('D MMM'); // 20 Jan
    }
  };
  return ' ';
};

export const getUnixTimeStamp = () => {
  return moment().unix();
};

export const getCurrentDateFormatted = new Promise((resolve, reject) => {
  const locale = getLocale();
  if (locale) {
    resolve(locale);
  } else {
    reject('vi');
  }
}).then((locale) => {
  moment.locale(locale); // Đặt locale là tiếng Việt
  const currentDate = moment();
  return currentDate.format('dddd - DD/MM'); // Định dạng ngày theo yêu cầu
}).catch((error) => {
  console.error(error);
  return 'vi';
});