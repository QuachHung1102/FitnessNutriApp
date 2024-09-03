import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text, ImageR, TouchableIcon, useTheme, Switch } from '../core/dopebase';
import { onCreateTriggerNotification } from '../core/helpers/notifee';

const ItemComponent = (props) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const {
    itemID,
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
    switchActive,
    localized
  } = props;

  const [notiEnabled, setNotiEnabled] = useState(false);

  useEffect(() => {
    if (notiEnabled) {
      handleCreateNotification();
    }
  }, [notiEnabled])

  const handleCreateNotification = useCallback(async () => {
    const isValid = await onCreateTriggerNotification(foodName, timeE);
    if (isValid) {
      Alert.alert(`Thông báo đã được tạo thành công vào: `, isValid);
    } else {
      Alert.alert('Thời gian không hợp lệ!', 'Vui lòng chọn thời gian trong tương lai.');
    }
  }, [foodName, timeE]);

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
          <Switch onToggleSwitch={setNotiEnabled} />
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