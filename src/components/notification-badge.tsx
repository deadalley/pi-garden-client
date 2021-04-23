import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PADDING } from '../styles';

export const NotificationBadge: React.FC<{ style?: object }> = ({ style = {} }) => (
  <View style={{ ...styles.badge, ...style }} />
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'red',
    borderRadius: 360,
    position: 'absolute',
    top: PADDING.SMALLER,
    right: PADDING.SMALLER,
    height: 6,
    width: 6,
  },
});
