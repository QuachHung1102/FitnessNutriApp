import React, { memo } from "react";
import { View, Text } from "../../core/dopebase";
import HeadingBlock from "../../components/HeadingBlock";
import { useTranslations, useTheme } from "../../core/dopebase";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { GifImage } from "../../assets/gifs/GifImage";


export const EmotionChart = memo((props) => {
  const { emotionData } = props;
  const { localized } = useTranslations();
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemEmo}>
        <View mb5 br4 style={[styles.containerItem, { backgroundColor: 'rgba(238, 228, 255, 1)', }]}>
          <View br4
            style={[{ height: item.emo, backgroundColor: item.color, alignItems: 'center' }]}
          >
            <GifImage source={item.img} style={styles.gifStyle} />
          </View>
        </View>
        <Text style={styles.textCenter} >{item.time}</Text>
      </View>
    )
  }

  return (
    <View mt3 br5 style={[styles.container, { backgroundColor: colorSet.componentBackground }]}>
      <HeadingBlock localized={localized} text={"Emotion Chart"} />
      <View fx1 style={styles.flexRow}>
        <FlatList
          data={emotionData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View pv2 style={{ width: width * 0.15 }} />}
          style={{ paddingHorizontal: width * 0.1 }}
        />
      </View>
    </View>
  );
});

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: '100%'
  },
  container: {
    height: height * 0.4,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  containerItem: {
    height: '70%',
    width: width * 0.07,
    justifyContent: 'flex-end',
  },
  itemEmo: {
    alignItems: 'center',

  },
  textCenter: {
    textAlign: 'center',
  },
  gifStyle: {
    width: width * 0.07,
    height: width * 0.07
  }
});