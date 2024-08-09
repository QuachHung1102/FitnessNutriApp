import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import QuestionButton from './QuestionButton';
import QuestionInput from './QuestionInput';
import QuestionSelect from './QuestionSelect';
import QuestionFind from './QuestionFind';

function QuestionForm({ questionData, answers, setAnswers }) {
  const [selected, setSelected] = useState(0);

  const handleInputChange = (name, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const [selectedBody, setSelectedBody] = useState(null);

  const renderItem = ({ item }) => {
    if (questionData.type == 'button') {
      return (
        <QuestionButton
          id={item.id}
          answer={item.answer}
          question={questionData.question}
          handleInputChange={handleInputChange}
          selected={selected}
          setSelected={setSelected}
        />
      );
    } else if (questionData.type == 'input') {
      return (
        <QuestionInput
          unit={item.unit}
          question={questionData.question}
          handleInputChange={handleInputChange}
        />
      );
    } else if (questionData.type == 'select') {
      return (
        <QuestionSelect
          answer={item.answer}
          question={questionData.question}
          bodyImage={item.bodyImage}
          handleInputChange={handleInputChange}
          selectedBody={selectedBody}
          setSelectedBody={setSelectedBody}
        />
      );
    } else if (questionData.type == 'form') {
      return (
        <QuestionFind
          answer={item.answer}
          question={questionData.question}
          handleInputChange={handleInputChange}
        />
      );
    }
  };

  return (
    <View style={styles.questionContainer}>
      <View style={styles.questionForm}>
        <Text style={[styles.textWhite, styles.question]}>
          {questionData.question}
        </Text>
        <View style={styles.questionFormContainer}>
          <FlatList
            data={questionData.answers}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            extraData={answers}
            numColumns={questionData.type == 'select' ? 2 : 1}
            horizontal={false}
            columnWrapperStyle={
              questionData.type == 'select' && {
                marginBottom: height * 0.015,
                justifyContent: 'center',
              }
            }
          />
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: 'white',
  },
  questionForm: {
    flex: 1,
    marginTop: height * 0.15,
    justifyContent: 'center',
  },
  questionFormContainer: {
    marginTop: height * 0.01,
  },
  question: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: width * 0.055,
    fontStyle: 'normal', // default is normal
    fontWeight: '700', // default is 400
    lineHeight: height * 0.05, // default is 20
    letterSpacing: 0.5,
  },
});

export default memo(QuestionForm);
