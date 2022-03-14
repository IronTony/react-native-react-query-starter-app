import { palette } from '@theme/colors';
import * as React from 'react';
import { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import styles from './styles';

interface ICLoader {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  fullPage?: boolean;
}

const CLoader: FC<ICLoader> = ({ color = palette.SUN_FLOWER, size = 40, style = {}, fullPage = false }) => {
  return (
    <View style={[styles.loaderContainer, fullPage && styles.fullPageLoader, style]}>
      <MaterialIndicator color={color} size={size} />
    </View>
  );
};

export default CLoader;
