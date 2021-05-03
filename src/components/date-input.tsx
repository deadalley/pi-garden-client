import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useField } from 'formik';

import { COLORS, FONT_STYLES, PADDING, UiIcon } from '../styles';
import { formatDate } from '../utils/date';

export interface DateInputProps {
  mode?: string;
  style?: object;
  label?: string;
  min?: Date;
  max?: Date;
  name: string;
}

export const DateInput: React.FC<DateInputProps> = ({ mode, style, label, min, max, ...props }) => {
  const [field, meta, helpers] = useField(props as any);
  const [visible, setVisible] = useState<boolean>(false);

  const handleOnChange = (_: any, selectedDate?: Date) => {
    if (selectedDate === undefined) return;

    setVisible(false);
    helpers.setValue(selectedDate ?? new Date(), true);
  };

  return (
    <>
      <View style={{ ...styles.wrapper, ...style }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
          <Text onPress={() => setVisible(true)} style={styles.input}>
            {formatDate(field.value ?? meta.initialValue)}
          </Text>
          <UiIcon name="fi-rr-caret-down" size={22} color={COLORS.MAIN_DARK} />
        </View>
        <Text style={styles.error}>{meta.error}</Text>
      </View>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={field.value ?? meta.initialValue}
          mode={mode as any}
          is24Hour={true}
          display="default"
          onChange={handleOnChange}
          minimumDate={min}
          maximumDate={max}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: PADDING.SMALL,
  },
  label: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
    paddingHorizontal: PADDING.SMALLER,
    lineHeight: 18,
  },
  inputWrapper: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.MAIN_DARK,
    borderBottomWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: PADDING.SMALLER,
  },
  input: {
    fontSize: 18,
    color: COLORS.MAIN_DARK,
    lineHeight: 36,
  },
  error: {
    ...FONT_STYLES.text,
    fontSize: 12,
    height: 14,
    color: COLORS.RED,
    paddingLeft: PADDING.SMALLER,
  },
  icon: {
    paddingTop: 8,
  },
});
