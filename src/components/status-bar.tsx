import React, { Dispatch, SetStateAction, useState } from 'react';
import { createContext } from 'react';
import { StatusBar as NativeStatusBar, StatusBarStyle } from 'react-native';

export const StatusBarStyles: StatusBarStyle[] = ['default', 'dark-content', 'light-content'];

export const StatusBarContext = createContext<Dispatch<SetStateAction<StatusBarStyle>>>(() => {});

export const StatusBarProvider: React.FC = ({ children }) => {
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(StatusBarStyles[0]);

  return (
    <StatusBarContext.Provider value={setStatusBarStyle}>
      <NativeStatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
        barStyle={statusBarStyle}
      />
      {children}
    </StatusBarContext.Provider>
  );
};
