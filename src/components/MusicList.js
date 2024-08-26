import React, { memo, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../core/dopebase';
import MusicItem from './MusicItem';
import { useTranslations } from '../core/dopebase';

const MusicList = (props) => {
  const { playBtn } = props;

  const data = useMemo(() => [
    { id: '1', image: require('../assets/images/backgroundImages/bgl1.png'), title: 'Meditation', time: '20', playedTime: '13:09' },
    { id: '2', image: require('../assets/images/backgroundImages/bgl2.png'), title: 'Sleep Music', time: '60', playedTime: '09:22' },
    { id: '3', image: require('../assets/images/backgroundImages/bgl3.png'), title: 'Focus Playlist', time: '20', playedTime: '10:23' },
    { id: '4', image: require('../assets/images/backgroundImages/bgl4.png'), title: 'Rain Sounds', time: '60', playedTime: '13:45' },
    // Add more image objects here
  ], []);

  const { localized } = useTranslations();

  const renderItem = ({ item }) => {
    return (
      <MusicItem
        playBtn={playBtn}
        source={item.image}
        textStyle={styles.textStyle}
        title={localized(item.title)}
        time={item.time}
        textTime={localized('Minustes')}
        playedTime={item.playedTime} />
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <View mh5 mb5>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View ph2 pv2 />}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  textStyle: {
    color: '#CEAEFF',
  }
});

export default memo(MusicList);