import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { COLORS, FONT_STYLES, PADDING } from '../styles';
import { useField } from 'formik';

export interface PickerInputProps {
  options: { label: string; value: any }[];
  name: string;
  label?: string;
  light?: boolean;
}

export const PickerInput: React.FC<PickerInputProps> = ({ options, label, light, ...props }) => {
  const [field, meta, helpers] = useField(props as any);

  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.label, ...(light ? styles.light : {}) }}>{label}</Text>
      <View style={{ ...styles.inputWrapper, ...(light ? styles.light : {}) }}>
        <Picker
          style={{ ...styles.picker, ...(light ? styles.light : {}) }}
          itemStyle={{ ...styles.picker, ...(light ? styles.light : {}) }}
          onValueChange={(value) => helpers.setValue(value)}
          mode="dropdown"
          selectedValue={field.value ?? meta.initialValue ?? options[0].value}
          dropdownIconColor={light ? COLORS.MAIN_MEDIUM : COLORS.MAIN_DARK}
        >
          {options.map((option) => (
            <Picker.Item {...option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.error}>{meta.error ?? meta.initialError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: PADDING.SMALL,
  },
  inputWrapper: {
    height: 46,
    borderBottomColor: COLORS.MAIN_DARK,
    borderBottomWidth: 1,
  },
  picker: {
    ...FONT_STYLES.h2,
    marginHorizontal: 6,
    fontSize: 30,
    color: COLORS.MAIN_DARK,
    fontWeight: '800',
  },
  label: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
    paddingHorizontal: PADDING.SMALLER,
    lineHeight: 18,
  },
  error: {
    ...FONT_STYLES.text,
    fontSize: 12,
    minHeight: 16,
    color: COLORS.RED,
    paddingLeft: PADDING.SMALLER,
  },
  light: {
    color: COLORS.MAIN_MEDIUM,
    borderBottomColor: COLORS.MAIN_MEDIUM,
  },
});
