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
import { LinearGradient } from 'expo-linear-gradient';

import { BORDER_RADIUS, BOX_SHADOW, COLORS, FONT_STYLES, PADDING, UiIcon } from '../styles';

const listItems = ['Sensor', 'Room', 'Plant'];

export const AddButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.outerButton}>
          <LinearGradient
            start={{ x: 1, y: 0.46 }}
            end={{ x: 1, y: 0.47 }}
            locations={[0, 32]}
            colors={['rgba(0,0,0,0)', '#E2E2E2']}
            style={{
              borderRadius: 360,
              position: 'absolute',
              height: 69,
              width: 69,
            }}
          />
          <LinearGradient
            start={{ x: 1, y: 0.46 }}
            end={{ x: 1, y: 0.47 }}
            locations={[0, 32]}
            colors={['rgba(0,0,0,0)', '#F0F0F0']}
            style={{
              borderRadius: 360,
              position: 'absolute',
              height: 68,
              width: 68,
            }}
          />
          <LinearGradient colors={['#2C6975', '#1E4951']} style={styles.button}>
            <UiIcon name="fi-rr-plus" size={30} color={COLORS.LIGHT} />
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.outerModal}>
            <View style={styles.modal}>
              <FlatList
                data={listItems}
                keyExtractor={(item) => item}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={{ width: '100%' }}>
                    <Text
                      style={{
                        ...FONT_STYLES.h3,
                        color: COLORS.MAIN_MEDIUM,
                        alignSelf: 'center',
                        marginBottom: index < listItems.length - 1 ? 10 : 0,
                      }}
                    >
                      {item}
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
  outerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -32,
    left: Dimensions.get('window').width / 2 - 34,
    height: 68,
    width: 68,
    borderRadius: 360,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
    height: 54,
    width: 54,
  },
});
