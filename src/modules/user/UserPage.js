import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import React, { Component } from 'react'

import UserPhoto from 'src/modules/user/components/UserPhoto'
import InfoBar from 'src/modules/user/components/InfoBar'

export default class UserPage extends Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.userPhoto}>
              <UserPhoto username="Phasin Sarunpornkul"/>
            </View>
            <View style={styles.infoBar}>
              <InfoBar review_num={4} comment_num={22} follower_num={30} following_num={12}/>
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
    userPhoto: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    infoBar: {
      marginTop: 30
    }
  })