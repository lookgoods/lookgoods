import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  TabBarIOS
} from 'react-native'
import PropTypes from 'prop-types'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

class NavBar extends Component {

  render () {
    const { titleName } = this.props
    console.log('titleName',titleName)
    return (
      <View style={styles.navBar} >
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }} >
          <TouchableOpacity style={{ width: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
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