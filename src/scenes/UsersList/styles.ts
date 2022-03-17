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
  mainText: {
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  languangeContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 8,
  },
  buttonText: {
    fontFamily: fonts.regular,
  },
  SingleItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

export default styles;
