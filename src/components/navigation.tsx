import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationButton } from './navigation-button';
import { PADDING } from '../styles';

export interface NavigationProps {
  hasPrevious?: boolean;
  hasNext?: boolean;
  canNext?: boolean;
  isLast?: boolean;
  currentIndex: number;
  finishLabel: string;
  skip?: boolean;
  setIndex: (value: number) => void;
  onFinish: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  hasNext,
  canNext,
  hasPrevious,
  isLast,
  currentIndex,
  finishLabel,
  skip,
  setIndex,
  onFinish,
}) => {
  return (
    <View
      style={[
        styles.navigation,
        !hasPrevious && styles.alignRight,
        !hasNext && !isLast && styles.alignLeft,
      ]}
    >
      {hasPrevious && (
        <NavigationButton onPress={() => setIndex(currentIndex - 1)}>Previous</NavigationButton>
      )}
      {hasNext && (
        <NavigationButton
          position="right"
          onPress={() => setIndex(currentIndex + (skip ? 2 : 1))}
          disabled={!canNext}
        >
          Next
        </NavigationButton>
      )}
      {isLast && (
        <NavigationButton position="right" onPress={onFinish}>
          {finishLabel}
        </NavigationButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING.SMALLER - 2,
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
});
