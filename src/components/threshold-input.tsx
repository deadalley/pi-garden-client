import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextInput } from './text-input';

export interface ThresholdInputProps {
  onChange?: (option: { start?: number; end?: number }) => void;
  label: string;
  unit: string;
  threshold: { start?: number; end?: number };
  min?: number;
  max?: number;
  inputType?: 'text' | 'number';
}

const calculateVariableMin = (fixedMin?: number, start?: number) => {
  if (fixedMin === undefined || fixedMin === null) {
    return start;
  }

  if (start === undefined || start === null) {
    return fixedMin;
  }

  return Math.min(fixedMin, start);
};

const calculateVariableMax = (fixedMax?: number, end?: number) => {
  if (fixedMax === undefined || fixedMax === null) {
    return end;
  }

  if (end === undefined || end === null) {
    return fixedMax;
  }

  return Math.max(fixedMax, end);
};

export const ThresholdInput: React.FC<ThresholdInputProps> = ({
  onChange = () => {},
  unit,
  label,
  threshold,
  min,
  max,
  inputType = 'number',
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        label={label}
        unit={unit}
        inputType={inputType}
        keyboardType="numeric"
        style={styles.input}
        onChange={(value) => onChange({ start: +value })}
        required
        initialValue={0}
        min={min}
        max={calculateVariableMax(max, threshold.end)}
      />
      <TextInput
        unit={unit}
        inputType={inputType}
        keyboardType="numeric"
        style={styles.input}
        onChange={(value) => onChange({ end: +value })}
        required
        initialValue={0}
        min={calculateVariableMin(min, threshold.start)}
        max={max}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 4,
    flex: 0.48,
  },
});
