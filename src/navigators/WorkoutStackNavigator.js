import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { WorkOutScreen } from '../screens';

const WorkoutStack = createStackNavigator();

const WorkoutStackNavigator = () => {
  return (
    <WorkoutStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="WorkoutScreen"
    >
      <WorkoutStack.Screen
        options={{ headerShown: false }}
        name="WorkoutScreen"
        component={WorkOutScreen}
      />
      {/* <WorkoutStack.Screen
        options={{ headerShown: false }}
        name="Question"
        component={QuestionScreen}
      /> */}

    </WorkoutStack.Navigator>
  )
};

export default WorkoutStackNavigator;
