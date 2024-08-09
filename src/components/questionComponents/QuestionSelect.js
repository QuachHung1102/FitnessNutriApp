import React, { memo } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const QuestionSelect = props => {
  // Your code here

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          props.handleInputChange(props.question, props.answer);
          props.setSelectedBody(props.answer);
        }}>
        <Image style={props.selectedBody == props.answer ? { ...styles.imageChoice, borderColor: 'red', borderWidth: 1 } : styles.imageChoice} source={props.bodyImage} />
      </Pressable>
      <Text style={styles.textWhite}>{props.answer}</Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  // Your styles here
  container: {
    marginTop: height * 0.015,
    marginHorizontal: width * 0.03,
    borderRadius: 5,
  },
  imageChoice: {
    width: width * 0.4,
    height: width * 0.23,
    resizeMode: 'cover',
    paddingBottom: 10,
    borderRadius: 5,
  },
  textWhite: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: width * 0.035,
  },
});

export default memo(QuestionSelect);
