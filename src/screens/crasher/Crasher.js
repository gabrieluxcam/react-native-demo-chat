import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import styles from './styles';

export default class Crasher extends React.Component {
  stackoverflow() {
    this.stackoverflow();
  }

  anr() {
    let a = 1000000;
    let b = 5000;
    let c = 0;
    for (let i = 0; i < a; i++) {
      c += b;
      for (let j = 0; j < b; j++) {
        c -= j;
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button mode="text" onPress={this.anr}>
          ANR
        </Button>
        <View style={{height: 25}} />
        <Button mode="text" onPress={() => this.stackoverflow()}>
          Stackoverflow
        </Button>
        <View style={{height: 25}} />
        <Button mode="text" onPress={() => console.log(this.state.test)}>
          Undefined state value
        </Button>
      </SafeAreaView>
    );
  }
}
