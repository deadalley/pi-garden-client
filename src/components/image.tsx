import React from 'react';
import {
  Image as NativeImage,
  ImageProps as NativeImageProps,
  ImageSourcePropType,
} from 'react-native';

export interface ImageProps {
  image: ImageSourcePropType;
}

export const Image: React.FC<ImageProps & Omit<NativeImageProps, 'source'>> = ({
  image,
  ...props
}) => {
  return <NativeImage {...props} source={image} progressiveRenderingEnabled />;
};
