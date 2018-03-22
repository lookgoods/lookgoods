import { Button, Divider, List, ListItem } from 'react-native-elements'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constant/mixins'
import { connect } from 'react-redux'

export default class SettingPage extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <ListItem
            title={<Text style={styles.logoutText}>Logout</Text>}
          />
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  body: {
    marginTop: Platform.OS === 'ios' ? 75 : 60
  },
  platformHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    paddingTop: Platform.OS === 'ios' ? 25 : 0
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1
  },
  logoutText: {
    color: colors.red,
    fontSize: 16
  }
})
