import React, { useState } from 'react';
import {
  Text,
  TextInput as NativeTextInput,
  StyleSheet,
  View,
  KeyboardTypeOptions,
} from 'react-native';
import { useField } from 'formik';

import { BORDER_RADIUS, COLORS, FONT_STYLES, PADDING } from '../styles';

export interface TextInputProps {
  autoCorrect?: boolean;
  style?: object;
  label?: string;
  unit?: string;
  inputType?: 'text' | 'number';
  keyboardType?: KeyboardTypeOptions;
  name: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  autoCorrect,
  style = {},
  label,
  unit,
  inputType = 'text',
  keyboardType,
  ...props
}) => {
  const [backgroundColor, setBackgroundColor] = useState(COLORS.LIGHT);
  const [field, meta, helpers] = useField(props as any);

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ ...styles.inputWrapper, backgroundColor }}>
        <NativeTextInput
          style={{ ...styles.input }}
          onChangeText={(value: string) => helpers.setValue(value, true)}
          onFocus={() => setBackgroundColor(COLORS.MAIN_LIGHT)}
          onBlur={() => setBackgroundColor(COLORS.LIGHT)}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          value={`${field.value ?? meta.initialValue}`}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      <Text style={styles.error}>{meta.error ?? meta.initialError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: PADDING.SMALL,
  },
  label: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
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
    borderTopLeftRadius: BORDER_RADIUS / 2,
    borderTopRightRadius: BORDER_RADIUS / 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: COLORS.MAIN_DARK,
    height: '100%',
    lineHeight: 36,
  },
  error: {
    ...FONT_STYLES.text,
    fontSize: 12,
    minHeight: 16,
    color: COLORS.RED,
    paddingLeft: PADDING.SMALLER,
  },
  unit: {
    fontSize: 18,
    color: COLORS.MAIN_DARK,
  },
});
