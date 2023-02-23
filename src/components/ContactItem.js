// import React from 'react';
// import {View, StyleSheet, Image} from 'react-native';
// import {Text} from 'react-native-paper';
// import {MyColors} from '../config/theme';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import PropTypes from 'prop-types';

// export default class ContactItem extends React.Component {
//   render() {
//     const item = this.props.item;
//     return (
//       <TouchableWithoutFeedback onPress={this.props.onPress}>
//         <View style={styles.container}>
//           <View>
//             <Image style={styles.image} source={{uri: this.props.image}} />
//             {this.props.isOnline && <View style={styles.online} />}
//           </View>
//           <Text style={{marginLeft: 10, flex: 1}}>{item.name}</Text>
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   }
// }

// //Props that can used with this component....Not required but brings more clarity
// ContactItem.propTypes = {
//   item: PropTypes.object.isRequired,
//   onPress: PropTypes.func.isRequired,
//   isOnline: PropTypes.bool.isRequired,
//   image: PropTypes.string.isRequired,
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     marginHorizontal: 10,
//     marginVertical: 5,
//     padding: 10,
//     alignItems: 'center',
//   },
//   image: {
//     height: 40,
//     width: 40,
//     borderRadius: 10,
//     backgroundColor: MyColors.lightGray,
//   },
//   online: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'green',
//     position: 'absolute',
//     right: -4,
//     top: -4,
//   },
// });

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {MyColors} from '../config/theme';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

const ContactItem = ({item, onPress, isOnline, image}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{uri: image}} />
          {isOnline && <View style={styles.online} />}
        </View>
        <Text style={{marginLeft: 10, flex: 1}}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

ContactItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: MyColors.lightGray,
  },
  online: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    position: 'absolute',
    right: -4,
    top: -4,
  },
});

export default ContactItem;
