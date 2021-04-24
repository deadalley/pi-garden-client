import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Bold } from '../../components/typography';
import { Chart } from '../../components/chart';
import { Screen } from '../../components/screen';
import { Status } from '../../components/sensor-status';
import { Table } from '../../components/table';

import { Sensor, SensorName, SensorStatusMap } from '../../types';
import { formatDate, formatHour, formatTime } from '../../utils/date';
import { COLORS, FONT_STYLES, PADDING } from '../../styles';
import { useMemo } from 'react';

export const SensorScreen: React.FC = () => {
  const route = useRoute();

  const { sensor } = route.params as { sensor: Sensor };

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

  const columns = useMemo(() => [{ accessor: 'timestamp' }, { accessor: 'value' }], []);
  const tableData = useMemo(
    () =>
      data.map(({ timestamp, value }) => ({
        timestamp: formatTime(timestamp),
        value: `${value} ${sensor.unit}`,
      })),
    []
  );

  return (
    <Screen green title={SensorName[sensor.type]}>
      <View style={styles.statusWrapper}>
        <Text style={{ ...FONT_STYLES.text, fontSize: 24, color: COLORS.MAIN_DARK }}>
          Status: <Bold>{SensorStatusMap[sensor.status]}</Bold>
        </Text>
        <Status
          status={sensor.status}
          style={{ position: 'relative', width: 12, height: 12, marginBottom: 4 }}
        />
      </View>
      <View style={styles.marginBottom}>
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
      <Table columns={columns} data={tableData} hideHeaders />
    </Screen>
  );
};

const styles = StyleSheet.create({
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: PADDING.SMALL,
  },
  marginBottom: {
    marginBottom: PADDING.BIG,
  },
});
