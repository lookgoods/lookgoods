import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import TabMenu from '../shares/TabMenu'
import NavBar from '../shares/NavBar'

export default class GlobalPage extends Component {
  constructor (props) {
    super(props)
  
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text>phasin</Text>
        </View>
        <View style={styles.coverFooter}>
          {/* <TabMenu/> */}
        </View>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName="GlobalPage"/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: {
    marginTop: Platform.OS === 'ios' ? 75 : 60
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