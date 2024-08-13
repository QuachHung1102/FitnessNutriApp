import React, { memo, useEffect, useLayoutEffect, useCallback } from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { View as CustomView } from '../../core/dopebase';
import FastImage from 'react-native-fast-image';
import { useTheme, useTranslations, TouchableIcon } from '../../core/dopebase';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import { WorkoutSvg, MealSvg } from '../../assets/images/svg';

export const HomeScreen = memo(props => {
  const { navigation } = props
  const currentUser = useCurrentUser()
  const authManager = useAuth()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const colorSet = theme.colors[appearance]
  const styles = dynamicStyles(theme, appearance)
  let currentDate;

  useEffect(() => {
    const timeStamp = getUnixTimeStamp();
    console.log(timeFormat(timeStamp));
    const fetchCurrentDate = async () => {
      try {
        currentDate = await getCurrentDateFormatted;
      } catch (error) {
        console.error('Error fetching current date:', error);
      }
    };
    fetchCurrentDate();
  }, []);

  useLayoutEffect(() => {

    navigation.setOptions({
      // headerTitle: localized('Home'),
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <TouchableIcon
            imageStyle={{
              height: Dimensions.get('window').width * 0.15,
              width: Dimensions.get('window').width * 0.15,
              borderWidth: 2,
              borderRadius: Dimensions.get('window').width * 0.03,
              borderColor: colorSet.secondaryBackground,
            }}
            iconSource={theme.icons.userDefault}
          />
          <View>
            <Text style={styles.currentDate}>{currentDate}</Text>
            <Text>Hãy thực hiện chế độ hôm nay</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableIcon
            imageStyle={{ tintColor: colorSet.primaryForeground }}
            iconSource={theme.icons.logout}
            onPress={onLogout}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
        height: 100,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [])

  useEffect(() => {
    if (!currentUser?.id) {
      return
    }
  }, [currentUser?.id])

  const onLogout = useCallback(() => {
    authManager?.logout(currentUser)
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoadScreen',
        },
      ],
    })
  }, [currentUser])

  return (
    <ScrollView
      style={{ backgroundColor: colorSet.primaryBackground }}
    >
      <HeadingBlock localized={localized} text={"Today"} />
      <CustomView mh5 style={{ flexDirection: 'row', gap: 16 }}>
        <CustomView style={styles.calorBurnedContainer}>
          <WorkoutSvg color={colorSet.svgColor} width={32} height={32} />
          <Text>{localized("Calories Burned")}</Text>
          <Text>320 Kcal</Text>
        </CustomView>
        <CustomView style={styles.consumptionContainer}>
          <MealSvg color={colorSet.svgColor} width={32} height={32} />
          <Text>{localized("Consume")}</Text>
          <Text>320 Kcal</Text>
        </CustomView>
      </CustomView>
    </ScrollView>
  )
})

{/* 
  <FastImage
    style={styles.image}
    source={{ uri: currentUser?.profilePictureURL }}
  />
  <Text style={styles.text}>
    {localized('Logged in as')} {currentUser?.email}
  </Text> 
*/}