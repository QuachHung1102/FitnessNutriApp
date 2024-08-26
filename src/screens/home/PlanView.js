import React from 'react';
import { useTranslations } from '../../core/dopebase';
import { View, Text, Button } from '../../core/dopebase';

const PlanView = ({ text, onPress }) => {
  const { localized } = useTranslations();
  return (
    <View ph5 mb3>
      <View mv3 pv4 ph5 br4 style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#CCCCCC",
      }}>
        <Text h3>{localized(text)}</Text>
        <Button text={localized("View")} onPress={onPress} radius={16} containerStyle={{
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 10,
          paddingBottom: 10
        }} />
      </View>
    </View>
  );
};

export default PlanView;