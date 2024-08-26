import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "../core/dopebase";

const HeadingBlock = props => {
  const { localized, text, text2, onPress } = props;
  return (
    <View mv4 mh2 pl3 style={styles.container}>
      <Text h3>{localized(text)}</Text>
      {text2 &&
        onPress
        ? <TouchableOpacity onPress={onPress}><Text h4 bold pr4 style={styles.text2}>{localized(text2)}</Text></TouchableOpacity>
        : <Text h4 bold pr4 style={styles.text2}>{localized(text2)}</Text>
      }
    </View>
  )
}

export default memo(HeadingBlock);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text2: {
    fontWeight: 'normal',
  }
});