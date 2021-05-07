import React from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Screen } from '../../components/screen';
import { AddRoomAction, FloatingActionButton } from '../../components/floating-action-button';
import { RoomItem } from './room-item';

import { Room } from '../../types';

export const RoomsScreen: React.FC = () => {
  const route = useRoute();
  const { rooms } = route.params as { rooms: Room[] };

  return (
    <>
      <Screen
        title={'Rooms'}
        contentStyle={{ paddingTop: 0, paddingRight: 0 }}
        withBottomPadFix={false}
      >
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RoomItem {...item} />}
        />
      </Screen>
      <FloatingActionButton actions={[AddRoomAction]} />
    </>
  );
};
