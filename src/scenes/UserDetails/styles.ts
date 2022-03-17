import theme from '@theme';
import { palette } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: 15,
  },
  text: {
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default styles;
