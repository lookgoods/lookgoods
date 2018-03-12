import { StyleSheet, Image, View, Text } from 'react-native'
import React, { Component } from 'react'
import CoverImage from 'src/modules/shares/CoverImage'

export default class UserPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		const { size, image_url } = this.props
		return (
			<View style={styles.userphotoBody}>
				<CoverImage size={size} url={image_url}/>
				<View style={styles.usernameContainer}>
					<Text style={styles.usernameText}>{this.props.username}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	userphotoBody:{
		justifyContent: 'center',
		alignItems: 'center'
	},
	usernameContainer: {
		marginTop: 5
	},
	usernameText: {
		fontSize: 18
	}
})
