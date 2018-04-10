import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'

import InfoText from 'src/modules/user/components/InfoText'

class InfoBar extends Component {
	constructor (props) {
		super(props)
	}

	goToViewUser (viewUser, number, user_id) {
		if (number !== 0) viewUser(user_id)
	}

	render() {
		return (
			<View style={styles.container}>
				<InfoText title='Reviews' number={this.props.review_num} />
				<InfoText title='Likes' number={this.props.like_num} />
				<TouchableOpacity onPress={() => this.goToViewUser(this.props.viewFollower, this.props.follower_num, this.props.user_id)}>
					<InfoText title='Follower' number={this.props.follower_num} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.goToViewUser(this.props.viewFollowing, this.props.following_num, this.props.user_id)}>
					<InfoText title='Following' number={this.props.following_num} />
				</TouchableOpacity>
			</View>
		)
	}
}
  
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 30,
		marginRight: 30
	}
})

const mapDispatchToProps = dispatch => ({
	viewFollowing: (user_id) => {
		dispatch(UserActions.viewFollowing(user_id))
	},
	viewFollower: (user_id) => {
		dispatch(UserActions.viewFollower(user_id))
	}
})

export default connect(null, mapDispatchToProps)(InfoBar)