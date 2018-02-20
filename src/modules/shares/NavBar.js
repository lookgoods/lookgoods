import React, { Component } from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

class NavBar extends Component {

  render () {
    const { titleName } = this.props
    console.log('titleName',titleName)
    return (
      <View style={styles.navBar} >
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }} >
          <TouchableOpacity 
            style={{ width: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} 
            onPress={() => Actions.pop()}
          >
            <IconIonicons name='ios-arrow-back' size={20} color='#000' />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>{ titleName }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: { 
    flex: 1,
    justifyContent: 'center', 
    flexDirection: 'row',
    zIndex: 1,
    backgroundColor: '#0ff'
  },
  backgroundTranparent: {
    backgroundColor: 'transparent' 
  }
})

export default NavBar