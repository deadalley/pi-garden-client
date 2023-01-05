import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, FONT_STYLES, PADDING, UiIcon } from '../styles';
import { useNavigation } from '@react-navigation/core';

const listItems = [
  { label: 'Sensor', route: 'AddPlant' },
  { label: 'Room', route: 'AddRoom' },
  { label: 'Plant', route: 'AddPlant' },
];

export const AddButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.button}>
          <UiIcon name="fi-rr-plus" size={30} color={COLORS.LIGHT} />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.outerModal}>
            <View style={styles.modal}>
              <FlatList
                data={listItems}
                keyExtractor={(item) => item.label}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ width: '100%' }}
                    onPress={() => {
                      navigation.navigate(item.route);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        ...FONT_STYLES.text,
                        fontSize: FONT_STYLES.h3.fontSize,
                        color: COLORS.MAIN_DARK,
                        alignSelf: 'center',
                        marginBottom: index < listItems.length - 1 ? 10 : 0,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  outerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: PADDING.SMALL,
  },
  modal: {
    padding: PADDING.SMALLER,
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT,
    margin: PADDING.SMALL,
    marginBottom: 100,
    borderRadius: BORDER_RADIUS,
    width: '100%',
    ...BOX_SHADOW,
  },
  button: {
    backgroundColor: COLORS.MAIN_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
    height: 54,
    width: 54,
    position: 'absolute',
    top: -30,
    left: Dimensions.get('window').width / 2 - 54 / 2,
  },
});
