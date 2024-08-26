import React, { memo, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image, Text, View } from "../../core/dopebase";
import { useTranslations } from "../../core/dopebase";
import LinearGradient from "react-native-linear-gradient";

const WorkoutSuggestions = memo((props) => {
  const [selectedId, setSelectedId] = useState();
  const { localized } = useTranslations();

  const data = useMemo(() => [
    { id: "1", image: require("../../assets/images/workoutImg/workoutS1.png"), title: "Warm-Up", time: "10", number: 11 },
    { id: "2", image: require("../../assets/images/workoutImg/workoutS2.png"), title: "Main Workout", time: "10", number: 11 },
    { id: "3", image: require("../../assets/images/workoutImg/workoutS3.png"), title: "Cool Down", time: "10", number: 11 },
  ], []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedId(item.id)}>
        <Image source={item.image} style={styles.imageStyle} rounded={true}>
          <LinearGradient style={styles.linearGradient} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['rgba(10, 5, 43, 0.85)', 'rgba(0, 0, 0, 0)']}>
            <View mh5 mb3>
              <Text h2 mv1 style={styles.text}>{localized(item.title)}</Text>
              <View style={{
                flexDirection: "row"
              }}>
                <Text style={styles.text}>{item.time} {localized('Minustes')} - </Text>
                <Text style={styles.text}>{item.number} {localized('Exercises')}</Text>
              </View>
            </View>
          </LinearGradient>
        </Image>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={false}
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      extraData={selectedId}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View ph2 pv2 />} // nhớ vào
    />
  );
});

export default WorkoutSuggestions;

const styles = StyleSheet.create({
  container: {
  },
  imageStyle: {
    width: '100%',
    height: Dimensions.get('screen').width * 0.38,
  },
  linearGradient: {
    borderRadius: Dimensions.get('screen').width * 0.05,
    height: '100%',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
  },
});