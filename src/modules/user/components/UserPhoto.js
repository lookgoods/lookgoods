import { StyleSheet, Image, View, Text } from 'react-native'
import React, { Component } from 'react'

export default class UserPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View>
				<View style={styles.imageContainer}>
					{ this.props.image_url ?
						<Image
							source={this.props.image_url}
							style={styles.profile_image}
							resizeMode='cover'
						/> :
						<View/>
					}
				</View>
				<View style={styles.usernameContainer}>
					<Text style={styles.usernameText}>{this.props.username}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	profile_image: {
		width: 120,
		height: 120,
		borderRadius: 90
	},
	imageContainer: {
		alignItems: 'center'
	},
	usernameContainer: {
		marginTop: 5
	},
	usernameText: {
		fontSize: 18
	}
})
