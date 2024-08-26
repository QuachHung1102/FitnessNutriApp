import React from "react";
import { View, ImageR } from "../../core/dopebase";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const GifImage = (props) => {
  const { style, rounded, source } = props;
  return (
    <View>
      <ImageR
        style={style}
        rounded={false}
        source={source}
      />
    </View>
  );
};
