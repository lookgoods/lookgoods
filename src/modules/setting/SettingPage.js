import { List, ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import { colors } from 'src/constants/mixins'

export default class SettingPage extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<List>
					<ListItem
						title={<Text style={styles.logoutText}>Logout</Text>}
					/>
				</List>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightGray
	},
	logoutText: {
		color: colors.red,
		fontSize: 16
	}
})
