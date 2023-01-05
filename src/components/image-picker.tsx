import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { Image } from './image';

import { BORDER_RADIUS, COLORS, FONT_STYLES, PADDING, UiIcon } from '../styles';
import { ImageSourcePropType } from 'react-native';
import Images from '../images';

export interface ImageTileProps {
  image: ImageSourcePropType;
  onImagePicked: (image: ImageSourcePropType) => void;
}

export interface ImagePickerProps {
  imageSet: keyof typeof Images;
  image?: ImageSourcePropType;
  onImagePicked: (image: ImageSourcePropType) => void;
}

const ImageTile: React.FC<ImageTileProps> = ({ image, onImagePicked }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onImagePicked(image)}>
      <View style={styles.imageTile}>
        <Image style={styles.image} image={image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ImagePicker: React.FC<ImagePickerProps> = ({ imageSet, image, onImagePicked }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const availableImages = Object.values(Images[imageSet]);

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.imageWrapper}>
          <UiIcon name="fi-rr-apps" color={COLORS.LIGHT} size={20} style={styles.icon} />
          <Image style={styles.image} image={image ?? availableImages[0]} />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={styles.outerModal}
      >
        <TouchableOpacity style={styles.modalHeader} onPress={() => setModalVisible(false)}>
          <UiIcon
            name="fi-rr-angle-left"
            color={COLORS.MAIN_DARK}
            size={20}
            style={styles.backButton}
          />
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <View style={styles.scroll}>
          <FlatGrid
            data={availableImages}
            itemDimension={200}
            spacing={20}
            renderItem={({ item }) => (
              <ImageTile
                image={item}
                onImagePicked={(icon) => {
                  onImagePicked(icon);
                  setModalVisible(false);
                }}
              />
            )}
          />
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
    height: 140,
    width: '100%',
    borderRadius: BORDER_RADIUS,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    borderRadius: BORDER_RADIUS,
  },
  icon: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    margin: PADDING.SMALL,
  },
  text: {
    ...FONT_STYLES.h4,
    flex: 0,
    color: COLORS.MAIN_DARK,
    alignSelf: 'flex-end',
  },
  imageTile: {
    backgroundColor: COLORS.MAIN_LIGHTER,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: '100%',
    borderRadius: BORDER_RADIUS,
  },
  outerModal: {
    backgroundColor: COLORS.LIGHT,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: COLORS.LIGHT,
  },
  backButton: {
    marginTop: 3,
    marginRight: PADDING.SMALLER / 2,
  },
  modalHeader: {
    paddingHorizontal: PADDING.SMALL,
    paddingBottom: PADDING.SMALL,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
