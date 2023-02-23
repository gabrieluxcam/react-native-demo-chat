import React from 'react';
import {View, Image, FlatList, TouchableWithoutFeedback} from 'react-native';
import {AuthContext} from '../../helpers';
import {commonStyles} from '../commonStyles';
import {Text, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {actions} from '../../helpers/actions';

function Profile({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  const _logout = React.useCallback(() => {
    signOut(); //logout, clear token and load logged out stack
  }, [signOut]);

  const _navigate = React.useCallback(
    routeName => {
      routeName ? navigation.navigate(routeName) : _logout();
    },
    [_logout, navigation],
  );

  const renderActionItem = React.useCallback(
    ({item}) => (
      <TouchableWithoutFeedback onPress={() => _navigate(item.routeName)}>
        <View style={[commonStyles.infoContainer, {paddingVertical: 15}]}>
          <Icon name={item.icon} color="gray" size={16} />
          <Text style={commonStyles.listText}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    ),
    [_navigate],
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=entropy&cs=srgb&dl=adult-beard-boy-casual-220453.jpg&fit=crop&fm=jpg&h=959&w=640',
          }}
          style={commonStyles.profileImage}
        />
        <Text style={commonStyles.profileNameText}>Me</Text>
      </View>
      <FlatList
        style={{flex: 1, marginTop: 10}}
        data={actions}
        ListHeaderComponent={() => {
          return <Text style={commonStyles.headerText}>Options</Text>;
        }}
        renderItem={renderActionItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

export default Profile;
