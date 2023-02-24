import React, {useState, useEffect} from 'react';
import {
  View,
  Keyboard,
  Linking,
  AppState,
  Text,
  TextInput,
  Button,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyColors} from '../../config/theme';
import {Caption} from 'react-native-paper';
import {commonStyles} from '../commonStyles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {showToast, getRandomBool, getRandomInt} from '../../helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  hideSensitiveView,
  allowShowBreak,
  logEvent,
} from '../../helpers/uxcamHelper';

function Register({navigation}) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const interests = ['Arts & Entertainment', 'Games', 'Sports'];
  const languages = ['English', 'Spanish', 'Portuguese', 'German'];
  const installSource = ['Facebook Ads', 'Google Ads', 'Organic'];
  const ageCategory = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  const _handleOnChange = (key, value) => {
    setInputValues({...inputValues, [key]: value});
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  //allow short break incase user view terms and condition on external browser
  const _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      allowShowBreak(false);
    } else if (nextAppState === 'inactive') {
      allowShowBreak(true);
    }
  };

  function _register() {
    Keyboard.dismiss();
    setShowSpinner(true);
    setTimeout(() => {
      showToast('User successfully registered');
      setShowSpinner(false);
      logEvent('User registered', {
        'User type': getRandomBool() ? 'Free' : 'Premium',
        Interests: interests[getRandomInt(2)],
        Language: languages[getRandomInt(3)],
        'Install Source': installSource[getRandomInt(2)],
        Gender: getRandomBool() ? 'Male' : 'Female',
        'Age category': ageCategory[getRandomInt(5)],
      });
      navigation.goBack();
    }, 2000);
  }

  //opens url in external default browser
  function _openTerms() {
    const url = 'https://www.google.com/';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: MyColors.defaultBackground}}>
      <Spinner visible={showSpinner} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, padding: 20}}>
          <Text style={[styles.title, {marginBottom: 20}]}>Register</Text>
          <TextInput
            autoCapitalize="none"
            theme={{
              roundness: 20,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={commonStyles.textInput}
            label="Username"
            value={inputValues.username}
            onChangeText={text => _handleOnChange('username', text)}
          />
          <TextInput
            ref={hideSensitiveView}
            autoCapitalize="none"
            theme={{
              roundness: 20,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            keyboardType="email-address"
            style={commonStyles.textInput}
            label="Email"
            value={inputValues.email}
            onChangeText={text => _handleOnChange('email', text)}
          />
          <TextInput
            ref={hideSensitiveView}
            autoCapitalize="none"
            theme={{
              roundness: 20,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            keyboardType="number-pad"
            style={commonStyles.textInput}
            label="Phone"
            value={inputValues.phone}
            onChangeText={text => _handleOnChange('phone', text)}
          />
          <TextInput
            autoCapitalize="none"
            theme={{
              roundness: 20,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={commonStyles.textInput}
            label="Password"
            value={inputValues.password}
            secureTextEntry={true}
            onChangeText={text => _handleOnChange('password', text)}
          />
          <TextInput
            autoCapitalize="none"
            theme={{
              roundness: 20,
              colors: {
                placeholder: MyColors.lightGray,
              },
            }}
            mode="outlined"
            style={commonStyles.textInput}
            label="Confirm password"
            value={inputValues.confirmPassword}
            secureTextEntry={true}
            onChangeText={text => _handleOnChange('confirmPassword', text)}
          />
          <View style={styles.bottomContainer}>
            <Caption>By signing up, you agree with our</Caption>
            <TouchableOpacity onPress={_openTerms}>
              <Text style={styles.signup}> terms & conditions</Text>
            </TouchableOpacity>
          </View>
          <Button
            theme={{roundness: 20}}
            style={{marginTop: 20}}
            mode="contained"
            onPress={_register}>
            Sign up
          </Button>
          <View style={[styles.bottomContainer, {marginTop: 30}]}>
            <Caption>Already have an account:</Caption>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.signup}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
