import React from 'react';
import { FlatList } from 'react-native';

import { ROOM_MOCK_1, ROOM_MOCK_2 } from '../../mocks';

import { Screen } from '../../components/screen';
import { AddRoomAction, FloatingActionButton } from '../../components/floating-action-button';
import { RoomItem } from './room-item';

export const RoomsScreen: React.FC = () => {
  const rooms = [ROOM_MOCK_1, ROOM_MOCK_2, ROOM_MOCK_1, ROOM_MOCK_2];
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
