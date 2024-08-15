import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import {
  View as CustomView,
  Text as CustomText,
  useTheme,
  useTranslations,
  TouchableIcon,
  ProfilePictureUpdate,
} from '../../core/dopebase';
import FastImage from 'react-native-fast-image';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import { WorkoutSvg, MealSvg } from '../../assets/images/svg';
import ConsumWater from './ConsumWater';

export const HomeScreen = memo(props => {
  const { navigation } = props
  const currentUser = useCurrentUser()
  const authManager = useAuth()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const colorSet = theme.colors[appearance]
  const styles = dynamicStyles(theme, appearance)
  let currentDate;
  let iconsSize = Dimensions.get('screen').width * 0.07;

  const [profilePictureFile, setProfilePictureFile] = useState(null)

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
        <CustomView br4 ph3 pv3 style={styles.calorBurnedContainer}>
          <CustomView mb3 style={[styles.iconCover, {
            backgroundColor: colorSet.secondaryBackground,
            width: iconsSize * 1.6,
            height: iconsSize * 1.6,
          }]}>
            <WorkoutSvg color={colorSet.svgColor} width={iconsSize} height={iconsSize} />
          </CustomView>
          <CustomText h3>{localized("Calories Burned")}</CustomText>
          <Text>320 Kcal</Text>
        </CustomView>
        <CustomView br4 ph3 pv3 style={styles.consumptionContainer}>
          <CustomView mb3 style={[styles.iconCover, {
            backgroundColor: colorSet.thirBackground,
            width: iconsSize * 1.6,
            height: iconsSize * 1.6,
          }]}>
            <MealSvg color={colorSet.svgColor} width={iconsSize} height={iconsSize} />
          </CustomView>
          <CustomText h3>{localized("Consume")}</CustomText>
          <Text>320 Kcal</Text>
        </CustomView>
      </CustomView>
      <CustomView mt5>
        <CustomView mh5 ph3 pt3 br4 style={styles.consumWaterContainer}>
          <CustomView style={styles.consumWaterContainerText}>
            <CustomText h3 style={[styles.consumWaterText]}>Uống nước</CustomText>
            <CustomText style={[styles.consumWaterText]}>Mục tiêu: 0.25/2l</CustomText>
          </CustomView>
          <ConsumWater />
        </CustomView>
      </CustomView>
      <CustomView mt5>
        <CustomView mh5 br4 pv5 style={styles.updateAppearanceContainer}>
          <View>
            <ProfilePictureUpdate setProfilePictureFile={setProfilePictureFile} />
          </View>
          <CustomText h2>{localized("Update Appearance")}</CustomText>
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