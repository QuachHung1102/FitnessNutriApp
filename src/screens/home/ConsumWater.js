import React, { memo, useState } from "react";
import { View, IconButton } from "../../core/dopebase";
import { ScrollView } from "react-native-gesture-handler";
import glass from "../../assets/icons/glass.png";
import glassFull from "../../assets/icons/glassFull.png";

const ConsumWater = () => {
  const [waterL, setWaterL] = useState(0);

  return (
    <View fx1 mt3 mb4 mh2 style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
      <IconButton onPress={setWaterL} source={glass} marginRight={8} width={28} height={36} />
    </View>
  )
}

export default memo(ConsumWater);