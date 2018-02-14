import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import React, { Component } from 'react'

import UserPhoto from 'src/modules/user/UserPhoto'

export default class UserPage extends Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.userPhotoContainer}>
              <UserPhoto username="phasin"/>
            </View>
          </View>
        </View>
      )
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
    userPhotoContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  })