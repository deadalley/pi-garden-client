import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Spinner } from '../components/spinner';

export interface ConnectApiProps {
  executeOnLoad?: (() => Promise<any>)[];
}

const ConnectApi: React.FC<ConnectApiProps & { Component: React.ElementType }> = ({
  executeOnLoad,
  Component,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(!!(executeOnLoad && executeOnLoad.length));
  const [response, setResponse] = useState();

  useEffect(() => {
    if (executeOnLoad && executeOnLoad.length) {
      Promise.resolve()
        .then(() => setIsLoading(true))
        .then(() => Promise.all(executeOnLoad.map((fn) => fn())))
        .then((res: any) => {
          console.log({ res });
          return setResponse(res.reduce((acc: object, r: object) => ({ ...acc, ...r }), {}));
        })
        .then(() => setIsLoading(false));
    }
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Spinner />
      </View>
    );

  console.log({ isLoading, response });

  return <Component {...props} {...response} />;
};

export function connectApi<P>(connectProps: ConnectApiProps, Component: React.ElementType<P>) {
  return (props: P) => <ConnectApi {...props} {...connectProps} Component={Component} />;
}
