/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {enableScreens} from 'react-native-screens';
import React, {useEffect, useMemo, useState} from 'react';

enableScreens();

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeModules, NativeEventEmitter} from 'react-native';

import RNUxcam from 'react-native-ux-cam';

import {AuthContext} from './src/helpers/context';
import {Theme} from './src/config/theme';
import {MainModal} from './src/navRoutes/modalStack';
import {LoggedOutStack} from './src/navRoutes/loggedOutStack';
import {startSession, tagScreenName} from './src/helpers/uxcamHelper';
import {showToast} from './src/helpers';
import Splash from './src/screens/splash/Splash';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const theme = Theme; //adds theme to react-native-paper UIs

  const authContext = useMemo(() => {
    return {
      signIn: (token: any) => {
        setIsLoading(false);
        setUserToken(token);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      //starts uxcam session
      startSession: (key: string) => {
        startSession(key);
      },
    };
  }, []);

  useEffect(() => {
    //Warning: Tag first screen name manually on initialRoute screen of each root stack
    tagScreenName('Login');
    _uxcamSessionStartListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => {
      this.uxcamEvent.remove(); //remove uxcamEvent listener, redundant in app.js
    };
  }, []);

  function _uxcamSessionStartListener() {
    const emitter = new NativeEventEmitter(NativeModules.RNUxcam);
    this.uxcamEvent = emitter.addListener(
      'UXCam_Verification_Event',
      async () => {
        showToast('Session started');
      },
    );
  }

  if (isLoading) {
    return <Splash />;
  }

  // Gets the current screen from navigation state
  const getActiveRouteName = (state: any) => {
    const route = state.routes[state.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer
            onStateChange={state => {
              //tags screen name using active route name
              tagScreenName(getActiveRouteName(state));
              console.log(state);
            }}>
            {userToken ? <MainModal /> : <LoggedOutStack />}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

export default App;
