import React from 'react';
import {
  FlatList,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import { SensorStatus } from '../types';
import { COLORS, FONT_STYLES, IconTypes, PADDING, UiIcon } from '../styles';

import { Image } from './image';
import { Status } from './sensor-status';

type Item = {
  label: string;
  smallLabel?: string;
  iconName?: string;
  iconType?: keyof typeof IconTypes;
  image?: ImageSourcePropType;
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
  emptyMessage?: string;
}

export const ListItem: React.FC<Item> = (props) => {
  const { label, smallLabel, iconName, iconType, status, image, href, params } = props;

  let Element;
  if (iconName && iconType) {
    const Icon = IconTypes[iconType];
    Element = () => <Icon name={iconName} color={COLORS.MAIN_DARK} size={36} />;
  } else if (image !== undefined) {
    Element = () => <Image style={styles.image} image={image} />;
  }

  return (
    <TouchableOpacity style={styles.itemWrapper}>
      <View style={styles.alignLeft}>
        {Element && <Element />}
        <View style={styles.labels}>
          <Text style={[FONT_STYLES.h4, styles.label]}>{label}</Text>
          <Text style={[FONT_STYLES.text, styles.smallLabel]}>{smallLabel}</Text>
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

export const List: React.FC<ListProps> = ({ title, items, emptyMessage }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={[FONT_STYLES.h3, styles.title]}>{title}</Text>
      {items.length ? (
        <FlatList data={items} renderItem={({ item }) => <ListItem {...item} />} />
      ) : (
        <Text style={[FONT_STYLES.text, styles.empty]}>{emptyMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
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
    color: COLORS.MAIN_DARK,
    lineHeight: 24,
  },
  smallLabel: {
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
  empty: {
    color: COLORS.MAIN_DARK,
    marginBottom: PADDING.SMALL,
    marginLeft: PADDING.SMALL,
  },
});
