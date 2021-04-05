import React from 'react';
import { Text } from 'react-native';

import { COLORS, FONT_STYLES, PADDING } from '../styles';

export const Bold: React.FC = ({ children }) => (
  <Text
    style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_DARK, paddingHorizontal: PADDING.SMALLER - 2 }}
  >
    {children}
  </Text>
);
