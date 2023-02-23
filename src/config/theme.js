import {DefaultTheme} from 'react-native-paper';

export const MyColors = {
  primaryColor: '#3559F9',
  accentColor: '#3559F9',
  defaultBackground: '#F0F0F0',
  lightGray: '#B7B7B7',
};

export const FontSize = {
  small: 12,
  medium: 16,
  large: 18,
  xl: 22,
};

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: MyColors.primaryColor,
    accent: MyColors.accentColor,
  },
};
