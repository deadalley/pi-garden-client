import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/button';

import {
  COLORS,
  FONT_STYLES,
  NatureIcon,
  PADDING,
  UiIcon,
  FurnitureIcon,
  WeatherIcon,
} from '../../styles';

export interface Screen8Props {
  onFinish: () => void;
}

export const Screen8: React.FC<Screen8Props> = ({ onFinish }) => (
  <>
    <View style={styles.wrapper}>
      <Text style={{ ...styles.text, ...FONT_STYLES.h2, marginBottom: PADDING.SMALL }}>
        Congratulations!
      </Text>
      <Text style={styles.text}>
        PiGarden was successfully configured!
        {'\n\n'}
        You can now:
      </Text>
      <NatureIcon name="flower-2" size={46} color={COLORS.MAIN_DARK} />
      <Text style={styles.smallText}>Add a new plant and grow your garden</Text>
      <UiIcon name="fi-rr-bell" size={38} color={COLORS.MAIN_DARK} />
      <Text style={styles.smallText}>Customize your notifications</Text>
      <FurnitureIcon name="tv-set" size={48} color={COLORS.MAIN_DARK} />
      <Text style={styles.smallText}>Add more rooms</Text>
      <WeatherIcon name="thermometer-2" size={40} color={COLORS.MAIN_DARK} />
      <Text style={styles.smallText}>Add more sensors</Text>
    </View>
    <Button small dark onPress={() => onFinish()}>
      Start PiGarden
    </Button>
  </>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: PADDING.SMALL,
  },
  smallText: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
    marginVertical: PADDING.SMALLER,
  },
});
