import React, { memo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Image, View, Text, IconButton } from "../core/dopebase";
import { Pressable } from "react-native";
import playPng from "../assets/icons/play-button.png";

const MusicItem = (props) => {
  const { title, time, source, textStyle, playBtn, textTime, playedTime } = props;
  return (
    <Pressable>
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.imageStyles}>
          <View pv3 ph3 style={[playBtn
            ? { justifyContent: "space-between" }
            : { justifyContent: "flex-end" }, styles.contentContainer]}>
            {playBtn
              && <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}>
                <IconButton tintColor={'rgba(177, 177, 177, 1)'} onPress={() => { }} source={playPng} marginRight={0} width={18} height={18} />
                <Text h4 style={{ color: "rgba(177, 177, 177, 1)" }}>{playedTime}</Text>
              </View>}
            <View>
              <Text bold h3 style={textStyle}>{title}</Text>
              <Text h4 style={{ ...textStyle, textTransform: 'lowercase' }}>{time} {textTime}</Text>
            </View>
          </View>
        </Image>
      </View>
    </Pressable>
  );
};

export default memo(MusicItem);

const styles = StyleSheet.create({
  imageContainer: {
  },
  imageStyles: {
    width: Dimensions.get("window").width * 0.425,
    height: Dimensions.get("window").width * 0.425,
  },
  contentContainer: {
    alignItems: "left",
    height: '100%',
  },
});

