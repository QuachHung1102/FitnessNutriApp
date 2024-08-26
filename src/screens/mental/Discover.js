import React, { memo, useState } from "react";
import { View, Text, Alert, ImageR, IconButton, Button } from "../../core/dopebase";
import HeadingBlock from "../../components/HeadingBlock";
import { useTranslations, useTheme } from "../../core/dopebase";
import { Dimensions, FlatList, Pressable, StyleSheet } from "react-native";
import MusicList from "../../components/MusicList";

export const Discover = memo((props) => {
  const { data } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];

  const handlePress = () => {
    Alert.alert('Ố la la', 'This feature is not implemented yet')
  }
  const [active, setActive] = useState('1');

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed, }) => [{
          opacity: pressed ? 0.6 : 1,
        },
        styles.pressable]}
        onPress={() => setActive(item.id)}
      >
        <View style={styles.item}>
          <ImageR rounded={true} source={item.imgSource} style={active == item.id ? styles.activeImg : {}} />
          <Text mt1 bold>{localized(item.text1)}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View>
      <HeadingBlock localized={localized} text={"Discover"} onPress={handlePress} />
      <View ph5>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          ItemSeparatorComponent={<View style={{ width: width * 0.05 }}></View>}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View mh5 mv5 ph3 pv3
        style={[{
          backgroundColor: colorSet.componentBackground2,
          borderRadius: width * 0.04,
          alignItems: 'center',
          justifyContent: 'space-between',
        }, styles.flexRow]}
      >
        <View>
          <View>
            <Text>(Tiếp tục) <Text bold>Thở trị chứng khó ngủ</Text></Text>
          </View>
          <View mt2 style={styles.flexRow}>
            <Text ph1 br2 style={{ backgroundColor: colorSet.componentBackground2, borderWidth: 1 }}>22:00</Text>
            <Text ph1 br2 style={{ backgroundColor: colorSet.componentBackground2, borderWidth: 1 }}>Ngủ</Text>
            <Text ph1 br2 style={{ backgroundColor: colorSet.componentBackground2, borderWidth: 1 }}>Thở</Text>
          </View>
        </View>
        <IconButton tintColor={colorSet.primaryText} width={40} height={40} source={require('../../assets/icons/play-button.png')} />
      </View>
      <MusicList playBtn={true} />
      <View mb5 ph5>
        <Button
          containerStyle={styles.EmotionStatusBtn}
          textStyle={{}}
          text={localized('View More')}
          onPress={handlePress}
          styles
          secondary
          shadow
          loading={false}
        />
      </View>
    </View >
  )
});

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    alignItems: 'center',

  },
  flexRow: {
    flexDirection: 'row',
    columnGap: width * 0.02
  },
  activeImg: {
    borderWidth: 2,
    borderColor: "#5244F3",
    borderRadius: 100000,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
})