import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts"
import { View, Text, useTheme, useTranslations } from "../../core/dopebase";
import { Svg1, Svg2, Svg3, Svg4, Svg5, Svg6 } from "../../assets/images/svg/workoutItemSvg";

export default function WorkoutInfo() {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  const { localized } = useTranslations();
  const lineData = [{ value: 145 }, { value: 152 }, { value: 158 }, { value: 165 }, { value: 170 }, { value: 160 }];
  return (
    <View mb5>
      <View mv5 ph5 style={[styles.flexRow, styles.container]}>
        <View fx2 style={styles.contentLeft}>
          <View ph3 pv3
            style={[styles.itemStyle, { justifyContent: "space-between", height: width * 0.38, borderColor: colorSet.secondaryText }]}>
            <View style={[styles.flexRow, { alignItem: 'center' }]}>
              <Text h3>{localized('Calories')}</Text>
              <Svg1 color={1} />
            </View>
            <View>
              <Text h2 mv1>320</Text>
              <Text>Cal</Text>
            </View>
          </View>
          <View ph3 pv3 style={[styles.itemStyle, { justifyContent: "space-between", height: width * 0.38, borderColor: colorSet.secondaryText }]}>
            <View style={[styles.flexRow, { alignItem: 'center' }]}>
              <Text h3>{localized('Activities')}</Text>
              <Svg2 color={1} />
            </View>
            <View>
              <Text h2 mv1>2</Text>
              <Text>{localized('Activities')}</Text>
            </View>
          </View>
        </View>
        <View fx2 ph3 pv3 style={[styles.itemStyle, { justifyContent: "space-between", borderColor: colorSet.secondaryText }]}>
          <View style={[styles.flexRow, { alignItem: 'center' }]}>
            <Text h3>Thời gian</Text>
            <Svg3 color={1} />
          </View>
          <View style={{
            height: width * 0.4,
          }}>
            <LineChart
              curved
              initialSpacing={0}
              data={lineData}
              spacing={width * 0.06}
              hideDataPoints
              thickness={3}
              hideRules
              hideYAxisText
              yAxisColor="#5244F3"
              showVerticalLines={false}
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#5244F3"
              color="#5244F3"
              height={width * 0.38}
              width={width * 0.3}
            />
          </View>
          <View>
            <Text h1 mb1>45</Text>
            <Text>{localized('Minustes')}</Text>
          </View>
        </View>
      </View>
      <View mh5 style={[styles.flexRow, { justifyContent: 'space-between', columnGap: width * 0.125 }]}>
        <View fx3 pt3 style={styles.borderTop}>
          <Svg4 color={1} />
          <View mv1 style={{ flexDirection: "row", alignItems: 'center', columnGap: 5 }}>
            <Text h3>200</Text>
            <Text>Cal</Text>
          </View>
          <Text>Đạp xe</Text>
        </View>
        <View fx3 pt3 style={styles.borderTop}>
          <Svg5 color={1} />
          <View mv1 style={{ flexDirection: "row", alignItems: 'center', columnGap: 5 }}>
            <Text h3>120</Text>
            <Text>Cal</Text>
          </View>
          <Text>Đi bộ</Text>
        </View>
        <View fx3 pt3 style={styles.borderTopOff}>
          <Svg6 color={2} />
          <View mv1 style={{ flexDirection: "row", alignItems: 'center', columnGap: 5 }}>
            <Text h3>0</Text>
            <Text>Cal</Text>
          </View>
          <Text>Cardio</Text>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 16,
  },
  container: {
    height: width * 0.8,
  },
  contentLeft: {
    justifyContent: "space-between",
  },
  itemStyle: {
    borderWidth: 1,
    borderRadius: width * 0.05,
  },
  borderTop: {
    borderTopWidth: 4,
    borderColor: '#5244F3',
  },
  borderTopOff: {
    borderTopWidth: 4,
    borderColor: '#2C2C2E'
  }
})