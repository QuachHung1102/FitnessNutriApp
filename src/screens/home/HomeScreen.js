import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Dimensions, ScrollView, View, Text, Alert } from 'react-native';
import {
  View as CustomView,
  Text as CustomText,
  useTheme,
  useTranslations,
  TouchableIcon,
  ProfilePictureUpdate,
  ActivityIndicator,
} from '../../core/dopebase';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import { WorkoutSvg, MealSvg } from '../../assets/images/svg';
import ConsumWater from './ConsumWater';

import plusIcon from '../../assets/icons/add.png';
import CrouselStep from './CarouselStep';
import PlanView from './PlanView';
import MusicList from '../../components/MusicList';

export const HomeScreen = memo(props => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  let iconsSize = Dimensions.get('screen').width * 0.07;

  const [isLoading, setIsLoading] = useState(true);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const handlePress = () => {
    Alert.alert('Ố la la', 'This feature is not implemented yet');
  };

  useEffect(() => {
    const fetchCurrentDate = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })
      try {
        const tempdata = await getCurrentDateFormatted;
        setCurrentDate(tempdata);
      } catch (error) {
        console.error('Error fetching current date:', error);
      }
    };
    fetchCurrentDate();
    if (currentDate) {
      setIsLoading(false);
    }
  }, [currentDate]);

  useLayoutEffect(() => {
    navigation.setOptions({
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
            <CustomText h3 style={styles.currentDate}>{currentDate}</CustomText>
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
    });
  }, [currentDate]);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
  }, [currentUser?.id]);

  const onLogout = useCallback(() => {
    authManager?.logout(currentUser);
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoadScreen' }],
    });
  }, [authManager, currentUser, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <ScrollView
        style={{ backgroundColor: colorSet.primaryBackground }}
        showsVerticalScrollIndicator={false}
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
              <CustomText h3 style={[styles.consumWaterText]}>{localized("Water Intake")}</CustomText>
              <CustomText style={[styles.consumWaterText]}>Mục tiêu: 0.25/2l</CustomText>
            </CustomView>
            <ConsumWater />
          </CustomView>
        </CustomView>
        <CustomView mt5 mb4>
          <CustomView mh5 br4 pv5 style={styles.updateAppearanceContainer}>
            <View>
              <ProfilePictureUpdate setProfilePictureFile={setProfilePictureFile} />
            </View>
            <CustomText h2>{localized("Update Appearance")}</CustomText>
          </CustomView>
        </CustomView>
        <HeadingBlock localized={localized} text={"Today's Nutrition"} />
        <CustomView>
          <TouchableIcon
            onPress={handlePress}
            iconSource={plusIcon}
            title={localized('Enter Ingredients')}
            containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            imageStyle={{ width: 30, height: 30 }}
            titleStyle={{ fontSize: Dimensions.get('window').width * 0.045, fontWeight: '700' }}
            renderTitle={true}
            tintColor={colorSet.primaryText}
          />
        </CustomView>
        <PlanView text={"Nutrition Plan"} onPress={handlePress} />
        <HeadingBlock localized={localized} text={"Workout Plan"} text2={"25/02"} />
        <CustomView ph5 mb3>
          <CrouselStep />
        </CustomView>
        <PlanView text={"Workout Plan"} onPress={handlePress} />
        <HeadingBlock localized={localized} text={"Workout Plan"} text2={"View More"} onPress={handlePress} />
        <MusicList playBtn={true} />
      </ScrollView>
    );
  }


});