import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 10,
    },
  })
}

export default styles
