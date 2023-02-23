import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import styles from './styles';
import {Text} from 'react-native-paper';
import {occludeSensitiveScreen, logEvent} from '../../helpers/uxcamHelper';

export default function PrivateMessage() {
  let timeSpent = 0;

  useEffect(() => {
    occludeSensitiveScreen(true);
    this.interV = setInterval(() => {
      timeSpent += 1;
    }, 1000);
    return () => {
      logEvent('exit private conversation', {
        timeSpent: timeSpent + ' seconds',
      });
      occludeSensitiveScreen(false);
      clearInterval(this.interV);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        No contents. This page will be hidden from recording anyway
      </Text>
    </SafeAreaView>
  );
}
