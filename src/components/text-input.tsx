import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  TextInput as NativeTextInput,
  StyleSheet,
  View,
  KeyboardTypeOptions,
} from 'react-native';

import { COLORS, FONT_STYLES, PADDING } from '../styles';

export interface TextInputProps {
  onChange?: (text: string) => void;
  autoCorrect?: boolean;
  style?: object;
  label?: string;
  unit?: string;
  inputType?: 'text' | 'number';
  keyboardType?: KeyboardTypeOptions;
  min?: number;
  max?: number;
  required?: boolean;
  initialValue?: string | number;
}

export const TextInput: React.FC<TextInputProps> = ({
  onChange = () => {},
  autoCorrect,
  style = {},
  label,
  unit,
  inputType = 'text',
  keyboardType,
  min,
  max,
  required,
  initialValue,
}) => {
  const [inputValue, setInputValue] = useState<string | number>(initialValue ?? '');
  const [error, setError] = useState<string | undefined>();

  const onChangeText = useCallback(
    (value: string) => {
      if (required && (value === '' || value === undefined || value === null)) {
        setError('Required');
      }

      if (inputType === 'number') {
        if (/^[-+]?\d*$/.test(value) || !value) {
          console.log(label, value, min, max);
          if (value && min !== undefined && +value < min) {
            setError(`Must be more than ${min}`);
          } else if (value && max !== undefined && +value > max) {
            setError(`Must be less than ${max}`);
          } else {
            setError(undefined);
          }

          if (!(value === '' || value === undefined || value === null)) {
            onChange(value);
          }
          setInputValue(value);
        }
      } else {
        onChange(value);
        setInputValue(value);
      }
    },
    [inputType, min, max, required]
  );

  useEffect(() => {
    console.log('EFFECT');
    onChange(`${inputValue}`);
  }, [min, max]);

  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <NativeTextInput
          style={{ ...styles.input }}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          value={`${inputValue}`}
          onBlur={() => {
            if (
              required &&
              (inputValue === '' || inputValue === undefined || inputValue === null)
            ) {
              setError('Required');
            }
          }}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
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
    height: 14,
    color: COLORS.RED,
    paddingLeft: PADDING.SMALLER,
  },
  unit: {
    fontSize: 18,
    color: COLORS.MAIN_DARK,
  },
});
