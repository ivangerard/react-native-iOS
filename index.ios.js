/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import SearchScreen from './SearchScreen'


export default class personalnotes extends Component {
  render() {
    return(
        <NavigatorIOS style={styles.container} initialRoute={{
            title:'personalnotes' , component: SearchScreen
          }}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('personalnotes', () => personalnotes);
