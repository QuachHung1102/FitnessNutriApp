import React, { memo, useEffect, useState } from 'react';
import { Text, Dimensions, StyleSheet, TextInput, View } from 'react-native';

const QuestionInput = React.memo(({ unit, question, handleInputChange }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    handleInputChange(question, text);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        inputMode="numeric"
        keyboardType="number-pad"
        placeholder="Type your answer here..."
        placeholderTextColor="white"
      />
      <Text style={styles.unitText}>{unit}</Text>
    </View>
  );
});

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    marginTop: height * 0.075,
  },
  textInput: {
    color: 'white',
    width: width * 0.7,
    padding: 10,
    fontSize: height * 0.02,
  },
  unitText: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: height * 0.02,
  },
});

export default memo(QuestionInput);
