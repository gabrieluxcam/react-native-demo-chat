import {StyleSheet} from 'react-native';
import {MyColors} from '../../config/theme';

export default StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#2C2C2C',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signup: {
    color: MyColors.primaryColor,
  },
});
