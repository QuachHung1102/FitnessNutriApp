import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'react-native-linear-gradient';
import { useOnboardingConfig } from '../../core/onboarding/hooks/useOnboardingConfig';
import deviceStorage from '../../core/onboarding/utils/AuthDeviceStorage';
import QuestionForm from '../../components/questionComponents/QuestionForm';
import PrevSvg from '../../assets/images/svg/prevSvg';
import NextSvg from '../../assets/images/svg/nextSvg';

import { totalDailyEnergyExpenditureCacl } from '../../utils/totalDailyEnergyExpenditureCacl';

const image = require('../../assets/images/backgroundImages/questionBg.jpg');
const QuestionScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({
    'Mục đích của bạn là:': '',
    'Giới tính của bạn là:': '',
    'Tuổi của bạn là:': '',
    'Chiều cao của bạn là:': '',
    'Cân nặng hiện tại:': '',
    'Cân nặng mục tiêu:': '',
    'Hình dáng cơ thể:': '',
    'Nguyên liệu dị ứng:': [],
    'Thời gian đạt được mục tiêu:': '',
  });
  const swiperRef = useRef(null);
  const [ready, setReady] = useState(false);
  const { config } = useOnboardingConfig();

  const slides = config.onboardingConfig.questionData;

  useEffect(() => {
    console.log(answers);
    for (const answer of Object.values(answers)) {
      // console.log(answer);
      if (answer === '' || answer === null || answer === undefined) {
        setReady(false);
        return; // Thoát khỏi useEffect nếu tìm thấy câu trả lời chưa được điền
      }
    }
    setReady(true);
  }, [answers]);

  useEffect(() => {
    getData().then(data => {
      console.log(data);
    });
  }, [ready]);

  const storeData = async (
    purpose,
    weight,
    weightGoal,
    height,
    age,
    gender,
    bodyShape,
    allergies,
    time,
    totalDailyEnergyExpenditure,
    weightAdjustmentPerWeek,
  ) => {
    try {
      await AsyncStorage.setItem('purpose', purpose.toString());
      await AsyncStorage.setItem('weight', weight.toString());
      await AsyncStorage.setItem('weightGoal', weightGoal.toString());
      await AsyncStorage.setItem('height', height.toString());
      await AsyncStorage.setItem('age', age.toString());
      await AsyncStorage.setItem('gender', gender.toString());
      await AsyncStorage.setItem('bodyShape', bodyShape.toString());
      await AsyncStorage.setItem('allergies', JSON.stringify(allergies));
      await AsyncStorage.setItem('time', time.toString());
      await AsyncStorage.setItem(
        'totalDailyEnergyExpenditure',
        totalDailyEnergyExpenditure.toString(),
      );
      await AsyncStorage.setItem(
        'weightAdjustmentPerWeek',
        weightAdjustmentPerWeek.toString(),
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const purpose = await AsyncStorage.getItem('purpose');
      const weight = await AsyncStorage.getItem('weight');
      const weightGoal = await AsyncStorage.getItem('weightGoal');
      const height = await AsyncStorage.getItem('height');
      const age = await AsyncStorage.getItem('age');
      const gender = await AsyncStorage.getItem('gender');
      const bodyShape = await AsyncStorage.getItem('bodyShape');
      const allergies = await AsyncStorage.getItem('allergies');
      const time = await AsyncStorage.getItem('time');
      const totalDailyEnergyExpenditure = await AsyncStorage.getItem(
        'totalDailyEnergyExpenditure',
      );
      const weightAdjustmentPerWeek = await AsyncStorage.getItem(
        'weightAdjustmentPerWeek',
      );

      // Parse to correct type
      const parsedAllergies = JSON.parse(allergies);

      return {
        purpose,
        weight: parseFloat(weight),
        weightGoal: parseFloat(weightGoal),
        height: parseFloat(height),
        age: parseInt(age, 10),
        gender,
        bodyShape,
        parsedAllergies,
        time,
        totalDailyEnergyExpenditure: parseFloat(totalDailyEnergyExpenditure),
        weightAdjustmentPerWeek: parseFloat(weightAdjustmentPerWeek),
      };
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  if (ready) {
    const purpose = answers['Mục đích của bạn là:'];
    const weight = answers['Cân nặng hiện tại:'];
    const weightGoal = answers['Cân nặng mục tiêu:'];
    const height = answers['Chiều cao của bạn là:'];
    const age = answers['Tuổi của bạn là:'];
    const gender = answers['Giới tính của bạn là:'];
    const bodyShape = answers['Hình dáng cơ thể:'];
    const allergies = answers['Nguyên liệu dị ứng:'];
    const time = answers['Thời gian đạt được mục tiêu:'];
    const totalDailyEnergyExpenditure = totalDailyEnergyExpenditureCacl(
      weight,
      weightGoal,
      height,
      age,
      gender,
      time,
    );
    const weightAdjustmentPerWeek =
      (weightGoal - weight) / (parseFloat(time.split(' ', [1])) * 4);

    storeData(
      purpose,
      weight,
      weightGoal,
      height,
      age,
      gender,
      bodyShape,
      allergies,
      time,
      totalDailyEnergyExpenditure,
      weightAdjustmentPerWeek.toFixed(2),
    );
  }

  const goToPrev = () => {
    const currentIndex = swiperRef.current.getCurrentIndex();
    if (currentIndex > 0) {
      swiperRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const goToNext = () => {
    const currentIndex = swiperRef.current.getCurrentIndex();
    if (currentIndex < slides.length - 1) {
      swiperRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      if (ready) {
        deviceStorage.setShouldShowOnboardingFlow('false');
        navigation.navigate('LoginStack', { screen: 'Welcome' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backGroundImage}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)']}
          style={{ flex: 1 }}>
          <Pressable onPress={goToPrev}>
            <View style={styles.prevButton}>
              <PrevSvg />
            </View>
          </Pressable>
          <SwiperFlatList
            ref={swiperRef}
            autoplay={false}
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination
            paginationStyle={{ top: height * 0.11 }}
            paginationStyleItem={{
              width: width * 0.03,
              height: width * 0.03,
              marginHorizontal: width * 0.015,
            }}
            data={slides}
            renderItem={({ item }) => (
              <View style={[styles.child]}>
                <QuestionForm
                  questionData={item}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              </View>
            )}
          />
          <Pressable onPress={goToNext}>
            <View style={styles.nextButton}>
              <NextSvg />
            </View>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.25,
    textAlign: 'center',
    color: 'white',
  },
  backGroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  prevButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.1,
    marginTop: height * 0.04,
    marginLeft: width * 0.06,
  },
  nextButton: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 100,
    marginBottom: height * 0.055,
    marginLeft: width * 0.75,
  },
});

export default QuestionScreen;
