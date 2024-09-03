import React from 'react';
import { Platform, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslations } from '../core/dopebase';
import { HomeScreen, MealScreen } from '../screens';
import WorkoutStackNavigator from './WorkoutStackNavigator';
import MentalStackNavigator from './MentalStackNavigator';
import { useOnboardingConfig } from '../core/onboarding/hooks/useOnboardingConfig';
import { useTheme } from '../core/dopebase';

const MainStack = createBottomTabNavigator();
const MainStackNavigator = () => {
  const { config } = useOnboardingConfig();
  const tabIcons = config.onboardingConfig.tabIcons;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  return (
    <MainStack.Navigator
      screenOptions={({ route }) => ({
        headerBackTitleVisible: false,
        headerBackTitle: localized('Back'),
        tabBarActiveTintColor: "#5244F3",
        tabBarInactiveTintColor: colorSet.primaryButtonTextNonActive,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = focused
              ? tabIcons['Home'].focus
              : tabIcons['Home'].unFocus;
          } else if (route.name === 'Meal') {
            icon = focused
              ? tabIcons['Meal'].focus
              : tabIcons['Meal'].unFocus;
          } else if (route.name === 'WorkOut') {
            icon = focused
              ? tabIcons['WorkOut'].focus
              : tabIcons['WorkOut'].unFocus;
          } else if (route.name === 'Mental') {
            icon = focused
              ? tabIcons['Mental'].focus
              : tabIcons['Mental'].unFocus;
          } else if (route.name === 'Statistical') {
            icon = focused
              ? tabIcons['Statistical'].focus
              : tabIcons['Statistical'].unFocus;
          }
          return icon;
        },
        tabBarStyle: {
          backgroundColor: colorSet.primaryBackground,
          height: Dimensions.get('window').height * 0.09,
          paddingBottom: Dimensions.get('window').height * 0.01,
          // borderTopEndRadius: 15,
          // borderTopStartRadius: 15,
        },

      })
      }
      initialRouteName="Home"
    >
      <MainStack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '' }} />
      <MainStack.Screen name="Meal" component={MealScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="WorkOut" component={WorkoutStackNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="Mental" component={MentalStackNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="Statistical" component={HomeScreen} options={{ headerTitle: '' }} />
    </MainStack.Navigator>
  )
};

export default MainStackNavigator;
