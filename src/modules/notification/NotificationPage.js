import {
	Platform,
	StyleSheet,
	View,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	RefreshControl
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
import { Actions } from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'

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

	goToViewReview(review_id) {
		Actions.viewReviewPage({ review_id })
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
						this.props.notifications.map((notification, index) => (
							<TouchableOpacity 
								key={index}
								onPress= {() => this.goToViewReview(notification.item._id)}
								delayLongPress={1000} 
								onLongPress = {() => this.showActionSheet(notification._id)}
							>
								{ notification.type === 'Comment' ?
									<NotifyComment review={notification.item} user={notification.user} />
									:<NotifyReview review={notification.item} user={notification.user} />
								}
							</TouchableOpacity>
						))
						: this.props.loading && 
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" />
						</View>
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
		backgroundColor: colors.white,
		overflow: 'hidden'
	},
	loadingContainer: {
		marginTop: 250
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
	} 
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
