import React, { memo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, Text, ImageR, TouchableIcon, useTheme, Switch } from '../core/dopebase';

const ItemComponent = (props) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const {
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
          <Switch />
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