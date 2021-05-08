import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Spinner } from '../components/spinner';

import { COLORS, FONT_STYLES, PADDING } from '../styles';

export interface ConnectApiProps {
  executeOnMount?: (() => Promise<any>)[];
  reloadOnFocus?: boolean;
}

const ConnectApi: React.FC<ConnectApiProps & { Component: React.ElementType }> = ({
  executeOnMount,
  reloadOnFocus,
  Component,
  ...props
}) => {
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(!!(executeOnMount && executeOnMount.length));
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  console.log({ reload, reloadOnFocus });
  useFocusEffect(() => {
    console.log('focus', reload);
    if (reloadOnFocus) {
      setReload(!reload);
    }
  });

  useEffect(() => {
    console.log('effect');
    if (executeOnMount && executeOnMount.length) {
      Promise.resolve()
        .then(() => setIsLoading(true))
        .then(() => Promise.all(executeOnMount.map((fn) => fn())))
        .then((res: any) => {
          console.log({ res });
          return setResponse(res.reduce((acc: object, r: object) => ({ ...acc, ...r }), {}));
        })
        .then(() => setIsLoading(false))
        .catch((e) => {
          console.error(e);
          setError(e.message);
          setIsLoading(false);
        });
    }
  }, [reload]);

  if (error) {
    return (
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center', padding: PADDING.BIG }}
      >
        <Text style={{ ...FONT_STYLES.h3, color: COLORS.MAIN_DARK }}>Error</Text>
        <Text style={{ ...FONT_STYLES.h4, color: COLORS.MAIN_MEDIUM }}>
          Uh oh, something went wrong!
        </Text>
        <Text style={{ ...FONT_STYLES.text, color: COLORS.MAIN_DARK }}>{error}</Text>
      </View>
    );
  }

  if (isLoading)
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Spinner />
      </View>
    );

  // console.log({ isLoading, response });

  return <Component {...props} {...response} />;
};

export function connectApi<P>(connectProps: ConnectApiProps, Component: React.ElementType<P>) {
  return (props: P) => <ConnectApi {...props} {...connectProps} Component={Component} />;
}
