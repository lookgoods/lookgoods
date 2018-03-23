import { Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react'

import GlobalPage from 'src/modules/global/GlobalPage'
import HomePage from 'src/modules/home/HomePage'
import Icon from 'react-native-vector-icons/FontAwesome'
import NotificationPage from 'src/modules/notification/NotificationPage'
import AddProductPage from 'src/modules/addProduct/AddProductPage'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from 'src/modules/user/UserPage'
import { colors } from 'src/constants/mixins'

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
					// title="Home"
					selectedTitleStyle={{color: colors.blue}}
					onPress={() => this.setState({selectedTab: 'home'})}
					renderIcon={() => <Icon name="home" size={this.px2dp(22)} color={colors.gray}/>}
					renderSelectedIcon={() => <Icon name="home" size={this.px2dp(22)} color={colors.blue}/>}
				>
					<HomePage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'global'}
					// title="Global"
					selectedTitleStyle={{color: colors.blue}}
					onPress={() => this.setState({selectedTab: 'global'})}
					renderIcon={() => <Icon name="globe" size={this.px2dp(22)} color={colors.gray}/>}
					renderSelectedIcon={() => <Icon name="globe" size={this.px2dp(22)} color={colors.blue}/>}
				>
					<GlobalPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'add'}
					// title="Add"
					selectedTitleStyle={{color: colors.blue}}
					onPress={() => this.setState({selectedTab: 'add'})}
					renderIcon={() => <Icon name="plus" size={this.px2dp(22)} color={colors.gray}/>}
					renderSelectedIcon={() => <Icon name="plus" size={this.px2dp(22)} color={colors.blue}/>}
				>
					<AddProductPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'notification'}
					// title="Notification"
					selectedTitleStyle={{color: colors.blue}}
					onPress={() => this.setState({selectedTab: 'notification'})}
					renderIcon={() => <Icon name="bell" size={this.px2dp(22)} color={colors.gray}/>}
					renderSelectedIcon={() => <Icon name="bell" size={this.px2dp(22)} color={colors.blue}/>}
				>
					<NotificationPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'user'}
					// title="Profile"
					selectedTitleStyle={{color: colors.blue}}
					onPress={() => this.setState({selectedTab: 'user'})}
					renderIcon={() => <Icon name="user" size={this.px2dp(22)} color={colors.gray}/>}
					renderSelectedIcon={() => <Icon name="user" size={this.px2dp(22)} color={colors.blue}/>}
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
		backgroundColor: colors.white
	}
})
