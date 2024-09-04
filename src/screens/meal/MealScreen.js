import React, { memo, useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useTheme, useTranslations, SearchBar, Alert, View, Text, ActivityIndicator } from '../../core/dopebase';
import dynamicStyles from './styles';
import { useCurrentUser } from '../../core/onboarding';
import { useAuth } from '../../core/onboarding/hooks/useAuth';
import HeadingBlock from '../../components/HeadingBlock';
import ConsumeList from './ConsumeList';
import ItemList from '../../components/ItemList';
import NotifeeBtn from '../../core/dopebase/core/components/base/Notifee/NotifeeBtn';
import updateDeviceStorage from '../../core/helpers/updateDeviceStorage';

const data1 = [
  { id: 1, name: 'Calories', value: 300, unit: 'kcal', progress: '70%' },
  { id: 2, name: 'Proteins', value: 30, unit: 'g', progress: '10%' },
  { id: 3, name: 'Fats', value: 0, unit: 'g', progress: '0%' },
  { id: 4, name: 'Carbs', value: 100, unit: 'g', progress: '20%' },
];

const data2 = [
  {
    title: "Breakfast",
    dishs: [
      { id: '1', name: 'Phở Bò', time: "07:00 am", calo: 215, onNoti: true, imgSource: require('../../assets/images/foodImg/phoBo.png') },
      { id: '2', name: 'Cafe đen', time: "07:30 am", calo: 75, onNoti: true, imgSource: require('../../assets/images/foodImg/caPheDenDa.png') },
    ]
  },
  {
    title: "Lunch", time: "07:00 am",
    dishs: [
      { id: '1', name: 'Phở Bò', time: "11:30 am", calo: 215, onNoti: false, imgSource: require('../../assets/images/foodImg/phoBo.png') },
      { id: '2', name: 'Cafe đen', time: "12:00 am", calo: 75, onNoti: false, imgSource: require('../../assets/images/foodImg/caPheDenDa.png') },
    ]
  },
  {
    title: "Dinner", time: "07:00 am",
    dishs: [
      { id: '1', name: 'Phở Bò', time: "19:00 pm", calo: 215, onNoti: false, imgSource: require('../../assets/images/foodImg/phoBo.png') },
      { id: '2', name: 'Cafe đen', time: "19:30 pm", calo: 75, onNoti: false, imgSource: require('../../assets/images/foodImg/caPheDenDa.png') },
    ]
  },
  {
    title: "Snack", time: "07:00 am",
    dishs: [
      { id: '1', name: 'Phở Bò', time: "22:00 am", calo: 215, onNoti: false, imgSource: require('../../assets/images/foodImg/phoBo.png') },
      { id: '2', name: 'Cafe đen', time: "23:00 am", calo: 75, onNoti: false, imgSource: require('../../assets/images/foodImg/caPheDenDa.png') },
    ]
  }
];

export const MealScreen = memo(props => {
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
  const [consumeList, setConsumeList] = useState(data1);
  const [mealTimeList, setMealTimeList] = useState(data2);

  const handlePress = useCallback(() => {
    Alert.alert('Ố la la', 'This feature is not implemented yet');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Giả lập độ trễ tải dữ liệu
      await new Promise(resolve => setTimeout(resolve, 1000));
      let mealScreenData = await updateDeviceStorage.getStoreData('MealScreenData');

      try {
        if (mealScreenData) {
          setMealTimeList(mealScreenData);
        } else {
          updateDeviceStorage.setStoreData('MealScreenData', mealTimeList);
        }
      } catch (error) {
        console.log(error);
      }

      const items = mealTimeList.map((meal) => {
        return {
          number: meal.dishs.length,
          totalCalo: meal.dishs.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.calo;
          }, 0),
        };
      });
      setMealTimeItems(items);
      if (consumeList && items) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: localized('Home'),
      // headerRight: () => (
      //   <View>
      //     <TouchableIcon
      //       imageStyle={{ tintColor: colorSet.primaryForeground }}
      //       iconSource={theme.icons.logout}
      //       onPress={onLogout}
      //     />
      //   </View>
      // ),
      // headerStyle: {
      //   backgroundColor: colorSet.primaryBackground,
      //   borderBottomColor: colorSet.hairline,
      //   height: 100,
      // },
      // headerTintColor: colorSet.primaryText,
    });
  }, [navigation, localized, colorSet, theme]);

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
        <View mt8>
          <Text h2 style={{ textAlign: 'center' }}>{localized('Nutrition')}</Text>
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
          <Text h3 style={{ fontWeight: "500" }}>{localized('Today')} | {localized('Nutritional Information')}</Text>
        </View>
        <ConsumeList data={consumeList} />
        {mealTimeItems.map((item, index) => (
          <React.Fragment key={index}>
            <HeadingBlock localized={localized} text={mealTimeList[index].title} text2={`${item.number} món | ${item.totalCalo} calories`} />
            <ItemList data={mealTimeList[index]} dataIndex={index} dataDeviceKey={'MealScreenData'} onPress={handlePress} iconPng={iconPng} />
          </React.Fragment>
        ))}
        <View>
          <NotifeeBtn containerStyles={{ width: Dimensions.get('window') * 0.3 }} />
        </View>
      </ScrollView>
    );
  }
});