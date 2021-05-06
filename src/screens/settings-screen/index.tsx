import React from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';

import { Screen } from '../../components/screen';
import { Switch } from '../../components/switch';
import { PickerInput } from '../../components/picker-input';

import { SessionService } from '../../services/session.service';

import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { NotificationSettingsOption } from '../../types';

const notificationOptions = [
  { label: 'All', value: NotificationSettingsOption.all },
  { label: 'Thresholds only', value: NotificationSettingsOption.threshold },
];

export const SettingsScreen: React.FC = () => (
  <Screen title="Settings">
    <Formik
      initialValues={{
        notificationSetting: NotificationSettingsOption.none,
        pinLock: false,
      }}
      onSubmit={(values) => {
        console.log('Submitting...', values);
      }}
    >
      {({ values }) => (
        <>
          <View style={{ ...styles.container, paddingTop: 0 }}>
            <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_MEDIUM }}>Notifications</Text>
            <Switch value={values.notificationSetting !== NotificationSettingsOption.none} />
          </View>

          <Text style={styles.label}>Notification type</Text>
          <PickerInput light name="notificationSetting" options={notificationOptions} />
          <Text style={styles.text}>
            You will only be notified when the sensor measurement crosses the defined threshold for
            the plant.
          </Text>

          <View style={{ ...styles.container }}>
            <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_MEDIUM }}>PIN Lock</Text>
            <Switch value={values.pinLock} />
          </View>

          <TouchableOpacity
            style={styles.container}
            onPress={() => SessionService.clearSession().then(() => Updates.reloadAsync())}
          >
            <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_MEDIUM }}>Clear data</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </Screen>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: PADDING.SMALLER,
  },
  label: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_MEDIUM,
  },
  text: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_MEDIUM,
  },
});
