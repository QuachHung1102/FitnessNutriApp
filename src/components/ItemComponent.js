import React, { memo, useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { View, Text, ImageR, TouchableIcon, useTheme, Switch } from '../core/dopebase';
import { onCreateTriggerNotification } from '../core/helpers/notifee';
import updateDeviceStorage from '../core/helpers/updateDeviceStorage';

const ItemComponent = (props) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const {
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
    localized
  } = props;

  const [notiEnabled, setNotiEnabled] = useState(onNoti);

  useEffect(() => {
    console.log(`notiEnabled is: ${notiEnabled}`);
    if (notiEnabled) {
      handleCreateNotification();
      handleupdateDeviceStorage();
    } else {
      handleupdateDeviceStorage();
    }
  }, [notiEnabled])

  const handleCreateNotification = async () => {
    const isValid = await onCreateTriggerNotification(foodName, timeE);
    if (isValid) {
      // Alert.alert(`Thông báo đã được tạo thành công vào: `, isValid);
    } else {
      Alert.alert('Thời gian không hợp lệ!', 'Vui lòng chọn thời gian trong tương lai.');
    }
  }

  const handleupdateDeviceStorage = async () => {
    try {
      let mealScreenData = await updateDeviceStorage.getStoreData(dataDeviceKey);
      mealScreenData[dataIndex].dishs[itemID].onNoti = notiEnabled;
      console.log("trạng thái data trước khi lưu", mealScreenData[dataIndex].dishs[itemID].onNoti);
      await updateDeviceStorage.setStoreData(dataDeviceKey, mealScreenData);
      console.log(`Lưu thành công`);
      let mealScreenData2 = await updateDeviceStorage.getStoreData(dataDeviceKey);
      console.log(mealScreenData2[dataIndex].dishs[itemID].onNoti);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.itemContainer, styles.flexRow]}>
      <View style={[styles.flexRow, styles.itemLeft]}>
        <ImageR
          style={style}
          rounded={false}
          source={imgSource}
        />
        <View style={styles.itemTextContainer}>
          <Text truncateTextNumber={5} h3 bold style={{ color: colorSet.primaryButtonTabActive }}>{localized(foodName)}</Text>
          <Text>{timeE} | {calo}</Text>
        </View>
      </View>
      {switchActive
        ? (
          <Switch onToggleSwitch={setNotiEnabled} value={onNoti} />
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
    flexDirection: "row",
  },
  itemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: {
    columnGap: Dimensions.get('window').width * 0.025,
  },
  itemTextContainer: {
    justifyContent: "center",
  }
});

// { onPress,
// containerStyle,
// iconSource,
// imageStyle,
// title,
// titleStyle,
// renderTitle,
// onLongPress,
// onPressOut,
// onPressIn,
// iconRef,
// onLayout,
// disabled = false,
// tintColor,}