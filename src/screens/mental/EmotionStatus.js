import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, Button } from "../../core/dopebase";
import { useTranslations, useTheme } from "../../core/dopebase";
import { Dimensions, FlatList, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { GifImage } from "../../assets/gifs/GifImage";

export default memo(function EmotionStatus(props) {
  const { localized, onPress } = props
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];

  const [truncateStatus, setTruncateStatus] = useState(false);
  const [truncateValue, setTruncateValue] = useState(22);
  const toggleTruncStatus = () => setTruncateStatus(!truncateStatus);

  useEffect(() => {
    if (truncateStatus) {
      setTruncateValue(100);
    } else {
      setTruncateValue(22);
    }
  }, [truncateStatus])

  return (
    <View mb5 ph5 pv5 br4 style={[styles.container, { backgroundColor: colorSet.componentBackground2 }]} >
      <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
        <View style={styles.flexRow}>
          <GifImage
            source={require('../../assets/gifs/tucGian.gif')}
            style={styles.gifStyle}
          />
          <View ml2>
            <Text h3>Tệ</Text>
            <Text>13:34</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Text bold>{localized('Edit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View mt4>
        <View>
          <Text>Bạn cảm thấy: <Text bold>Thất vọng</Text></Text>
        </View>
        <View>
          <Text>Bởi vì: <Text bold>Bạn bè</Text></Text>
        </View>
        <View mv2>
          <Text bold>Ghi chú: </Text>
          <Text truncateTextNumber={truncateValue} style={{ fontWeight: 'medium', }}>Ngày hôm nay trở nên thật tệ cho tới chiều nay. Mình cảm thấy thật thất vọng vì Mai đã thất hứa và quên mất lời hẹn cho buổi đi chơi cùng mình.</Text>
          <Pressable
            style={({ pressed }) => [{
              opacity: pressed ? 0.6 : 1,
            },
            styles.pressable]}
            onPress={toggleTruncStatus}
          >
            <Text bold>{localized('View More')}...</Text>
          </Pressable>
        </View>
        <View>
          <Text pt1 bold>Giữ bình tĩnh</Text>
          <Text>Hít thở sâu và giữ bình tĩnh để đặt mình vào vị trí của người khác</Text>
        </View>
      </View>
      <View mv5 ph4>
        <Button
          containerStyle={styles.EmotionStatusBtn}
          textStyle={{}}
          text={localized('View More')}
          onPress={onPress}
          styles
          secondary
          shadow
          loading={false}
        />
      </View>
    </View>
  )
});

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gifStyle: {
    width: width * 0.15,
    height: width * 0.15,
  },
  container: {
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  pressable: {
    alignSelf: 'flex-start', // Đảm bảo phần tử chỉ chiếm không gian cần thiết
    flexShrink: 1, // Cho phép phần tử co lại nếu cần thiết
    paddingVertical: height * 0.005
  },
})