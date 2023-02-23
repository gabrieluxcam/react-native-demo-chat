/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {AuthContext, getRandomBool, getRandomInt} from '../../helpers';
import {addUserIdentity, setUserPropertyValue} from '../../helpers/uxcamHelper';
import Logo from '../../components/Logo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, Caption, Button, Text, IconButton} from 'react-native-paper';
import {commonStyles} from '../commonStyles';
import {MyColors} from '../../config/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import StartDialog from '../../components/Dialog';

function Login({navigation}) {
  const {signIn, startSession} = React.useContext(AuthContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const interests = ['Arts & Entertainment', 'Games', 'Sports'];
  const languages = ['English', 'Spanish', 'Portuguese', 'German'];
  const installSource = ['Facebook Ads', 'Google Ads', 'Organic'];
  const ageCategory = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  const _handleOnChange = (key, value = '') => {
    setInputValues({...inputValues, [key]: value});
  };

  //sets username/email as user identity
  function _setUserIdentity() {
    if (inputValues.email.trim() !== '') {
      addUserIdentity(inputValues.email);
    }
  }

  function _setUserProperty() {
    const propArr = [
      {
        'User type': getRandomBool() ? 'Free' : 'Premium',
      },
      {
        Interests: interests[getRandomInt(2)],
      },
      {
        Language: languages[getRandomInt(3)],
      },
      {
        'Install Source': installSource[getRandomInt(2)],
      },
      {
        Gender: getRandomBool() ? 'Male' : 'Female',
      },
      {
        'Age category': ageCategory[getRandomInt(5)],
      },
    ];
    userProp = propArr[getRandomInt(5)];
    const [{key, value}] = Object.entries(userProp);
    setUserPropertyValue(key, userProp[key]);
  }

  function _login() {
    Keyboard.dismiss();
    setShowSpinner(true);
    setTimeout(() => {
      _setUserIdentity();
      _setUserProperty();
      setShowSpinner(false);
      signIn('token'); //save token and change stack to logged in
    }, 2000);
  }

  //Start UXCam session
  const handleStartSession = useCallback(
    key => {
      setShowDialog(false);
      startSession(key);
    },
    [startSession],
  ); // ?? Would this work?

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: MyColors.defaultBackground}}>
      <Spinner visible={showSpinner} />
      <StartDialog
        onStart={handleStartSession}
        onDismiss={() => setShowDialog(false)}
        visible={showDialog}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-250}
            behavior="position"
            enabled
            style={{padding: 20, flex: 1}}>
            <View style={{flexDirection: 'row-reverse'}}>
              <IconButton onPress={() => setShowDialog(true)} icon="settings" />
            </View>
            <Logo />
            <Caption>Enter your login info</Caption>
            <TextInput
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
              label="Email - will be user identity"
              value={inputValues.email}
              onChangeText={text => _handleOnChange('email', text)}
            />
            <TextInput
              autoCapitalize="none"
              theme={{
                roundness: 20,
                colors: {
                  placeholder: MyColors.lightGray,
                },
              }}
              secureTextEntry={true}
              mode="outlined"
              style={commonStyles.textInput}
              label="Password"
              value={inputValues.password}
              onChangeText={text => _handleOnChange('password', text)}
            />
            <Button
              theme={{roundness: 20}}
              style={{marginTop: 30}}
              mode="contained"
              onPress={_login}>
              Login
            </Button>
            <View style={styles.bottomContainer}>
              <Caption>Don't have an account?</Caption>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signup}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default Login;
