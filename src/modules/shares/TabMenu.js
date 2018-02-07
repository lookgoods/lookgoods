import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'

// import Animation from 'lottie-react-native'

export default class TabMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuSelected: 'home'
    }
  }

  async changeGloblPage(){
    await this.setState({ menuSelected: 'global' })
    await Actions.globalPage()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.blockCenter}>
          <TouchableOpacity 
            style={[styles.menu, this.state.menuSelected === 'home' ? styles.selected : {}]} 
            onPress={() => {   
              console.log('1')           
              this.setState({ menuSelected: 'home' })
              Actions.homePage()
            }}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menu, this.state.menuSelected === 'global' ? styles.selected : {}]}
            onPress={() => this.changeGloblPage()}
          >
            <Text>Global</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menu, this.state.menuSelected === 'add' ? styles.selected : {}]}
            onPress={() => {
              console.log('3')      
              this.setState({ menuSelected: 'add' })
            }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menu, this.state.menuSelected === 'notification' ? styles.selected : {}]}
            onPress={() => {
              console.log('4')      
              this.setState({ menuSelected: 'notification' })
            }}
          >
            <Text>Noti</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.menu, this.state.menuSelected === 'user' ? styles.selected : {}]}
            onPress={() => {
              console.log('5')      
              this.setState({ menuSelected: 'user' })
            }}
          >
            <Text>User</Text>
          </TouchableOpacity>
        </View>  
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60
  },
  blockCenter: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
  },
  menu: {
    width: 40, 
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#d6d7da'
  },
  selected: {
    backgroundColor: '#0BA9F0'
  }
})
