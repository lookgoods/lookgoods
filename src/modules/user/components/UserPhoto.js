import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CoverImage from 'src/modules/shares/CoverImage'
import { colors } from 'src/constant/mixins'

export default class UserPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		const { size, image_url } = this.props
		return (
			<View style={styles.userphotoBody}>
				<CoverImage size={size} uri={image_url}/>
				<View style={styles.usernameContainer}>
					<Text style={styles.usernameText}>{this.props.username}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	userphotoBody: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	usernameContainer: {
		marginTop: 5
	},
	usernameText: {
		fontSize: 18,
		color: colors.gray
	}
})
