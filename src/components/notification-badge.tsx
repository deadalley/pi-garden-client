import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS, PADDING } from '../styles';

export const NotificationBadge: React.FC = () => <View style={styles.badge} />;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: COLORS.RED,
    borderRadius: 360,
    position: 'absolute',
    top: PADDING.SMALLER,
    right: PADDING.SMALLER,
    height: 6,
    width: 6,
  },
});
