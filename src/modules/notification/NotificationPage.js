import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native'
import React, { Component } from 'react'

import NavBar from 'src/modules/shares/NavBar'

export default class NotificationPage extends Component {
	constructor (props) {
		super(props)
    
	}
  
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<Text>Notification</Text>
				</View>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="NotificationPage"/>
					</View>
				</View>
			</View>
		)
	}
}
  
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	body: {
		marginTop: Platform.OS === 'ios' ? 75 : 60
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		overflow: 'hidden',
		zIndex: 1
	}
})