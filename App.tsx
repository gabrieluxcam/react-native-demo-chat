/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';

import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeModules, NativeEventEmitter} from 'react-native';

import RNUxcam from 'react-native-ux-cam';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const theme = Theme; //adds theme to react-native-paper UIs

  const authContext = useMemo(() => {
    return {
      signIn: token => {
        setIsLoading(false);
        setUserToken(token);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      //starts uxcam session
      startSession: key => {
        //startSessionWithKey(key);
      },
    };
  }, []);

  useEffect(() => {
    //Warning: Tag first screen name manually on initialRoute screen of each root stack
    // tagScreenName('Login');
    // _uxcamSessionStartListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => {
      this.uxcamEvent.remove(); //remove uxcamEvent listener, redundant in app.js
    };
  }, []);

  // TODO: add uxcamSessionStartListener

  if (isLoading) {
    // return <Splash />;  //TODO add Splash screen
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

  return ( // TODO!! Finish this shit
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer
            onStateChange={state => {
              //tags screen name using active route name
              // tagScreenName(getActiveRouteName(state));
              console.log('something');
            }}>
            {userToken ? <MainModal /> : <LoggedOutStack />}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

export default App;
