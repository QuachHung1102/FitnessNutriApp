import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { Dimensions, ScrollView, Alert } from 'react-native';
import {
  View,
  Text,
  useTheme,
  useTranslations,
  SearchBar,
  ActivityIndicator,
} from '../../core/dopebase';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import {
  getUnixTimeStamp,
  getCurrentDateFormatted,
} from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import ItemList from '../../components/ItemList';
import WorkoutInfo from './WorkoutInfo';
import WorkoutSuggestions from './WorkoutSuggestions';
import updateDeviceStorage from '../../core/helpers/updateDeviceStorage';

const data2 = [
  {
    title: 'Workout',
    dishs: [
      {
        id: '0',
        name: 'Upper Body',
        time: '07:00 am',
        calo: '26/02',
        onNoti: true,
        imgSource: require('../../assets/images/workoutImg/workout1.png'),
      },
      {
        id: '1',
        name: 'Lower Body',
        time: '07:30 am',
        calo: '27/02',
        onNoti: false,
        imgSource: require('../../assets/images/workoutImg/workout1.png'),
      },
      {
        id: '2',
        name: 'Abs',
        time: '07:30 am',
        calo: '28/02',
        onNoti: false,
        imgSource: require('../../assets/images/workoutImg/workout2.png'),
      },
    ],
  },
];

export const WorkOutScreen = memo(props => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const iconPng = require('../../assets/icons/right-arrow.png');

  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  const [workoutData, setWorkoutData] = useState([]);

  const handlePress = useCallback(() => {
    Alert.alert('Ố la la', 'This feature is not implemented yet');
  }, []);

  useEffect(() => {
    const fetchCurrentDate = async () => {
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

  useEffect(() => {
    const fetchData = async () => {
      let workoutScreenData = await updateDeviceStorage.getStoreData(
        'WorkoutScreenData',
      );

      try {
        if (workoutScreenData) {
          setWorkoutData(workoutScreenData);
          console.log(`1`, workoutScreenData[0].dishs[0].onNoti);
        } else {
          updateDeviceStorage.setStoreData('WorkoutScreenData', data2);
          setWorkoutData(data2);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
  }, [currentUser?.id]);

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
        showsVerticalScrollIndicator={false}>
        <View mt8>
          <Text h2 style={{ textAlign: 'center' }}>
            {localized('Workout')}
          </Text>
        </View>
        <View mh5 mv6>
          <SearchBar
            showsCancelButton={false}
            placeholder={localized('Find Ingredients')}
            onChangeText={setText}
            containerStyle={{ height: Dimensions.get('window').height * 0.08 }}
          />
        </View>
        <View mh5>
          <Text h2>{localized('Daily Activities')}</Text>
          <Text mt1>
            {localized('Today')}, {currentDate}
          </Text>
        </View>
        <WorkoutInfo />
        <HeadingBlock
          localized={localized}
          text={'Next Activity'}
          text2={'View More'}
        />
        {workoutData.length > 0 && (
          <ItemList
            data={workoutData[0]}
            dataIndex={0}
            dataDeviceKey={'WorkoutScreenData'}
            onPress={handlePress}
            iconPng={iconPng}
            switchActive={true}
          />
        )}
        <HeadingBlock
          localized={localized}
          text={'Workout Suggestions'}
          text2={'View More'}
          onPress={handlePress}
        />
        <View ph5 mb8>
          <WorkoutSuggestions />
        </View>
      </ScrollView>
    );
  }
});
