import React from 'react';
import { FlatList } from 'react-native';

import { RoomCard } from '../../components/room-card';
import { Room } from '../../types';
import { PADDING } from '../../styles';

export interface RoomsProps {
  rooms: Room[];
}

export const Rooms: React.FC<RoomsProps> = ({ rooms }) => (
  <FlatList
    horizontal
    data={rooms}
    renderItem={({ item, index }) => (
      <RoomCard
        room={item}
        style={{
          ...(index === 0
            ? { marginLeft: PADDING.BIGGER, marginRight: PADDING.SMALLER }
            : index < rooms.length - 1
            ? { marginRight: PADDING.SMALLER }
            : { marginRight: PADDING.SMALL }),
        }}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);
