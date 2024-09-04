import React, {memo, useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {
  View,
  Text,
  ImageR,
  TouchableIcon,
  useTheme,
  Switch,
} from '../core/dopebase';
import {onCreateTriggerNotification} from '../core/helpers/notifee';
import updateDeviceStorage from '../core/helpers/updateDeviceStorage';

const ItemComponent = ({
  dataIndex,
  itemID,
  dataDeviceKey,
  style,
  imgSource,
  onPress,
  iconSource,
  containerStyle,
  imageStyle,
  tintColor,
  foodName,
  timeE,
  calo,
  onNoti,
  switchActive,
  localized,
}) => {
  const {theme, appearance} = useTheme();
  const colorSet = theme.colors[appearance];
  const [notiEnabled, setNotiEnabled] = useState(onNoti);

  // Memo hóa hàm cập nhật device storage
  const handleupdateDeviceStorage = useCallback(async () => {
    try {
      let data = await updateDeviceStorage.getStoreData(dataDeviceKey);
      if (
        !data ||
        !data[dataIndex] ||
        !data[dataIndex].dishs ||
        !data[dataIndex].dishs[itemID]
      ) {
        console.log('Invalid data structure:', JSON.stringify(data));
        return;
      }
      data[dataIndex].dishs[itemID].onNoti = notiEnabled;
      await updateDeviceStorage.setStoreData(dataDeviceKey, data);
      let data2 = await updateDeviceStorage.getStoreData(dataDeviceKey);
      console.log(`Lưu thành công: ${data2[dataIndex].dishs[itemID].onNoti}`);
    } catch (error) {
      console.error(error);
    }
  }, [dataDeviceKey, dataIndex, itemID, notiEnabled]);

  // Memo hóa hàm tạo thông báo
  const handleCreateNotification = useCallback(async () => {
    const isValid = await onCreateTriggerNotification(foodName, timeE);
    if (!isValid) {
      Alert.alert(
        'Thời gian không hợp lệ!',
        'Vui lòng chọn thời gian trong tương lai.',
      );
    }
  }, [foodName, timeE]);

  // Xử lý cập nhật thông báo khi notiEnabled thay đổi
  useEffect(() => {
    if (!switchActive) {
      return;
    }
    console.log(`notiEnabled is: ${notiEnabled}`);
    handleupdateDeviceStorage();
    if (notiEnabled) {
      handleCreateNotification();
    }
  }, [notiEnabled, handleCreateNotification, handleupdateDeviceStorage]);

  return (
    <View style={[styles.itemContainer, styles.flexRow, style]}>
      <View style={[styles.flexRow, styles.itemLeft]}>
        <ImageR rounded={false} source={imgSource} style={style} />
        <View style={styles.itemTextContainer}>
          <Text
            truncateTextNumber={5}
            h3
            bold
            style={{color: colorSet.primaryButtonTabActive}}>
            {localized(foodName)}
          </Text>
          <Text>
            {timeE} | {calo}
          </Text>
        </View>
      </View>
      {switchActive ? (
        <Switch onToggleSwitch={setNotiEnabled} value={notiEnabled} />
      ) : (
        <TouchableIcon
          onPress={onPress}
          iconSource={iconSource}
          containerStyle={containerStyle}
          imageStyle={imageStyle}
          tintColor={tintColor}
        />
      )}
    </View>
  );
};

export default memo(ItemComponent);

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  itemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    columnGap: Dimensions.get('window').width * 0.025,
  },
  itemTextContainer: {
    justifyContent: 'center',
  },
});
