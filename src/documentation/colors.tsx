import React from 'react';
import { Text, View } from 'react-native';

import { COLORS, FONT_STYLES } from '../styles';

export const Colors: React.FC = () => {
  return (
    <>
      {Object.keys(COLORS).map((color) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <View
            style={{ width: 60, height: 40, marginRight: 6, backgroundColor: COLORS[color] }}
          ></View>
          <Text style={FONT_STYLES.h3}>{color}</Text>
        </View>
      ))}
    </>
  );
};
