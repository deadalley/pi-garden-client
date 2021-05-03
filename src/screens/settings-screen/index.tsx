import React from 'react';
import * as Updates from 'expo-updates';

import { Screen } from '../../components/screen';
import { Button } from '../../components/button';

import { SessionService } from '../../services/session.service';

export const SettingsScreen: React.FC = () => (
  <Screen title="Settings">
    <Button
      small
      inverted
      onPress={() => SessionService.clearSession().then(() => Updates.reloadAsync())}
    >
      Clear data
    </Button>
  </Screen>
);
