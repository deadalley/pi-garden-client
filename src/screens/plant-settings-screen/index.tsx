import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';

import { Screen } from '../../components/screen';
import { TextInput } from '../../components/text-input';
import { PickerInput } from '../../components/picker-input';
import { DateInput } from '../../components/date-input';
import { ThresholdInput } from '../../components/threshold-input';
import { Button } from '../../components/button';
import { ImagePicker } from '../../components/image-picker';
import { Bold } from '../../components/typography';

import { PlantExtended, SensorName, SensorType } from '../../types';
import { ROOM_MOCK_1, ROOM_MOCK_2 } from '../../mocks';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { renderSensors } from '../add-plant-screen/utils';

const SectionTitle: React.FC = ({ children }) => (
  <Text
    style={{
      ...FONT_STYLES.h3,
      color: COLORS.MAIN_DARK,
      marginLeft: PADDING.SMALLER,
      marginBottom: PADDING.SMALL,
    }}
  >
    {children}
  </Text>
);

export const PlantSettingsScreen: React.FC = () => {
  const route = useRoute();

  const rooms = [ROOM_MOCK_1, ROOM_MOCK_2];
  const { plant } = route.params as { plant: PlantExtended };

  return (
    <Formik
      initialValues={{ ...plant, soilMoistureSensor: 123, avatar: 0 }}
      onSubmit={(values) => {
        console.log('Submitting...', values);
        return;
      }}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Screen title={plant.name}>
          <TextInput name="name" label="Name" autoCorrect={true} />
          <PickerInput
            name="room"
            label="Room"
            options={rooms.map((room) => ({ label: room.name, value: room }))}
          />
          <DateInput label="Planted Date" name="plantedDate" max={new Date(plant.plantedDate)} />

          <SectionTitle>Sensors</SectionTitle>
          <Text
            style={{
              ...FONT_STYLES.text,
              color: COLORS.MAIN_DARK,
              marginBottom: PADDING.SMALL,
              paddingHorizontal: PADDING.SMALLER,
            }}
          >
            This plant is using the <Text>{renderSensors(plant.room)}</Text>{' '}
            {plant.room.sensors.length > 1 ? 'sensors' : 'sensor'} from{' '}
            <Bold>{plant.room.name}</Bold>
          </Text>
          {plant.room.sensors.some(({ type }) => type === SensorType.soil) && (
            <PickerInput
              name="soilMoistureSensor"
              label="Soil moisture sensor"
              options={plant.room.sensors
                .filter((sensor) => sensor.type === SensorType.soil)
                .map((sensor, index) => ({ label: `SM ${index + 1}`, value: sensor.id }))}
            />
          )}

          <SectionTitle>Thresholds</SectionTitle>
          {plant.room.sensors.map((sensor) => (
            <ThresholdInput
              name={`specification.${sensor.type}`}
              key={sensor.type}
              label={SensorName[sensor.type]}
              unit={sensor.unit}
              {...(sensor.type !== SensorType.temperature ? { min: 0, max: 100 } : {})}
            />
          ))}

          <SectionTitle>Plant Avatar</SectionTitle>
          <ImagePicker
            imageUrl={values.imageUrl}
            setAvatar={(value) => setFieldValue('avatar', value)}
            imageSet={'plants'}
          />

          <TouchableOpacity
            onPress={() => {
              console.log('Plant deleted');
              return;
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.h4,
                color: COLORS.RED,
                marginBottom: PADDING.SMALL,
                marginLeft: PADDING.SMALL,
              }}
            >
              Delete plant
            </Text>
          </TouchableOpacity>

          <Button small={true} onPress={() => submitForm()}>
            Save
          </Button>
        </Screen>
      )}
    </Formik>
  );
};
