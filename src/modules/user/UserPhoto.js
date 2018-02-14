import {
    StyleSheet,
		Image,
		View,
		Text
} from 'react-native'
import React, { Component } from 'react'

export default class UserPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View>
				<Image
						source={require('src/assets/images/profile.jpg')}
						style={styles.profile_image}
						resizeMode='cover'
				/>
				<View style={styles.usernameContainer}>
					<Text>{this.props.username}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	profile_image: {
			width: 120,
			height: 120,
			borderRadius: 80
	},
	usernameContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})
