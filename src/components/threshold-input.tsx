import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useField } from 'formik';

import { TextInput } from './text-input';
import { FONT_STYLES } from '../styles';

export interface ThresholdInputProps {
  label: string;
  unit: string;
  name: string;
}

export const ThresholdInput: React.FC<ThresholdInputProps> = (props) => {
  const [field] = useField(props as any);

  const { unit, label } = props;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        <TextInput
          name={`${field.name}.start`}
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  label: {
    ...FONT_STYLES.text,
    position: 'absolute',
  },
  input: {
    marginBottom: 4,
    flex: 0.48,
  },
});
