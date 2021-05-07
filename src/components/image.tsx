import React from 'react';
import { Image as NativeImage, ImageProps as NativeImageProps } from 'react-native';

export interface ImageProps {
  imageUrl: string;
}

export const Image: React.FC<ImageProps & Omit<NativeImageProps, 'source'>> = ({
  imageUrl,
  ...props
}) => {
  console.log({ uri: `http://192.168.0.91:1337/images/${imageUrl}` });
  return (
    <NativeImage
      {...props}
      source={{ uri: `http://192.168.0.91:1337/images/${imageUrl}` }}
      progressiveRenderingEnabled
      onLoadEnd={() => console.log('done')}
    />
  );
};
