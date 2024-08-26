import React, { memo } from "react";
import { View, Text } from "../../core/dopebase";
import { useTranslations } from "../../core/dopebase";
import { FlatList, StyleSheet } from "react-native";
import HeadingBlock from "../../components/HeadingBlock";


const Item = (props) => { // id, name, value, unit
  const { item, localized } = props;
  return (
    <View ph4 pv4 br4 style={{ backgroundColor: 'rgba(208, 201, 239, 1)' }}>
      <View style={styles.flexRow}>
        <Text>{localized(item.name)}</Text>
        <Text style={{ color: 'rgba(123, 111, 114, 1)' }}>{localized(item.value)} {item.unit}</Text>
      </View>
      <View mt3 br4 style={{ width: '100%', height: 15, backgroundColor: 'white' }}>
        <View br4 style={{ width: item.progress, height: 15, backgroundColor: 'rgba(197, 139, 242, 1)' }}></View>
      </View>
    </View>
  );
}

const ConsumeList = (props) => {
  const { data } = props;
  const { localized } = useTranslations();

  const renderItem = ({ item }) => {
    return <Item item={item} localized={localized} />;
  };

  return (
    <View mh4 mv4>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View ph2 pv2 />}

      />
    </View>
  );
};

export default memo(ConsumeList);

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});