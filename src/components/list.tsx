import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import { SensorStatus } from '../types';
import { COLORS, FONT_STYLES, IconTypes, PADDING, UiIcon } from '../styles';
import { Status } from './sensor-status';

type Item = {
  label: string;
  smallLabel?: string;
  iconName: string;
  iconType: keyof typeof IconTypes;
  href?: string;
  status?: SensorStatus;
};

export interface ListItemProps {
  item: Item;
}

export interface ListProps {
  items: Item[];
  title?: string;
}

export const ListItem: React.FC<Item> = (props) => {
  const { label, smallLabel, iconName, iconType, status, href } = props;
  const Icon = IconTypes[iconType];

  return (
    <TouchableOpacity style={styles.itemWrapper}>
      <View style={styles.alignLeft}>
        <Icon name={iconName} color={COLORS.MAIN_DARK} size={36} />
        <View style={styles.labels}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.smallLabel}>{smallLabel}</Text>
        </View>
        {status && <Status status={status} style={{ top: 4, right: -12 }} />}
      </View>
      <UiIcon
        name={'fi-rr-angle-small-right'}
        size={38}
        color={COLORS.MAIN_DARK}
        style={{
          width: 26,
        }}
      />
    </TouchableOpacity>
  );
};

export const List: React.FC<ListProps> = ({ title, items }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <FlatList data={items} renderItem={({ item }) => <ListItem {...item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.h3,
    color: COLORS.MAIN_DARK,
    marginBottom: PADDING.SMALLER,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: PADDING.SMALL,
    marginBottom: PADDING.SMALL,
  },
  labels: {
    alignItems: 'flex-start',
    marginLeft: PADDING.SMALLER,
  },
  label: {
    ...FONT_STYLES.h4,
    color: COLORS.MAIN_DARK,
    lineHeight: 24,
  },
  smallLabel: {
    ...FONT_STYLES.text,
    color: COLORS.MAIN_DARK,
    lineHeight: 20,
  },
  alignLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
