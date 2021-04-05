import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import { TextInput } from './text-input';

export interface ThresholdInputProps {
  label: string;
  unit: string;
  name: string;
}

export const ThresholdInput: React.FC<ThresholdInputProps> = (props) => {
  const [field] = useField(props as any);

  const { unit, label } = props;

  return (
    <View style={styles.wrapper}>
      <TextInput
        name={`${field.name}.start`}
        label={label}
        unit={unit}
        inputType={'number'}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        name={`${field.name}.end`}
        unit={unit}
        inputType={'number'}
        keyboardType="numeric"
        style={styles.input}
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
