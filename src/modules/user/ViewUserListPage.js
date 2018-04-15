import {
	Platform,
	ScrollView,
	StyleSheet,
	View,
	ActivityIndicator
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

export class ViewUserPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.fetchData()
	}
    
	goToViewUser(user) {
		this.props.setSelectedUser(user)
		Actions.viewUserPage()
	}

	componentDidUpdate(prevProps, prevState) {
		if ((this.props.currentUser !== prevProps.currentUser) || (this.props.user !== prevProps.user)) {
			this.fetchData()
		}
		if (this.props.users !== prevProps.users) {
			if (this.props.users.length === 0) {
				Actions.pop()
			}
		}
	}

	fetchData() {
		if (this.props.title === 'Followers') {
			this.props.getUserFollower(this.props.user_id)
		} else if (this.props.title === 'Following') {
			this.props.getUserFollowing(this.props.user_id)
		} else {
			this.props.getUsers()
		}
	}

	render() {
		if (!this.props.users || !this.props.title || !this.props.success) {
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
						<View style={styles.header}>
							<View style={styles.platformHeader}>
								<NavBar titleName={this.props.title} />
							</View>
						</View>
						<List containerStyle={{ borderBottomColor: colors.transparent, marginTop: -5 }}>
							{
								this.props.users.map((user, index) => (
									<ListItem
										avatar={
											<CoverImage size={70} uri={user.picture_url} />
										}
										key={index}
										title={user.name}
										hideChevron={true}
										titleStyle={{ fontWeight: 'bold', color: colors.gray }}
										onPress={() => this.goToViewUser(user)}
									/>
								))
							}
						</List>
					</ScrollView>
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
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

const mapStateToProps = state => ({
	users: state.userReducer.users,
	user: state.userReducer.user,
	currentUser: state.userReducer.currentUser,
	success: state.userReducer.success
})

const mapDispatchToProps = dispatch => ({
	setSelectedUser: user => {
		dispatch(UserActions.setSelectedUser(user))
	},
	getUserFollowing: user_id => {
		dispatch(UserActions.getUserFollowing(user_id))
	},
	getUserFollower: user_id => {
		dispatch(UserActions.getUserFollower(user_id))
	},
	getUsers: () => {
		dispatch(UserActions.getUsers())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage)
