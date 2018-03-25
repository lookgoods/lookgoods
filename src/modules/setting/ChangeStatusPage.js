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
				<View style={styles.toCenter}>
					<Text style={styles.statusText}>Change your status</Text>
				</View>
				<View style={styles.toCenter}>
					<View style={styles.textBox}>
						<TextInput 
							placeholder='Type your status'
							multiline={true}
							style={styles.textInput}
							underlineColorAndroid='transparent'
						/>
					</View>
				</View>
				<View style={styles.toCenter}>
					<View style={styles.buttonContainer}>
						<Button title='Save' color={colors.meat}/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	statusText: {
		fontSize: 16,
		marginTop: 20,
		fontWeight: 'bold'
	},
	textBox: {
		backgroundColor: colors.lightGray,
		marginTop: 30,
		width: '90%'
	},
	textInput: {
		width: 300,
		padding: 10,
		borderRadius: 5
	},
	buttonContainer: {
		marginTop: 30,
		width: 80
	},
	toCenter: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
})
