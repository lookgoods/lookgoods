import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import GlobalPage from '../global/GlobalPage'
import HomePage from '../home/HomePage'
import NotificationPage from '../notification/NotificationPage'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from '../user/UserPage'

export default class TabMenu extends Component {
  state= {
    selectedTab: 'home'
  }

  render () {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'home'})}
        >
          <HomePage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'global'}
          title="Global"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'global'})}
        >
          <GlobalPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'notification'}
          title="Notification"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'notification'})}
        >
          <NotificationPage/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'user'}
          title="UserProfile"
          selectedTitleStyle={{color: "#3496f0"}}
          onPress={() => this.setState({selectedTab: 'user'})}
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
