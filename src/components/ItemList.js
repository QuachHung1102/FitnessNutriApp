import React, { memo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { View } from '../core/dopebase';
import { useTranslations, useTheme } from '../core/dopebase';
import ItemComponent from './ItemComponent';

const ItemList = (props) => {
  const { data, onPress, iconPng, switchActive } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];


  const renderItem = ({ item }) => {
    return (
      <ItemComponent
        itemID={item.id}
        localized={localized}
        style={styles.imgStyle}
        rounded={true}
        imgSource={item.imgSource}
        onPress={onPress}
        iconSource={iconPng}
        containerStyle
        imageStyle={styles.iconStyle}
        tintColor={colorSet.primaryText}
        foodName={item.name}
        timeE={item.time}
        calo={item.calo}
        switchActive
      />
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <View mh5 mb5 style={styles.container}>
      <FlatList
        data={data.dishs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View ph2 pv2 />}
      // columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // columnWrapper: {
  //   justifyContent: 'space-between',
  // },
  container: {
  },
  imgStyle: {
    borderRadius: width * 0.03
  },
  iconStyle: {
    width: width * 0.055,
    height: width * 0.055,
  }
});

export default memo(ItemList);