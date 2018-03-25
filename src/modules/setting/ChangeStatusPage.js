import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native'

import { colors } from 'src/constants/mixins'

export default class ChangeStatusPage extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Change your status</Text>
				<TextInput 
					placeholder='Type your status'
					multiline={true}
				/>
				<Button title='Save' />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
})
