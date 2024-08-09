import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslations } from '../core/dopebase';
import { HomeScreen } from '../screens';
import { TabBarBuilder } from '../core/ui/';
import { useNavigation, useNavigationState, useNavigationContainerRef } from '@react-navigation/core';
import { useOnboardingConfig } from '../core/onboarding/hooks/useOnboardingConfig';

const MainStack = createBottomTabNavigator();
const MainStackNavigator = () => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);
  const navigationRef = useNavigationContainerRef();
  const { config } = useOnboardingConfig();
  const descriptors = state.routes.reduce((acc, route) => {
    acc[route.key] = navigationRef.current?.getCurrentRoute()?.descriptors[route.key];
    return acc;
  }, {});
  const tabIcons = config.onboardingConfig.tabIcons;
  const { localized } = useTranslations();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: localized('Back'),
      }}
      tabBar={() => <TabBarBuilder tabIcons={tabIcons} state={state} navigation={navigation} descriptors={descriptors} />}
      initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Meal" component={HomeScreen} />
      <MainStack.Screen name="WorkOut" component={HomeScreen} />
      <MainStack.Screen name="Mental" component={HomeScreen} />
      <MainStack.Screen name="Statistical" component={HomeScreen} />

    </MainStack.Navigator>
  )
};

export default MainStackNavigator;
