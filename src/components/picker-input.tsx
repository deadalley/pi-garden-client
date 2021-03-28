import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { COLORS, FONT_STYLES, PADDING } from '../styles';

export interface PickerInputProps {
  options: { label: string; value: any }[];
  initialValue?: any;
  onChange?: (option: any) => void;
}

export const PickerInput: React.FC<PickerInputProps> = ({ options, initialValue, onChange }) => (
  <View style={styles.wrapper}>
    <Picker
      style={styles.picker}
      itemStyle={styles.picker}
      onValueChange={onChange}
      mode="dropdown"
      selectedValue={initialValue ?? options[0].value}
    >
      {options.map((option) => (
        <Picker.Item {...option} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    height: 46,
    borderBottomColor: COLORS.MAIN_DARK,
    borderBottomWidth: 1,
    marginBottom: PADDING.SMALL,
  },
  picker: {
    ...FONT_STYLES.h2,
    marginHorizontal: 6,
    fontSize: 30,
    color: COLORS.MAIN_DARK,
    fontWeight: '800',
  },
});
