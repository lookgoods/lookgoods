import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import TabMenu from '../shares/TabMenu'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
  
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text>eiei</Text>
        </View>
        <View style={styles.coverFooter}>
          <TabMenu/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  body: {
    marginTop: Platform.OS === 'ios' ? 75 : 60
  },
  bodyTopBox: {
    height: 100,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  platformHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    paddingTop: Platform.OS === 'ios' ? 25 : 0
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1
  },
  coverHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  coverFooter: {
    height: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0
  }
})