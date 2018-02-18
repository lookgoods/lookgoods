import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import NavBar from 'src/modules/shares/NavBar'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'

export default class HomePage extends Component {
  constructor (props) {
    super(props)

  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Card
            title='HELLO WORLD'
            image={{uri : 'https://openclipart.org/image/2400px/svg_to_png/16155/milker-X-icon.png'}}>
            {/* <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text> */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <IconIonicons name='ios-star' size={36} color='#000' />
                <Text style={{ fontSize: 14 }}>4.8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <IconFontAwesome name='btc' size={36} color='#000' />
                <Text style={{ fontSize: 14 }}>500</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                <IconFontAwesome name='commenting-o' size={24} color='#000' />
                <Text style={{ fontSize: 14 }}>14</Text>
              </TouchableOpacity>
            </View>

          </Card>
        </View>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName="HomePage"/>
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
    zIndex: 2
  }
})