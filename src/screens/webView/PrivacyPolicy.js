import React from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import {WebView} from 'react-native-webview';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <WebView
        androidHardwareAccelerationDisabled={true}
        source={{uri: 'https://help.uxcam.com/hc/en-us/articles/360004158171'}}
      />
    </SafeAreaView>
  );
}
