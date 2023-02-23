import React from 'react';
import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../helpers';
import {commonStyles} from '../commonStyles';
import {Text, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getRandomInt} from '../../helpers';

function Profile({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  const actions = React.useMemo(
    () => [
      {
        icon: 'lock-outline',
        name: 'Privacy policy',
        routeName: 'PrivacyPolicy',
      },
      {
        icon: 'shield-lock',
        name: 'Private conversations',
        routeName: 'PrivateMessage',
      },
      {
        icon: 'skull-crossbones-outline',
        name: 'Crash me if you can',
        routeName: 'Crasher',
      },
      {
        icon: 'logout',
        name: 'Logout',
        routeName: null,
      },
    ],
    [],
  );

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
      <TouchableOpacity
        onPress={() => _navigate(item.routeName)}
        style={[commonStyles.infoContainer, {paddingVertical: 15}]}>
        <Icon name={item.icon} color="gray" size={16} />
        <Text style={commonStyles.listText}>{item.name}</Text>
      </TouchableOpacity>
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
        keyExtractor={() => String(getRandomInt(1000))}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
}

export default React.memo(Profile);
