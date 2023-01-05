import React from 'react';
import { FlatList } from 'react-native';
import { useStatefulResource } from '@rest-hooks/legacy';

import { Screen } from '../../components/screen';
import { AddRoomAction, FloatingActionButton } from '../../components/floating-action-button';
import { RoomItem } from './room-item';

import { Room } from '../../types';
import { RoomResource } from '../../resources';

export const RoomsScreen: React.FC = () => {
  const { data: rooms, loading } = useStatefulResource(RoomResource.list(), {});

  return (
    <>
      <Screen title={'Rooms'} withBottomPadFix={false} iconName="fi-rr-add">
        <FlatList
          data={[...(rooms ?? []), ...(rooms ?? [])]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RoomItem {...item} />}
          numColumns={2}
        />
      </Screen>
      <FloatingActionButton actions={[AddRoomAction]} />
    </>
  );
};
