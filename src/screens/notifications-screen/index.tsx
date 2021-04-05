import React from 'react';
import { Text } from 'react-native';

import { NOTIFICATION } from '../../mocks';
import { Screen } from '../../components/screen';
import { NotificationCard } from './notification-card';

export const NotificationsScreen: React.FC = () => {
  const notifications = [
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
    NOTIFICATION,
  ];
  return (
    <Screen title="Notifications" contentStyle={{ paddingTop: 0, paddingRight: 0 }}>
      {notifications.map((notification) => (
        <NotificationCard {...(notification as any)} />
      ))}
    </Screen>
  );
};
