import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import {
  BORDER_RADIUS,
  BOX_SHADOW,
  COLORS,
  FONT_STYLES,
  PADDING,
  UiIcon,
  ImageSets,
} from '../styles';

export interface ImageTileProps {
  imageUrl: ImageSourcePropType;
  imageIndex: number;
  setAvatar: (index: number) => void;
}

export interface ImageChooserProps {
  imageSet: keyof typeof ImageSets;
  imageIndex: number;
  setAvatar: (index: number) => void;
}

const ImageTile: React.FC<ImageTileProps> = ({ imageUrl, imageIndex, setAvatar }) => {
  return (
    <TouchableWithoutFeedback onPress={() => setAvatar(imageIndex)}>
      <View style={styles.imageTile}>
        <Image style={styles.image} source={imageUrl} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ImageChooser: React.FC<ImageChooserProps> = ({ imageSet, imageIndex, setAvatar }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const imageUrl = ImageSets[imageSet][imageIndex];

  const availableImages = ImageSets[imageSet];

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={imageUrl} />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.text}>Choose a new image</Text>
      <Modal
        animationType="none"
        transparent
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
              data={availableImages}
              itemDimension={80}
              spacing={20}
              renderItem={({ item, index }) => (
                <ImageTile
                  imageIndex={index}
                  imageUrl={item}
                  setAvatar={(icon) => {
                    setAvatar(icon);
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
  imageWrapper: {
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
  imageTile: {
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
  image: {
    flex: 0.8,
    resizeMode: 'center',
  },
});
