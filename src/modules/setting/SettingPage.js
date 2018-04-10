import { List, ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native'
import { LoginManager } from 'react-native-fbsdk'

import { Actions } from 'react-native-router-flux'
import { colors } from 'src/constants/mixins'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'

class SettingPage extends Component {
	constructor (props) {
		super(props)
	}

	logout() {
		Alert.alert(
			'Logout',
			'Are you sure ?',
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					LoginManager.logOut()
					Actions.loginPage()
				}}
			]
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<List>
					<ListItem
						title='Change Profile Status'
						onPress={ () => Actions.changeStatusPage() }
					/>
				</List>
				<List>
					<ListItem
						title='Find Reviewer'
						onPress={ () => this.props.viewReviewer() }
					/>
				</List>
				<List>
					<ListItem
						title={<Text style={styles.logoutText}>Logout</Text>}
						onPress={ () => this.logout() }
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
		fontSize: 16,
		marginLeft: 10
	}
})

const mapDispatchToProps = dispatch => ({
	viewReviewer: () => {
		dispatch(UserActions.viewReviewer())
	}
})

export default connect(null, mapDispatchToProps)(SettingPage)