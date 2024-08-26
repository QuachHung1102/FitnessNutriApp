import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MentalScreen } from '../screens';

const MentalStack = createStackNavigator();

const MentalStackNavigator = () => {
  return (
    <MentalStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="MentalScreen"
    >
      <MentalStack.Screen
        options={{ headerShown: true }}
        name="MentalScreen"
        component={MentalScreen}
      />


    </MentalStack.Navigator>
  )
};

export default MentalStackNavigator;
