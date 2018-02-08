import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import GlobalPage from '../global/GlobalPage'
import HomePage from '../home/HomePage'
import Icon from 'react-native-vector-icons/FontAwesome'
import NotificationPage from '../notification/NotificationPage'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from '../user/UserPage'

const deviceWidth = Dimensions.get('window').width
const basePx = 375
export default class TabMenu extends Component {
  state= {
    selectedTab: 'home'
  }

  px2dp(px) {
    return px * deviceWidth / basePx
  }

  render () {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'home'})}
          renderIcon={() => <Icon name="home" size={this.px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="home" size={this.px2dp(22)} color="#3496f0"/>}
        >
          <HomePage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'global'}
          title="Global"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'global'})}
          renderIcon={() => <Icon name="globe" size={this.px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="globe" size={this.px2dp(22)} color="#3496f0"/>}
        >
          <GlobalPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'notification'}
          title="Notification"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'notification'})}
          renderIcon={() => <Icon name="bell" size={this.px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="bell" size={this.px2dp(22)} color="#3496f0"/>}
        >
          <NotificationPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'user'}
          title="Profile"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'user'})}
          renderIcon={() => <Icon name="user" size={this.px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={this.px2dp(22)} color="#3496f0"/>}
        >
          <UserPage/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
