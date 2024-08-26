import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Dimensions, ScrollView, Alert } from 'react-native';
import {
  View,
  Text,
  useTheme,
  useTranslations,
  ActivityIndicator,
  TouchableIcon,
} from '../../core/dopebase';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import { timeFormat, getUnixTimeStamp, getCurrentDateFormatted } from '../../core/helpers/timeFormat';
import HeadingBlock from '../../components/HeadingBlock';
import ItemList from '../../components/ItemList';
import ImproveMoodList from './ImproveMoodList';
import { EmotionChart } from './EmotionChart';
import EmotionStatus from './EmotionStatus';
import { Discover } from './Discover';

const data1 = [
  { id: '1', text1: 'Breath', imgSource: require('../../assets/images/workoutImg/discover1.png') },
  { id: '2', text1: "Meditation", imgSource: require('../../assets/images/workoutImg/discover1.png') },
  { id: '3', text1: "Listen", imgSource: require('../../assets/images/workoutImg/discover2.png') },
  { id: '4', text1: "Read", imgSource: require('../../assets/images/workoutImg/discover3.png') },
  { id: '5', text1: "Write", imgSource: require('../../assets/images/workoutImg/discover4.png') },
]

const data2 = {
  title: "Workout",
  dishs: [
    { id: '1', name: 'Take Deep Breaths, Stay Calm', time: "07:00 am", calo: "26/02", imgSource: require('../../assets/images/workoutImg/workout3.png') },
    { id: '2', name: 'Think Positively', time: "07:30 am", calo: "27/02", imgSource: require('../../assets/images/workoutImg/workout4.png') },
    { id: '3', name: 'Write in a Journal', time: "07:30 am", calo: "28/02", imgSource: require('../../assets/images/workoutImg/workout5.png') },
  ]
};

const data3 = [
  { id: 1, emo: "100%", time: '07:22', color: "rgba(60, 232, 98, 0.75)", img: require('../../assets/gifs/tuHao.gif') },
  { id: 2, emo: "50%", time: '10:34', color: "rgba(54, 134, 255, 0.75)", img: require('../../assets/gifs/binhYen.gif') },
  { id: 3, emo: "30%", time: '12:56', color: "rgba(255, 92, 0, 0.75)", img: require('../../assets/gifs/buonBa.gif') },
  { id: 4, emo: "17%", time: '13:34', color: "rgba(255, 31, 17, 0.75)", img: require('../../assets/gifs/tucGian.gif') },
];


export const MentalScreen = memo(props => {
  const { navigation } = props;
  const currentUser = useCurrentUser();
  const authManager = useAuth();
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const styles = dynamicStyles(theme, appearance);
  const iconPng = require('../../assets/icons/right-arrow.png');

  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(null);
  const [emotionData, setEmotionData] = useState(null);
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
    if (data3) {
      setEmotionData(data3);
    }
    if (currentDate && emotionData && data1) {
      setIsLoading(false);
    };

  }, [mealTimeList, currentDate]);

  useLayoutEffect(() => {

    navigation.setOptions({
      headerTitle: '',
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
            <Text h3>{localized('Hello')}</Text>
            <Text h3 style={styles.currentDate}>{currentDate}</Text>
          </View>
        </View>
      ),

      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
        height: 100,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [currentDate])

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
      <View mh5 mv5>
        <Text h3>{localized('Improve Mood')}</Text>
      </View>
      <View ph5 mb3>
        <ImproveMoodList />
      </View>
      <EmotionChart emotionData={emotionData} />
      <EmotionStatus localized={localized} onPress={handlePress} />
      <HeadingBlock localized={localized} text={"Your Plan"} text2={"View More"} onPress={handlePress} />
      <ItemList data={data2} onPress={handlePress} iconPng={iconPng} switchActive={true} />
      <Discover data={data1} />
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