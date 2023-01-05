import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { iconList } from 'react-icomoon';
import { FlatGrid } from 'react-native-super-grid';

import furnitureIconSet from '../../assets/fonts/furniture-icons.json';

const IconSets = {
  furniture: furnitureIconSet,
};

import {
  BORDER_RADIUS,
  BOX_SHADOW,
  COLORS,
  FONT_STYLES,
  IconTypes,
  PADDING,
  UiIcon,
} from '../styles';
import { Avatar } from '../types';

export interface AvatarTileProps {
  Icon: React.ElementType;
  icon: Avatar;
  setIcon: (value: Avatar) => void;
}

export interface AvatarChooserProps {
  iconType: keyof typeof IconTypes;
  icon: Avatar;
  setIcon: (value: Avatar) => void;
}

const AvatarTile: React.FC<AvatarTileProps> = ({ Icon, icon, setIcon }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setIcon(icon)}>
      <View style={styles.avatarTile}>
        <Icon name={icon} color={COLORS.MAIN_DARK} size={40} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const AvatarChooser: React.FC<AvatarChooserProps> = ({ iconType, icon, setIcon }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const Icon = IconTypes[iconType];

  const availableIcons = iconList(IconSets[iconType as keyof typeof IconSets]);

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.avatarWrapper}>
          <Icon name={icon} color={COLORS.MAIN_DARK} size={60} />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>Choose a new avatar</Text>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.outerModal}>
          <View style={styles.scroll}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <UiIcon name="fi-rr-cross" color={COLORS.MAIN_DARK} size={20} />
              </TouchableOpacity>
            </View>
            <FlatGrid
              data={availableIcons}
              itemDimension={80}
              spacing={20}
              renderItem={({ item }) => (
                <AvatarTile
                  Icon={Icon}
                  icon={item}
                  setIcon={(icon) => {
                    setIcon(icon);
                    setModalVisible(false);
                  }}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PADDING.SMALL,
  },
  avatarWrapper: {
    backgroundColor: COLORS.MAIN_LIGHTER,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 140,
    borderRadius: BORDER_RADIUS,
  },
  text: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    marginTop: PADDING.SMALL,
  },
  avatarTile: {
    backgroundColor: COLORS.MAIN_LIGHTER,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: BORDER_RADIUS,
  },
  outerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    ...BOX_SHADOW,
    backgroundColor: COLORS.LIGHT,
    margin: PADDING.SMALL,
    borderRadius: BORDER_RADIUS,
  },
  modalHeader: {
    alignItems: 'flex-end',
    padding: PADDING.SMALLER,
  },
});
