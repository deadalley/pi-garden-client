import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
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
  const [backgroundColor, setBackgroundColor] = useState(COLORS.HALF_LIGHT);

  const handleOnChange = (selectedDate?: Date) => {
    if (selectedDate === undefined) return;

    setVisible(false);
    helpers.setValue(selectedDate ?? new Date(), true);
  };

  return (
    <>
      <View style={{ ...styles.wrapper, ...style }}>
        <Text style={styles.label}>{label}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(true);
            setBackgroundColor(COLORS.MAIN_LIGHT);
          }}
        >
          <View style={styles.inputWrapper}>
            <Text style={{ ...styles.input, backgroundColor }}>
              {formatDate(field.value ?? meta.initialValue)}
            </Text>
            <UiIcon name="fi-sr-triangle" size={12} color={COLORS.MAIN_DARK} style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.error}>{meta.error}</Text>
      </View>
      <DatePicker
        modal
        open={visible}
        date={new Date()}
        onConfirm={(date) => {
          setVisible(false);
          handleOnChange(date);
          setBackgroundColor(COLORS.HALF_LIGHT);
        }}
        onCancel={() => {
          setBackgroundColor(COLORS.HALF_LIGHT);
          setVisible(false);
        }}
      />
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
    transform: [{ rotate: '180deg' }, { scaleY: 0.9 }],
  },
});
