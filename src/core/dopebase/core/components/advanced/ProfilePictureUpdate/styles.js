import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window')
const imageSize = height * 0.06
const photoIconSize = imageSize * 0.2

const dynamicStyles = (theme, colorScheme) => {
  return StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    cameraIcon: {
      width: 16,
      height: 16,
      tintColor: 'white',
    },
    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d6d6d6',
      opacity: 0.8,
      zIndex: 2,
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },
    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15,
      backgroundColor: theme.colors[colorScheme].grey6,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
  })
}

export default dynamicStyles
