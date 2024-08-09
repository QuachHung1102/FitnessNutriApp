import React, { memo, useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';

const QuestionFindListAllergie = ({ filteredAllergies, onAddAllergie }) => {
  // Component logic goes here

  return (
    //JSX code goes here
    <ScrollView
      style={styles.allergiesView}
      contentContainerStyle={{
        paddingVertical: height * 0.02,
        alignItems: 'center',
      }}>
      {filteredAllergies.map((allergy, index) => (
        <Pressable
          key={`find-allergie-${nextIndex++}`}
          onPress={() => {
            onAddAllergie(allergy);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#102C57' : '#EADBC8',
              borderRadius: 10,
              color: pressed ? 'white' : 'black',
            },
            styles.theChosen,
          ]}>
          <Text style={[styles.textBlack, styles.theChosen]}>{allergy}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default memo(QuestionFindListAllergie);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  textBlack: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: '500',
    textAlign: 'center',
    width: width * 0.5,
  },
  allergiesView: {
    height: height * 0.22,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
  },
  theChosen: {
    borderRadius: 50,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    margin: 5,
  },
});

let nextIndex = 0;
