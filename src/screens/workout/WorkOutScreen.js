import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
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
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import ItemList from '../../components/ItemList';
import WorkoutInfo from './WorkoutInfo';
import CrouselStep from '../home/CarouselStep';
import WorkoutSuggestions from './WorkoutSuggestions';

const data2 = {
  title: "Workout",
  dishs: [
    { id: '1', name: 'Upper Body', time: "07:00 am", calo: "26/02", imgSource: require('../../assets/images/workoutImg/workout1.png') },
    { id: '2', name: 'Lower Body', time: "07:30 am", calo: "27/02", imgSource: require('../../assets/images/workoutImg/workout1.png') },
    { id: '3', name: 'Abs', time: "07:30 am", calo: "28/02", imgSource: require('../../assets/images/workoutImg/workout2.png') },
  ]
};


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
  const [mealTimeItems, setMealTimeItems] = useState([]);
  const [text, setText] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  let mealTimeList = data2;

  const handlePress = () => {
    Alert.alert('Ố la la', 'This feature is not implemented yet')
  };

  useEffect(() => {
    const timeStamp = getUnixTimeStamp();
    console.log(timeFormat(timeStamp));
    const fetchCurrentDate = async () => {
      try {
        tempdata = await getCurrentDateFormatted;
        setCurrentDate(tempdata);
      } catch (error) {
        console.error('Error fetching current date:', error);
      }
    };
    fetchCurrentDate();
    if (currentDate) {
      setIsLoading(false);
    };

  }, [mealTimeList, currentDate]);

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

  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  };

  return (
    <ScrollView
      style={{ backgroundColor: colorSet.primaryBackground }}
      showsVerticalScrollIndicator={false}
    >
      <View mt8>
        <Text h2 style={{ textAlign: 'center' }}>{localized('Workout')}</Text>
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
        <Text mt1>{localized('Today')}, {currentDate}</Text>
      </View>
      <WorkoutInfo />
      <HeadingBlock localized={localized} text={"Next Activity"} text2={"View More"} />
      <ItemList data={data2} onPress={handlePress} iconPng={iconPng} switchActive={true} />
      <HeadingBlock localized={localized} text={"Workout Suggestions"} text2={"View More"} onPress={handlePress} />
      <View ph5 mb8>
        <WorkoutSuggestions />
      </View>
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