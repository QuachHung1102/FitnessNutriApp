import React, { memo, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image, Text, View } from "../../core/dopebase";
import { useTranslations } from "../../core/dopebase";
import LinearGradient from "react-native-linear-gradient";

const ImproveMoodList = memo((props) => {
  const [selectedId, setSelectedId] = useState();
  const { localized } = useTranslations();

  const data = useMemo(() => [
    { id: "1", image: require("../../assets/images/workoutImg/ImproveMood1.png"), title: "Deep Breathing", do: "05:00", text1: "Breath" },
    { id: "2", image: require("../../assets/images/workoutImg/ImproveMood1.png"), title: "Deep Breathing", do: "Write 5 Wishes and Goals", text1: "Write" },
    { id: "3", image: require("../../assets/images/workoutImg/ImproveMood1.png"), title: "Deep Breathing", do: "05:00", text1: "Breath" },
    { id: "4", image: require("../../assets/images/workoutImg/ImproveMood1.png"), title: "Deep Breathing", do: "Write 5 Wishes and Goals", text1: "Write" },
  ], []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedId(item.id)}>
        <Image source={item.image} style={styles.imageStyle} rounded={true}>
          <LinearGradient style={styles.linearGradient} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['rgba(10, 5, 43, 0.85)', 'rgba(0, 0, 0, 0)']}>
            <View mh5 mb3>
              <Text h3 style={styles.text}>{localized(item.title)}</Text>
              <Text truncateTextNumber={7} style={styles.text}>{localized(item.text1)} | {localized(item.do)}</Text>
            </View>
          </LinearGradient>
        </Image>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      extraData={selectedId}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View ph2 pv2 />} // nhớ vào
    />
  );
});

export default memo(ImproveMoodList);

const styles = StyleSheet.create({
  container: {

  },
  imageStyle: {
    width: Dimensions.get('screen').width * 0.66,
    height: Dimensions.get('screen').width * 0.4,
    resizeMode: 'center'
  },
  linearGradient: {
    borderRadius: 16,
    height: '100%',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
  },
});