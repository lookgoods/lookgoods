import { Dimensions, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import GlobalPage from 'src/modules/global/GlobalPage'
import HomePage from 'src/modules/home/HomePage'
import Icon from 'react-native-vector-icons/FontAwesome'
import NotificationPage from 'src/modules/notification/NotificationPage'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from 'src/modules/user/UserPage'
import { colors } from 'src/constants/mixins'
import MenuActions from 'src/redux/actions/menu'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import NotificationActions from 'src/redux/actions/notification'
import { AccessToken } from 'react-native-fbsdk'
import SocketIOClient from 'socket.io-client'
import constants from 'src/redux/constants'

const deviceWidth = Dimensions.get('window').width
const basePx = 375

export class TabMenu extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'home',
			notification: null
		}
		this.socket = SocketIOClient(constants.AppURL)
		this.handleNotify()
	}

	componentDidMount() {
		console.disableYellowBox = true
		this.checkPage()
		this.fetchData()
		this.checkAccessToken()
		this.openSocket()
	}

	openSocket() {
		if (this.props.currentUser) {
			this.socket.emit('authenUser', JSON.stringify({ userId: this.props.currentUser._id }))
			this.props.openSocket()
			this.props.setNotificationNumber(this.props.currentUser.unread)
		}
	}

	firstOpenSocket() {
		if (this.props.currentUser && !this.props.isSocketOpen) {
			this.socket.emit('authenUser', JSON.stringify({ userId: this.props.currentUser._id }))
			this.props.openSocket()
			this.props.setNotificationNumber(this.props.currentUser.unread)
		}
	}

	handleNotify() {
		this.socket.on('notify', (message) => {
			this.props.increaseNotificationNumber()
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.selectedTab !== prevState.selectedTab) {
			this.fetchData()
		}
		if (this.props.currentUser !== prevProps.currentUser) {
			this.firstOpenSocket()
		}
	}

	checkAccessToken() {
		AccessToken.getCurrentAccessToken().then(data => {
			if (!data) Actions.loginPage()
		})
	}

	fetchData() {
		this.props.getCurrentUser()
	}

	checkPage() {
		if (this.props.page) this.setState({ selectedTab: this.props.page })
		else this.setState({ selectedTab: 'home' })
	}

	px2dp(px) {
		return px * deviceWidth / basePx
	}

	render() {
		if (!this.props.currentUser) {
			if (this.props.success) {
				Actions.loginPage()
			}
			return <View />
		}
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
						<Icon name="home" size={this.px2dp(22)} color={colors.orange} />
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
						<Icon name="globe" size={this.px2dp(22)} color={colors.orange} />
					)}
				>
					<GlobalPage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'add'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => Actions.addReviewPage()}
					renderIcon={() => (
						<Icon name="plus" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="plus" size={this.px2dp(22)} color={colors.orange} />
					)}
				/>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'notification'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'notification' })
						this.props.setCurrentPage('notification')
						this.props.clearNotificationNumber()
					}}
					renderIcon={() => (
						<Icon name="bell" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<Icon name="bell" size={this.px2dp(22)} color={colors.orange} />
					)}
					badgeText={ this.props.notifyNumber !== 0 ? this.props.notifyNumber : '' }
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
						<Icon name="user" size={this.px2dp(22)} color={colors.orange} />
					)}
				>
					<UserPage/>
				</TabNavigator.Item>
			</TabNavigator>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	success: state.userReducer.success,
	isSocketOpen: state.notificationReducer.isSocketOpen,
	notifyNumber: state.notificationReducer.notifyNumber
})

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
	},
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	},
	setNotificationNumber: (number) => {
		dispatch(NotificationActions.setNotificationNumber(number))
	},
	clearNotificationNumber: () => {
		dispatch(NotificationActions.clearNotificationNumber())
	},
	increaseNotificationNumber: () => {
		dispatch(NotificationActions.increaseNotificationNumber())
	},
	openSocket: () => {
		dispatch(NotificationActions.openSocket())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(TabMenu)
