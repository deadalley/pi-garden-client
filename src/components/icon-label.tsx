import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_STYLES, IconTypes } from '../styles';

export interface IconLabelProps {
  label: string;
  iconName: string;
  iconType: keyof typeof IconTypes;
  big?: boolean;
}

export const IconLabel: React.FC<IconLabelProps> = ({ label, iconName, iconType, big }) => {
  const Icon = IconTypes[iconType];

  return (
    <View style={styles.room}>
      <Icon name={iconName} color={COLORS.MAIN_DARK} size={big ? 42 : 30} />
      <Text style={styles.roomName}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  room: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  roomName: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
    textAlign: 'center',
    marginTop: 6,
  },
});
