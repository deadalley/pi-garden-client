import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Screen } from '../../components/screen';
import { NotificationCard } from './notification-card';

import { Plant } from '../../types';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';

export const NotificationsScreen: React.FC = () => {
  const route = useRoute();
  const { plant, hasNotification } = (route.params || {}) as {
    plant?: Plant;
    hasNotification: boolean;
  };

  return (
    <Screen
      title="Notifications"
      contentStyle={{ paddingTop: 0, paddingRight: 0 }}
      withBottomPadFix={false}
      contentContainerStyle={hasNotification ? {} : styles.noNotificationsContainer}
    >
      {!hasNotification ? (
        <Text style={styles.noNotifications}>
          No notifications {plant ? `for ${plant.name}` : ''}
        </Text>
      ) : (
        <FlatList
          data={plant?.notifications || []}
          keyExtractor={(item) => item.timestamp.toISOString()}
          renderItem={({ item }) => <NotificationCard {...(item as any)} />}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  noNotificationsContainer: {
    flex: 0.8,
    padding: PADDING.BIG,
    justifyContent: 'center',
  },
  noNotifications: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_MEDIUM,
    textAlign: 'center',
  },
});
