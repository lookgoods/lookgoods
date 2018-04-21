import {
	Platform,
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'

import NavBarSearch from '../shares/NavBarSearch'
import SocketIOClient from 'socket.io-client'
import constants from 'src/redux/constants'
import { connect } from 'react-redux'
import NotificationActions from 'src/redux/actions/notification'
import { colors } from 'src/constants/mixins'
import NotifyComment from 'src/modules/notification/components/NotifyComment'
import NotifyReview from 'src/modules/notification/components/NotifyReview'

export class NotificationPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
		this.socket = SocketIOClient(constants.AppURL)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.notifications !== nextProps.notifications) || 
		(this.props.currentPage !== nextProps.currentPage) ||
		(this.props.notifyNumber !== nextProps.notifyNumber)
	}

	componentDidMount() {
		this.fetchData()
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('prevProps', prevProps)
		console.log('props', this.props)

		if ((this.props.currentPage !== prevProps.currentPage) && this.props.currentPage === 'notification') {
			this.clearNotifyNumber()
			this.fetchData()
		}
	}

	fetchData() {
		this.props.getNotifications()
	}

	clearNotifyNumber() {
		console.log('clear noti')
		this.props.clearNotificationNumber()
	}

	setIsSearch() {
		this.setState({ isSearch: true })
	}

	handleSearchText(text) {
		if (text === '') {
			this.setState({ isSearch: false })
		} else {
			this.setState({ isSearch: true })
		}
		this.setState({ searchText: text })
	}

	async cancelSearch() {
		await this.setState({
			isSearch: false,
			searchText: ''
		})
	}

	render() {
		console.log(this.props.notifications, 'notification')
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearch
							searchText={this.state.searchText}
							isSearch={this.state.isSearch}
							handleSearchText={text => this.handleSearchText(text)}
							setIsSearch={() => this.setIsSearch()}
							cancelSearch={() => this.cancelSearch()}
						/>
					</View>
				</View>
				<View style={styles.body}>
					{ this.props.notifications &&
							this.props.notifications.map((notification, index) => (
								<TouchableOpacity key={index}>
									{ notification.type === 'Comment' ?
										<NotifyComment review={notification.item} user={notification.user} />
										:<NotifyReview review={notification.item} user={notification.user} />
									}
								</TouchableOpacity>
							))
					}
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
		backgroundColor: colors.white
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	notifications: state.notificationReducer.notifications,
	notifyNumber: state.notificationReducer.notifyNumber,
	currentPage: state.menuReducer.currentPage
})

const mapDispatchToProps = dispatch => ({
	getNotifications: () => {
		dispatch(NotificationActions.getNotifications())
	},
	clearNotificationNumber: () => {
		dispatch(NotificationActions.clearNotificationNumber())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
