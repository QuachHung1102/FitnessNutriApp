import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../core/dopebase';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colorSet.primaryText,
      marginTop: 16,
      fontSize: 18,
    },
    image: {
      height: 128,
      width: 128,
      borderRadius: 64,
      marginTop: -320,
    },
    // Phần này không thuộc template
    
  })
}

export default dynamicStyles
