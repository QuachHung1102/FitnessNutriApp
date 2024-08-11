import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoadScreen, WalkthroughScreen, DelayedLoginScreen } from '../core/onboarding';
import HomeStackNavigator from './HomeStackNavigator';  // Thằng này là MainStackNavigator
import LoginStack from './AuthStackNavigator';
import WalkthroughStackNavigator from './WalkthroughStackNavigator';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false}}
      initialRouteName="LoadScreen"
    >
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      {/* <Root.Screen name="Walkthrough" component={WalkthroughScreen} /> */}
      <Root.Screen name="WalkthroughStack" component={WalkthroughStackNavigator} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="MainStack" component={HomeStackNavigator} />
      <Root.Screen name="DelayedHome" component={DelayedLoginScreen} />
    </Root.Navigator>
  );
};

export default RootNavigator;
