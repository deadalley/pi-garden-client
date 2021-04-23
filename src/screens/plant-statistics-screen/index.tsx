import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { NavHeader } from '../../components/nav-header';
import { Screen } from '../../components/screen';
import { Chart } from '../../components/chart';
import { formatHour } from '../../utils/date';

import { PADDING } from '../../styles';
import { Plant, SensorName } from '../../types';

export const PlantStatisticsScreen: React.FC = () => {
  const route = useRoute();
  const { plant } = route.params as { plant: Plant };

  const data = [
    { timestamp: new Date('2021-04-08T00:00:00Z'), value: 50 },
    { timestamp: new Date('2021-04-08T01:00:00Z'), value: 10 },
    { timestamp: new Date('2021-04-08T02:00:00Z'), value: 40 },
    { timestamp: new Date('2021-04-08T03:00:00Z'), value: 95 },
    { timestamp: new Date('2021-04-08T04:00:00Z'), value: -4 },
    { timestamp: new Date('2021-04-08T05:00:00Z'), value: -24 },
    { timestamp: new Date('2021-04-08T06:00:00Z'), value: 85 },
    { timestamp: new Date('2021-04-08T07:00:00Z'), value: 91 },
    { timestamp: new Date('2021-04-08T08:00:00Z'), value: 35 },
    { timestamp: new Date('2021-04-08T09:00:00Z'), value: 53 },
    { timestamp: new Date('2021-04-08T10:00:00Z'), value: -53 },
    { timestamp: new Date('2021-04-08T11:00:00Z'), value: -20 },
  ];

  return (
    <Screen
      green
      title={'Statistics'}
      contentStyle={{ paddingHorizontal: PADDING.SMALL }}
      subTitle={plant.name}
    >
      {plant.room.sensors.map((sensor) => (
        <View style={{ marginBottom: 12 }}>
          <NavHeader small position="right" style={{ marginBottom: 6 }}>
            {SensorName[sensor.type]}
          </NavHeader>
          <Chart
            type="bar"
            data={data}
            hideYAxis
            formatLabel={(value) => `${value}ºC`}
            formatXAxisLabel={(item) => {
              return `${formatHour(item, true)}`;
            }}
          />
        </View>
      ))}
    </Screen>
  );
};
