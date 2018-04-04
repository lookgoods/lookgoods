import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import CoverImage from 'src/modules/shares/CoverImage'
import StarBar from 'src/modules/viewReview/components/StarBar'

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} url={image_url}/>
	</View>
)

const Content = ({ username, rating, message }) => (
	<View style={styles.content}>
		<Text style={styles.username}>{username}</Text>
		<View style={styles.starBar}>
			<StarBar rating={rating} size={15}/>
		</View>
		<Text>{message}</Text>
	</View>
)

export default class Comment extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		const { user, description, rating } = this.props.comment
		return (
			<View style={styles.container}>
				<ProfilePicture image_url={user.profile_url}/>
				<Content username={user.name} rating={rating} message={description}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '80%'
	},
	content: {
		flexDirection: 'column',
		marginLeft: 5
	},
	username: {
		fontWeight: 'bold'
	},
	starBar: {
		marginTop: 2,
		marginBottom: 2
	}
})