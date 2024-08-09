import React, { useEffect, useMemo, useState, memo } from 'react';
import { Text, Dimensions, StyleSheet, Pressable } from 'react-native';
import Colors from '../../constants/colors';

function QuestionButton({
  id,
  answer,
  question,
  handleInputChange,
  selected,
  setSelected,
}) {
  let activeColor = Colors.btnQuestionOff;
  if (selected == id) {
    activeColor = selected ? Colors.btnQuestion : Colors.btnQuestionOff;
  }
  return (
    <Pressable
      onPress={() => {
        handleInputChange(question, answer);
        setSelected(id);
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#102C57' : activeColor,
          borderRadius: 10,
        },
        styles.button,
      ]}>
      <Text style={[styles.textWhite, styles.textCenter]}>{answer}</Text>
    </Pressable>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  textWhite: {
    fontSize: width * 0.04,
    color: 'white',
  },
  button: {
    borderRadius: 50,
    margin: 10,
    width: width * 0.75,
    height: height * 0.07,
    justifyContent: 'center',
  },
});

export default memo(QuestionButton);
