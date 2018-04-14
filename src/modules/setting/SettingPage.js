import { List, ListItem } from 'react-native-elements'
import React, { Component } from 'react'
import {
	Platform,
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
import NavBar from 'src/modules/shares/NavBar'

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
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName='Settings' />
					</View>
				</View>
				<List>
					<ListItem
						title={<Text style={styles.itemText}>Change Profile Status</Text>}
						onPress={ () => Actions.changeStatusPage() }
					/>
				</List>
				<List>
					<ListItem
						title={<Text style={styles.itemText}>Find People</Text>}
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
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	},
	itemText: {
		color: colors.gray,
		fontSize: 16
	},
	logoutText: {
		color: colors.blueFacebook,
		fontSize: 16
	}
})

const mapDispatchToProps = dispatch => ({
	viewReviewer: () => {
		dispatch(UserActions.viewReviewer())
	}
})

export default connect(null, mapDispatchToProps)(SettingPage)