import React from 'react';
import { Text } from 'react-native';

import { COLORS, PADDING } from '../styles';

export const Bold: React.FC<{ style?: object }> = ({ children, style = {} }) => (
  <Text
    style={{
      fontFamily: 'Poppins_600SemiBold',
      fontWeight: '600',
      color: COLORS.MAIN_DARK,
      paddingHorizontal: PADDING.SMALLER - 2,
      ...style,
    }}
  >
    {children}
  </Text>
);
