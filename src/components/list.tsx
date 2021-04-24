import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SensorStatus } from '../types';
import { COLORS, FONT_STYLES, IconTypes, PADDING, UiIcon, ImageSets } from '../styles';
import { Status } from './sensor-status';

type Item = {
  label: string;
  smallLabel?: string;
  iconName?: string;
  iconType?: keyof typeof IconTypes;
  imageSet?: keyof typeof ImageSets;
  imageIndex?: number;
  href?: string;
  params?: object;
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
  const navigation = useNavigation();
  const {
    label,
    smallLabel,
    iconName,
    iconType,
    status,
    imageSet,
    imageIndex,
    href,
    params,
  } = props;

  let Element;
  if (iconName && iconType) {
    const Icon = IconTypes[iconType];
    Element = () => <Icon name={iconName} color={COLORS.MAIN_DARK} size={36} />;
  } else if (imageSet && imageIndex !== undefined) {
    const imageUrl = ImageSets[imageSet][imageIndex];
    Element = () => <Image style={styles.image} source={imageUrl} />;
  }

  if (!Element) return null;

  return (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => navigation.navigate('HomeNavigator', { screen: href, params })}
    >
      <View style={styles.alignLeft}>
        <Element />
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
  image: {
    width: 36,
    height: 50,
    resizeMode: 'center',
  },
});
