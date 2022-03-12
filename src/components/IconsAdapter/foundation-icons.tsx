import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const createIconsMap = () => {
  return new Proxy(
    {},
    {
      get(_target, name) {
        return IconProvider(name);
      },
    },
  );
};

const IconProvider = name => ({
  toReactElement: props => FoundationIcon({ name, ...props }),
});

const FoundationIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

export const FoundationIconsPack = {
  name: 'Foundation',
  icons: createIconsMap(),
};
