import {StyleSheet} from 'react-native';
import {MyColors} from '../../config/theme';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: MyColors.defaultBackground,
    height: 40,
  },
});
