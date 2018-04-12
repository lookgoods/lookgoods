import {
	Platform,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Text,
	View,
	ActivityIndicator
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import { Divider } from 'react-native-elements'
import InfoBar from 'src/modules/user/components/InfoBar'
import ReviewsGrid from 'src/modules/user/components/ReviewsGrid'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'

export class ViewUserPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFollowed: false
		}
	}

	componentDidMount() {
		this.props.getCurrentUser()
		this.props.getUser(this.props.selectedUser._id)
		this.props.getUserOwnReviews(this.props.selectedUser._id)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.currentUser.following_list !== prevProps.currentUser.following_list) {
			this.checkFollow()
		}
	}

	checkFollow() {
		if (this.props.currentUser.following_list.includes(this.props.selectedUser._id)) {
			this.setState({
				isFollowed: true
			})
		} else {
			this.setState({
				isFollowed: false
			})
		}
	}

	followUser(user_id) {
		this.props.followUser(user_id)
	}
	
	unfollowUser(user_id) {
		this.props.unfollowUser(user_id)
	}

	getTotalLike(ownReviews) {
		let total = 0
		ownReviews.map((review) => {
			total += review.like_by_list.length
		})
		return total
	}

	render() {
		if (!this.props.selectedUser || !this.props.currentUser || !this.props.user || !this.props.ownReviews) {
			return (<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</View>)
		}
		else {
			return (
				<View style={styles.container}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						scrollEventThrottle={16}
						bounces={false}
						style={styles.body}
					>
						{ !this.props.currentUser ? 
							<View style={styles.loadingContainer}>
								<ActivityIndicator size="large" />
							</View> :
							<View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
										marginTop: 10
									}}
								>
									<CoverImage size={110} uri={this.props.user.picture_url} />
									<View
										style={{
											marginLeft: 20
										}}
									>
										<Text style={styles.usernameText}>{this.props.user.name}</Text>
										{ ((this.props.currentUser._id !== this.props.user._id) && this.props.user && this.props.currentUser) && (
											this.state.isFollowed ? 
												<TouchableOpacity style={styles.buttonUnfollow} onPress={() => this.unfollowUser(this.props.selectedUser._id)}>
													<Text style={styles.fontFollow}>Unfollow</Text>
												</TouchableOpacity>
												: 
												<TouchableOpacity style={styles.buttonFollow} onPress={() => this.followUser(this.props.selectedUser._id)}>
													<Text style={styles.fontFollow}>Follow</Text>
												</TouchableOpacity>)
										}
									</View>
								</View>

								{this.props.user.description !== '' && (
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
											marginTop: 10
										}}
									>
										<View style={{ width: '80%' }}>
											<Text style={{ lineHeight: 22 }}>{this.props.user.description}</Text>
										</View>
									</View>
								)}

								<View style={styles.infoBar}>
									<InfoBar
										review_num={this.props.ownReviews.length}
										like_num={this.getTotalLike(this.props.ownReviews)}
										follower_num={this.props.user.follower_list.length}
										following_num={this.props.user.following_list.length}
										user_id={this.props.user._id}
									/>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Divider style={styles.divider} />
								</View>
								<View style={styles.tabsContainer}>
									<ReviewsGrid review_list={this.props.ownReviews} />
								</View>
							</View>
						}
					</ScrollView>
					<View style={styles.header}>
						<View style={styles.platformHeader}>
							{ this.props.selectedUser ? 
								<NavBar titleName={this.props.selectedUser.name} /> :
								<NavBar />
							} 
						</View>
					</View>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
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
	infoBar: {
		marginTop: 20
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 15,
		height: 1.2,
		width: '100%'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 12,
		paddingRight: 12
	},
	usernameText: {
		fontSize: 18,
		marginTop: 20,
		color: colors.gray,
		fontWeight: 'bold'
	},
	fontFollow: {
		fontSize: 18,
		color: colors.white
	},
	buttonFollow: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 20,
		backgroundColor: colors.orange,
		height: 30,
		borderRadius: 3
	},
	buttonUnfollow: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 20,
		backgroundColor: colors.lightGray,
		height: 30,
		borderRadius: 3
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

const mapStateToProps = state => ({
	selectedUser: state.userReducer.selectedUser,
	currentUser: state.userReducer.currentUser,
	user: state.userReducer.user,
	success: state.userReducer.success,
	ownReviews: state.userReducer.ownReviews
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	},
	getUser: (user_id) => {
		dispatch(UserActions.getUser(user_id))
	},
	followUser: (user_id) => {
		dispatch(UserActions.followUser(user_id))
	},
	unfollowUser: (user_id) => {
		dispatch(UserActions.unfollowUser(user_id))
	},
	getUserOwnReviews: (user_id) => {
		dispatch(UserActions.getUserOwnReviews(user_id))
	},
	getUserSaveReviews: (user_id) => {
		dispatch(UserActions.getUserSaveReviews(user_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage)
