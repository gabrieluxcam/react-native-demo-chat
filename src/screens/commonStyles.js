import {StyleSheet} from 'react-native';
import {MyColors, FontSize} from '../config/theme';

export const commonStyles = StyleSheet.create({
  textInput: {
    backgroundColor: MyColors.defaultBackground,
    height: 40,
    fontSize: FontSize.medium,
    marginTop: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  profileNameText: {
    fontSize: FontSize.medium,
    marginTop: 10,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
  },
  listText: {
    marginLeft: 10,
    fontSize: FontSize.medium,
    opacity: 0.8,
  },
});
