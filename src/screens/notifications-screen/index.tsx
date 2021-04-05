import React from 'react';
import { FlatList } from 'react-native';

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
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.timestamp.toISOString()}
        renderItem={({ item }) => <NotificationCard {...(item as any)} />}
      />
    </Screen>
  );
};
