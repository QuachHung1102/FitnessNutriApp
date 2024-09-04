import React, { memo } from 'react';
import { View } from '../View';
import { Text } from '../Text';
import Button from '../Button';
import { useDopebase } from '../../../theming';
import dynamicStyles from './styles';
import {
  onDisplayNotification,
  cancelNotification,
  cancelNotificationsByTag,
  onForegroundEventSubscribe,
  onBackgroundEventSubscribe,
  onCreateTriggerNotification
} from '../../../../../helpers/notifee';
import { Alert } from 'react-native';

async function handleCreateNotification(fn) {
  const isValid = await fn();
  if (isValid) {
    Alert.alert(`Thông báo đã được tạo thành công vào: `, isValid);
  } else {
    Alert.alert('Thời gian không hợp lệ!', 'Vui lòng chọn thời gian trong tương lai.');
  }
}

function NotifeeComponent(props) {
  const { containerStyles } = props;
  return (
    <View>
      <Button
        text="Display Notification"
        onPress={() => onDisplayNotification()}
        radius={16}
        loading={false}
        containerStyles={containerStyles}
      />
      <Button
        text="Cancelling a notification"
        onPress={() => cancelNotification('notification-id')}
        radius={16}
        loading={false}
        containerStyles={containerStyles}
      />
      <Button
        text="Creating a trigger notification"
        onPress={() => handleCreateNotification(onCreateTriggerNotification)}
        radius={16}
        loading={false}
        containerStyles={containerStyles}
      />
    </View>
  );
}

export default memo(useDopebase(NotifeeComponent, dynamicStyles));

