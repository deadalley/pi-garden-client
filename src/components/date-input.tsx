import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { COLORS, FONT_STYLES, PADDING } from '../styles';
import { formatDate } from '../utils/date';

export interface DateInputProps {
  date?: Date;
  mode?: string;
  required?: boolean;
  style?: object;
  label?: string;
  min?: Date;
  max?: Date;
}

export const DateInput: React.FC<DateInputProps> = ({
  date: initialDate,
  mode,
  required,
  style,
  label,
  min,
  max,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState(initialDate ?? new Date());
  const [error, setError] = useState<string | undefined>();

  const onChange = (_: any, selectedDate?: Date) => {
    if (selectedDate === undefined) setVisible(false);
    if (required && !selectedDate) setError('Required');

    const currentDate = selectedDate || date;
    setVisible(false);
    setDate(currentDate);
  };

  return (
    <>
      <View style={{ ...styles.wrapper, ...style }}>
        <Text style={styles.label}>{label}</Text>
        <Text onPress={() => setVisible(true)} style={styles.inputWrapper}>
          {formatDate(date)}
        </Text>
        <Text style={styles.error}>{error}</Text>
      </View>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode as any}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={min}
          maximumDate={max}
          on
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
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: COLORS.MAIN_DARK,
    borderBottomWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: PADDING.SMALLER,
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
});
