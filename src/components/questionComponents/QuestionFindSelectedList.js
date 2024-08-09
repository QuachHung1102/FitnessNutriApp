import React, { memo, useId } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';

const QuestionFindSelectedList = ({ allergies, onDeleteAllergie }) => {
  const selectedId = useId();

  return (
    <ScrollView
      style={styles.chosenContainer}
      contentContainerStyle={{ paddingVertical: 5 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {allergies.map((a, index) => (
          <Pressable
            key={`selected-allergie-${a.id}`}
            onPress={() => {
              onDeleteAllergie(a.id);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#DAC0A3',
                borderRadius: 10,
              },
              styles.theChosen,
            ]}>
            <Text style={[styles.textBlack]}>{a.text}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  textBlack: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
  chosenContainer: {
    backgroundColor: 'white',
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.03,
    width: width * 0.8,
    height: height * 0.1,
  },
  theChosen: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
});

export default memo(QuestionFindSelectedList);
