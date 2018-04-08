import { Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import GlobalPage from 'src/modules/global/GlobalPage'
import HomePage from 'src/modules/home/HomePage'
import Icon from 'react-native-vector-icons/FontAwesome'
import NotificationPage from 'src/modules/notification/NotificationPage'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from 'src/modules/user/UserPage'
import { colors } from 'src/constants/mixins'
import FBSDK from 'react-native-fbsdk'
import to from 'await-to-js'
import MenuActions from 'src/redux/actions/menu'
import { connect } from 'react-redux'

const deviceWidth = Dimensions.get('window').width
const basePx = 375
const { AccessToken } = FBSDK

export class TabMenu extends Component {
	state = {
		selectedTab: 'home'
	}

	async checkLogin() {
		const [err, token] = await to(AccessToken.getCurrentAccessToken())
		if (err) console.log('get token error', err)
		if (!token) Actions.loginPage()
	}

	componentDidMount() {
		this.checkLogin()
	}

	px2dp(px) {
		return px * deviceWidth / basePx
	}

	render() {
		return (
			<TabNavigator style={styles.container}>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'home' })
						this.props.setCurrentPage('home')
					}}
					renderIcon={() => (
						<Icon name="home" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="home" size={this.px2dp(22)} color={colors.blue} />
					)}
				>
					<HomePage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'global'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'global' })
						this.props.setCurrentPage('global')
					}}
					renderIcon={() => (
						<Icon name="globe" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="globe" size={this.px2dp(22)} color={colors.blue} />
					)}
				>
					<GlobalPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'add'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => Actions.addProductPage()}
					renderIcon={() => (
						<Icon name="plus" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="plus" size={this.px2dp(22)} color={colors.blue} />
					)}
				/>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'notification'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'notification' })
						this.props.setCurrentPage('notification')
					}}
					renderIcon={() => (
						<Icon name="bell" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="bell" size={this.px2dp(22)} color={colors.blue} />
					)}
				>
					<NotificationPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'user'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'user' })
						this.props.setCurrentPage('user')
					}}
					renderIcon={() => (
						<Icon name="user" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="user" size={this.px2dp(22)} color={colors.blue} />
					)}
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

const mapDispatchToProps = dispatch => ({
	setCurrentPage: (page) => {
		dispatch(MenuActions.setCurrentPage(page))
	}
})

export default connect(null, mapDispatchToProps)(TabMenu)
