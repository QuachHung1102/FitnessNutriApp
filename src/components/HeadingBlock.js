import React from "react";
import { View, Text } from "../core/dopebase";

const HeadingBlock = props => {
  const { localized, text } = props;
  return (
    <View>
      <Text h2 mv4 pl4>{localized(text)}</Text>
    </View>
  )
}

export default HeadingBlock;