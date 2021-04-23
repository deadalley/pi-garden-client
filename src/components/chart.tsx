import React from 'react';
import { View } from 'react-native';
import { Defs, LinearGradient, Stop, G, Line, Text } from 'react-native-svg';
import {
  ChartProps as NativeChartProps,
  AreaChart as NativeAreaChart,
  BarChart as NativeBarChart,
  LineChart as NativeLineChart,
  XAxis,
  YAxis,
  GridProps,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';

import { COLORS } from '../styles';

export type Data = {
  timestamp: Date;
  value: number;
};

interface SharedChartProps extends NativeChartProps<Data> {
  data: Data[];
  formatLabel?: (value: number, index: number) => string;
  formatYAxisLabel?: (value: Date, index: number) => string;
  formatXAxisLabel?: (value: Date, index: number) => string;
  yTickCount?: number;
  hideYAxis?: boolean;
  hideXAxis?: boolean;
}

export interface ChartProps {
  data: SharedChartProps['data'];
  type: 'area' | 'bar' | 'line';
  formatLabel?: SharedChartProps['formatLabel'];
  formatYAxisLabel?: SharedChartProps['formatYAxisLabel'];
  formatXAxisLabel?: SharedChartProps['formatXAxisLabel'];
  yTickCount?: SharedChartProps['yTickCount'];
  hideYAxis?: SharedChartProps['hideYAxis'];
  hideXAxis?: SharedChartProps['hideXAxis'];
}

const CHART_HEIGHT = 240;

const yAxisContentInset = { top: 30, bottom: 26 };
const contentInset = { top: 30, bottom: 20, left: 6, right: 6 };
const xAxisContentInset = { left: 12, right: 12 };
const chartStyle = { flex: 1, height: CHART_HEIGHT, marginBottom: 8 };
const withYAxisStyle = { marginLeft: 6 };
const withXAxisStyle = { marginBottom: 22 };
const xAxisSvgStyle = {
  fontSize: 14,
  fontWeight: '800' as any,
  fill: COLORS.MAIN_DARK,
  originY: 30,
  y: 5,
};

const CustomGrid: React.FC<NativeChartProps<Data> & GridProps<Data>> = ({ x, y, data, ticks }) => (
  <G>
    {
      // Horizontal grid
      ticks?.map((tick: any) => (
        <Line
          key={tick}
          x1={'0%'}
          x2={'100%'}
          y1={y?.(tick)}
          y2={y?.(tick)}
          stroke={COLORS.MAIN_LIGHT}
          strokeDasharray="2"
          strokeDashoffset="3"
        />
      ))
    }
    {
      // Vertical grid
      data.map((_: any, index: number) => (
        <Line
          key={index}
          y1={'0%'}
          y2={'100%'}
          x1={x?.(index as any)}
          x2={x?.(index as any)}
          stroke={COLORS.MAIN_LIGHT}
          strokeDasharray="2"
          strokeDashoffset="3"
        />
      ))
    }
  </G>
);

const Labels: React.FC<GridProps<Data> & SharedChartProps & { bandwidth?: number }> = ({
  x,
  y,
  data,
  bandwidth,
  formatLabel,
}) => (
  <>
    {data.map((item: Data, index: number) => (
      <Text
        key={index}
        x={x?.(index as any) ?? 0 + (bandwidth ?? 0) / 2}
        y={item.value > 0 ? (y?.(item.value as any) ?? 0) - 15 : (y?.(item.value as any) ?? 0) + 15}
        fontSize={12}
        fontWeight={'800'}
        fill={COLORS.MAIN_MEDIUM}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
      >
        {formatLabel?.(item.value, index) ?? item.value}
      </Text>
    ))}
  </>
);

const AreaGradient = () => (
  <Defs key={'areagradient'}>
    <LinearGradient id={'areagradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={COLORS.MAIN_MEDIUM} />
      <Stop offset={'100%'} stopColor={COLORS.MAIN_MEDIUM} stopOpacity={0} />
    </LinearGradient>
  </Defs>
);

const BarGradient = () => (
  <Defs key={'bargradient'}>
    <LinearGradient id={'bargradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={COLORS.MAIN_MEDIUM} stopOpacity={0.6} />
      <Stop offset={'100%'} stopColor={COLORS.MAIN_DARK} />
    </LinearGradient>
  </Defs>
);

const LineGradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
      <Stop offset={'0%'} stopColor={COLORS.MAIN_DARK} />
      <Stop offset={'100%'} stopColor={COLORS.MAIN_MEDIUM} />
    </LinearGradient>
  </Defs>
);

const LineChart: React.FC<SharedChartProps> = (props) => {
  return (
    <NativeLineChart {...props} svg={{ stroke: 'url(#gradient)' }}>
      <CustomGrid data={props.data} belowChart />
      <LineGradient />
    </NativeLineChart>
  );
};

const AreaChart: React.FC<SharedChartProps> = (props) => {
  return (
    <NativeAreaChart
      {...props}
      svg={{
        stroke: COLORS.MAIN_MEDIUM,
        fill: COLORS.MAIN_MEDIUM,
        fillOpacity: 0.3,
      }}
    >
      <CustomGrid data={props.data} belowChart />
    </NativeAreaChart>
  );
};

const BarChart: React.FC<SharedChartProps> = (props) => {
  return (
    <NativeBarChart
      {...props}
      svg={{
        fill: COLORS.MAIN_MEDIUM,
      }}
    >
      <CustomGrid data={props.data} belowChart />
      <Labels data={props.data} />
    </NativeBarChart>
  );
};

export const Chart: React.FC<ChartProps> = ({ type, ...props }) => {
  let ChartComponent = null;
  switch (type) {
    case 'area':
      ChartComponent = AreaChart;
      break;
    case 'bar':
      ChartComponent = BarChart;
      break;
    case 'line':
      ChartComponent = LineChart;
      break;
    default:
      throw new Error('Invalid chart component type');
  }

  if (!ChartComponent) throw new Error('Invalid chart component type');

  const { hideXAxis, hideYAxis, data, yTickCount, formatXAxisLabel, formatYAxisLabel } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      {!hideYAxis && (
        <YAxis
          style={{ ...(hideXAxis ? {} : withXAxisStyle) }}
          data={data}
          contentInset={yAxisContentInset}
          svg={{ fontSize: 14, fill: COLORS.MAIN_DARK }}
          numberOfTicks={yTickCount}
          formatLabel={formatYAxisLabel}
          yAccessor={({ item }) => item.value}
        />
      )}
      <View style={{ flex: 1, height: CHART_HEIGHT }}>
        <ChartComponent
          {...props}
          style={{
            ...chartStyle,
            ...(hideYAxis ? {} : withYAxisStyle),
          }}
          data={data}
          contentInset={contentInset}
          curve={shape.curveNatural}
          yAccessor={({ item }) => item.value}
          xAccessor={({ index }) => index}
        />
        {!hideXAxis && (
          <XAxis
            data={data}
            formatLabel={formatXAxisLabel}
            scale={scale.scaleTime}
            numberOfTicks={8}
            contentInset={xAxisContentInset}
            svg={xAxisSvgStyle}
            xAccessor={({ item }) => item.timestamp}
          />
        )}
      </View>
    </View>
  );
};
