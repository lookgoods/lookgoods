import {
	Platform,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	Text,
	Alert
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
import EmptyNotification from 'src/modules/notification/components/EmptyNotification'
import NotifyChat from 'src/modules/notification/components/NotifyChat'
import { Actions } from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'
import { APP_FULL_HEIGHT } from 'src/constants'

export class NotificationPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: '',
			item_id: ''
		}
		this.socket = SocketIOClient(constants.AppURL)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return ((this.props.notifications !== nextProps.notifications) || 
		(this.props.notifyNumber !== nextProps.notifyNumber) ||
		(this.props.loading !== nextProps.loading)) && 
		nextProps.currentPage === 'notification' 
	}

	componentDidMount() {
		this.fetchData()
	}

	refreshData () {
		this.fetchData()
	}

	componentDidUpdate(prevProps, prevState) {
		if (((this.props.currentPage !== prevProps.currentPage) 
			|| (this.props.notifyNumber !== prevProps.notifyNumber))
			&& this.props.currentPage === 'notification') {
			this.fetchData()
		}
	}

	fetchData() {
		this.props.getNotifications()
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

	goToViewReview(review_id, type) {
		if (type === 'Comment') {
			Actions.viewReviewPage({ focus: 'review', review_id })
		} else if (type === 'Chat') {
			Actions.viewReviewPage({ focus: 'comment', review_id })
		} else {
			Actions.viewReviewPage({ review_id })
		}
	}

	showActionSheet(item_id) {
		this.setState({ item_id })
		this.ActionSheet.show()
	}

	optionsSelect(index) {
		if (index === 0) {
			this.props.deleteNotification(this.state.item_id)
		}
	}

	async cancelSearch() {
		await this.setState({
			isSearch: false,
			searchText: ''
		})
	}

	clearNotifications() {
		Alert.alert(
			'Clear Notifications',
			'Are you sure to clear all notifications?',
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					this.props.clearNotifications()
				}}
			]
		)
	}

	render() {
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
				<ScrollView 
					style={styles.body}
					refreshControl={
						<RefreshControl
							refreshing={this.props.loading}
							onRefresh={() => this.refreshData()}
						/>
					}
				>
					{ this.props.notifications ?
						this.props.notifications.length !== 0 ?
							<View>
								<TouchableOpacity 
									style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 5, marginBottom: 5 }}
									onPress={() => this.clearNotifications()}
								>
									<Text style={{ color: colors.orange, marginTop: 5, marginBottom: 5 }}>Clear</Text>
								</TouchableOpacity>
								{ this.props.notifications.map((notification, index) => (
									<TouchableOpacity 
										key={index}
										onPress= {() => {
											this.props.readNotification(notification._id)
											this.goToViewReview(notification.item._id, notification.type)
										}}
										delayLongPress={500} 
										onLongPress = {() => this.showActionSheet(notification._id)}
										style={{ 
											backgroundColor: !notification.read ? colors.lightOrange : colors.white 
										}}
									>
										{ notification.type === 'Comment' ?
											<NotifyComment review={notification.item} timestamp={notification.timestamp} user={notification.user} />
											: notification.type === 'Review' ?
												<NotifyReview review={notification.item} user={notification.user} />
												: <NotifyChat review={notification.item} timestamp={notification.timestamp} user={notification.user} />
										}
									</TouchableOpacity>
								)
								)}
							</View>
							: <View style={{ marginTop: (APP_FULL_HEIGHT*0.2) }}>
								<EmptyNotification/>
							</View>
						: <View/>
					}
				</ScrollView>
				<ActionSheet
					ref={o => this.ActionSheet = o}
					options={['Delete', 'Cancel']}
					cancelButtonIndex={1}
					destructiveButtonIndex={0}
					onPress={(index) => this.optionsSelect(index)}
				/>
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
		backgroundColor: colors.orange,
		overflow: 'hidden'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	notifications: state.notificationReducer.notifications,
	notifyNumber: state.notificationReducer.notifyNumber,
	currentPage: state.menuReducer.currentPage,
	loading: state.notificationReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getNotifications: () => {
		dispatch(NotificationActions.getNotifications())
	},
	deleteNotification: (item_id) => {
		dispatch(NotificationActions.deleteNotification(item_id))
	},
	readNotification: (notification_id) => {
		dispatch(NotificationActions.readNotification(notification_id))
	},
	clearNotifications: () => {
		dispatch(NotificationActions.clearNotifications())
	}  
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
