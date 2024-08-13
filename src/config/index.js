import React, { useContext } from "react";
import { Platform } from "react-native";
import { useTranslations } from "../core/dopebase";
import {
  homeNavigationSvg,
  mentalNavigationSvg,
  statisticalNavigationSvg,
  mealNavigationSvg,
  workoutNavigationSvg,
} from '../assets/images/svg';

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForVietnameseNames = /^[a-zA-ZàáâãèéêẽìíîĩòóôõùúûũỳýỷỹđÀÁÂÃÈÉÊẼÌÍÎĨÒÓÔÕÙÚÛŨỲÝỶỸĐ\s]{2,25}$/;

const bodyImage1 = require('../assets/images/questionImages/body1.png');
const bodyImage2 = require('../assets/images/questionImages/body2.png');
const bodyImage3 = require('../assets/images/questionImages/body3.png');
const bodyImage4 = require('../assets/images/questionImages/body4.png');
const bodyImage5 = require('../assets/images/questionImages/body5.png');


export const ConfigContext = React.createContext({});

export const ConfigProvider = ({ children }) => {
  const { localized } = useTranslations();
  const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    isDelayedLoginEnabled: false,
    appIdentifier: `com.fitnessnutriapp.rn.${Platform.OS}`,
    facebookIdentifier: '471719465581703',
    webClientId:
      '309397476066-vvvchcvkoo5s8frns4sgqd7sb4cr4sn4.apps.googleusercontent.com',
    onboardingConfig: {
      welcomeTitle: localized('Thanks For Your Info\nHello There!'),
      welcomeCaption: localized(''),
      delayedLoginTitle: localized('Welcome back!'),
      delayedLoginCaption: localized(''),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/firebase-icon.png'),
          title: localized('Firebase'),
          description: localized(
            'Save weeks of hard work by using my codebase.',
          ),
        },
        {
          icon: require('../assets/icons/login-icon.png'),
          title: localized('Authentication & Registration'),
          description: localized(
            'Fully integrated login and sign up flows backed by Firebase.',
          ),
        },
        {
          icon: require('../assets/icons/sms-icon.png'),
          title: localized('SMS Authentication'),
          description: localized(
            'End-to-end SMS OTP verification for your users.',
          ),
        },
        {
          icon: require('../assets/icons/country-picker-icon.png'),
          title: localized('Country Picker'),
          description: localized('Country picker for phone numbers.'),
        },
        {
          icon: require('../assets/icons/reset-password-icon.png'),
          title: localized('Reset Password'),
          description: localized(
            'Fully coded ability to reset password via e-mail.',
          ),
        },
        {
          icon: require('../assets/images/instagram.png'),
          title: localized('Profile Photo Upload'),
          description: localized(
            'Ability to upload profile photos to Firebase Storage.',
          ),
        },
        {
          icon: require('../assets/images/pin.png'),
          title: localized('Geolocation'),
          description: localized(
            'Automatically store user location to Firestore via Geolocation API.',
          ),
        },
        {
          icon: require('../assets/images/notification.png'),
          title: localized('Notifications'),
          description: localized(
            'Automatically update and store push notification tokens into Firestore.',
          ),
        },
      ],
      // Add for app
      questionData: [
        {
          type: 'button', // 'button' or 'input'
          question: 'Mục đích của bạn là:',
          answers: [
            {
              id: '1',
              answer: 'Tăng cân',
            },
            {
              id: '2',
              answer: 'Giảm cân',
            },
            {
              id: '3',
              answer: 'Giữ dáng',
            },
            {
              id: '4',
              answer: 'Khỏe mạnh',
            },
          ],
        },
        {
          type: 'button',
          question: 'Giới tính của bạn là:',
          answers: [
            {
              id: '1',
              answer: 'Nam',
            },
            {
              id: '2',
              answer: 'Nữ',
            },
          ],
        },
        {
          type: 'input',
          question: 'Tuổi của bạn là:',
          answers: [
            {
              id: 'i1',
              unit: 'tuổi',
            },
          ],
        },
        {
          type: 'input',
          question: 'Chiều cao của bạn là:',
          answers: [
            {
              id: 'i2',
              unit: 'cm',
            },
          ],
        },
        {
          type: 'input',
          question: 'Cân nặng hiện tại:',
          answers: [
            {
              id: 'i3',
              unit: 'kg',
            },
          ],
        },
        {
          type: 'input',
          question: 'Cân nặng mục tiêu:',
          answers: [
            {
              id: 'i4',
              unit: 'kg',
            },
          ],
        },
        {
          type: 'select',
          question: 'Hình dáng cơ thể:',
          answers: [
            {
              id: '1',
              answer: 'Quả lê',
              bodyImage: bodyImage1,
            },
            {
              id: '2',
              answer: 'Tam giác ngược',
              bodyImage: bodyImage2,
            },
            {
              id: '3',
              answer: 'Quả chuối',
              bodyImage: bodyImage3,
            },
            {
              id: '4',
              answer: 'Quả táo',
              bodyImage: bodyImage4,
            },
            {
              id: '5',
              answer: 'Đồng hồ cát',
              bodyImage: bodyImage5,
            },
          ],
        },
        {
          type: 'form',
          question: 'Nguyên liệu dị ứng:',
          answers: [{ id: '1' }],
        },
        {
          type: 'button',
          question: 'Thời gian đạt được mục tiêu:',
          answers: [
            {
              id: '1',
              answer: '2 tháng',
            },
            {
              id: '2',
              answer: '3 tháng',
            },
            {
              id: '3',
              answer: '4 tháng',
            },
            {
              id: '4',
              answer: '6 tháng',
            },
            {
              id: '5',
              answer: '12 tháng',
            },
          ],
        },
      ],
      allergiesList: [
        'sữa bò',
        'trứng',
        'quả hạch',
        'đậu phộng',
        'lúa mì',
        'đậu nành',
        'cá',
      ],
      tabIcons: {
        Home: {
          focus: homeNavigationSvg(1),
          unFocus: homeNavigationSvg(0),
        },
        Meal: {
          focus: mealNavigationSvg(1),
          unFocus: mealNavigationSvg(0),
        },
        WorkOut: {
          focus: workoutNavigationSvg(1),
          unFocus: workoutNavigationSvg(0),
        },
        Mental: {
          focus: mentalNavigationSvg(1),
          unFocus: mentalNavigationSvg(0),
        },
        Statistical: {
          focus: statisticalNavigationSvg(1),
          unFocus: statisticalNavigationSvg(0),
        },
        // Add more tabs as needed
      },
    },
    tosLink: 'https://www.facebook.com/quachhuwng',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext);
