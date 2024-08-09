import React, { useState, useReducer, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import QuestionFindAddAllergies from './QuestionFindAddAllergies';
import QuestionFindListAllergie from './QuestionFindListAllergie';
import QuestionFindSelectedList from './QuestionFindSelectedList';
import { useOnboardingConfig } from '../../core/onboarding/hooks/useOnboardingConfig';

const QuestionFind = (props) => {
  const [filteredAllergies, setFilteredAllergies] = useState([]);
  const [allergies, allergiesDispatch] = useReducer(
    allergiesReducer,
    initialAllergies,
  );
  const { config } = useOnboardingConfig();

  const allergiesList = config.onboardingConfig.allergiesList;

  useEffect(() => {
    // const answer = allergies.map(a => a.text).join(', ');
    const answer = allergies.map(a => a.text);
    props.handleInputChange(props.question, answer);
  }, [allergies]);

  function handleAddAllergie(text) {
    allergiesDispatch({ type: 'added', id: text, text: text });
  }

  function handChangeAllergie(allergie) {
    allergiesDispatch({ type: 'changed', allergie });
  }

  function handleDeleteAllergie(allergieId) {
    allergiesDispatch({ type: 'deleted', id: allergieId });
  }

  const handleInputChange = inputValue => {
    const filteredValues = allergiesList.filter(allergy =>
      allergy.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredAllergies(filteredValues);
  };

  function allergiesReducer(allergies, action) {
    switch (action.type) {
      case 'added': {
        const existingAllergie = allergies.some(a => a.id === action.text);
        if (!existingAllergie) {
          return [...allergies, { id: action.id, text: action.text }];
        }
        return allergies;
      }
      case 'changed': {
        return allergies.map(a => {
          if (a.id === action.id) {
            return { ...a, text: action.text };
          } else {
            return a;
          }
        });
      }
      case 'deleted': {
        return allergies.filter(a => a.id !== action.id);
      }
      default:
        throw Error('Unknown action: ' + action.type);
    }
  }

  return (
    <View>
      <QuestionFindAddAllergies handleInputChange={handleInputChange} />
      <QuestionFindSelectedList
        allergies={allergies}
        onDeleteAllergie={handleDeleteAllergie}
      />
      <QuestionFindListAllergie
        filteredAllergies={filteredAllergies}
        onAddAllergie={handleAddAllergie}
      />
    </View>
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
    height: height * 0.06,
  },
  theChosen: {
    marginRight: width * 0.03,
  },
  allergiesView: {
    height: height * 0.25,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
  },
});

export default memo(QuestionFind);

const initialAllergies = [];
