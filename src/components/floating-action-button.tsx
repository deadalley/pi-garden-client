import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';

import { COLORS, FONT_STYLES, IconTypes, UiIcon } from '../styles';

interface Action {
  label: string;
  navigate: (navigation: ReturnType<typeof useNavigation>) => void;
  iconName: string;
  iconType: keyof typeof IconTypes;
}

export interface FloatingActionButtonProps {
  actions: Action[];
}

export const AddPlantAction: Action = {
  label: 'Plant',
  iconType: 'nature',
  iconName: 'plant',
  navigate: (navigation) => navigation.navigate('AddPlant'),
};

export const AddRoomAction: Action = {
  label: 'Room',
  iconType: 'furniture',
  iconName: 'dinning-table',
  navigate: (navigation) => navigation.navigate('AddRoom'),
};

export const AddSensorAction: Action = {
  label: 'Sensor',
  iconType: 'ui',
  iconName: 'fi-rr-eye-dropper',
  navigate: (navigation) => navigation.navigate('AddSensor'),
};

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ actions }) => {
  const navigation = useNavigation();

  return (
    <ActionButton
      fixNativeFeedbackRadius={true}
      hideShadow={false}
      buttonColor={COLORS.MAIN_DARK}
      renderIcon={() => <UiIcon name="fi-rr-plus-small" size={52} color={COLORS.LIGHT} />}
      shadowStyle={styles.shadow}
    >
      {actions.map(({ label, navigate, iconName, iconType }) => {
        const Icon = IconTypes[iconType];

        return (
          <ActionButton.Item
            size={50}
            buttonColor={COLORS.MAIN_MEDIUM}
            title={label}
            onPress={() => navigate(navigation)}
            hideLabelShadow={true}
            textContainerStyle={styles.labelContainer}
            textStyle={{ ...FONT_STYLES.text, color: COLORS.MAIN_MEDIUM }}
          >
            <Icon name={iconName} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        );
      })}
    </ActionButton>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
  shadow: {
    shadowColor: COLORS.DARK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 6,
  },
  labelContainer: {
    marginRight: -12,
  },
});
