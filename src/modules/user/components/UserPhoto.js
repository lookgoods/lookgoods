import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CoverImage from 'src/modules/shares/CoverImage'
import { colors } from 'src/constants/mixins'

export default class UserPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		const { size, image_url, username, description } = this.props
		return (
			<View style={styles.userphotoBody}>
				<CoverImage size={size} uri={image_url}/>
				<View style={styles.usernameContainer}>
					<Text style={styles.usernameText}>{username}</Text>
				</View>
				<View style={styles.descriptionContainer}>
					<View style={{ width: '80%' }}>
						{ (description !== '' & description)
							?<Text style={{ lineHeight: 22 }}>{description}</Text>
							:<Text style={{ lineHeight: 22, color: colors.gray2}}>{'You can add/change your status in settings'}</Text>
						}
					</View>
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
	},
	descriptionContainer: {
		flexDirection: 'row', 
		justifyContent: 'center', 
		marginTop: 10
	}
})
