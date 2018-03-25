import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from 'src/constants/mixins'

export default class InfoText extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.number}>{this.props.number}</Text>
				<Text style={styles.text}>{this.props.title}</Text>
			</View>
		)
	}
}
  
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	number: {
		color: colors.orange,
		fontSize: 25
	},
	text: {
		fontSize: 12,
		color: colors.gray
	}
})