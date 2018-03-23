import FBSDK, { LoginManager } from 'react-native-fbsdk'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import UserActions from 'src/redux/actions/user'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

const { AccessToken } = FBSDK

export class LoginPage extends Component {

	constructor (props) {
		super(props)

	}

	_fbAuth() {
		var self = this
		LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']).then(function(result) {
			if (result.isCancelled) {
				console.log('Loging was cancelled')
			} else {
				console.log('Login was a success' + result.grantedPermissions.toString())
				AccessToken.getCurrentAccessToken().then(
					(data) => {
						const token = data.accessToken.toString()
						console.log('token', token)
						self.props.loginWithFacebook(token)
						Actions.tabMenu()
					}
				)
			}
		}, function(error) {
			console.log('Login had an error occured')
		})
	}

	render() {
        
		return (
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<Button 
						title='SIGN IN WITH FACEBOOK' 
						backgroundColor={colors.blueFacebook}
						onPress={ () => this._fbAuth() }
						buttonStyle={styles.signinBtn}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row'
	},
	buttonContainer: {
		marginBottom: 100,
		flex: 1,
		justifyContent: 'flex-end',
		paddingLeft: 10,
		paddingRight: 10
	},
	signinBtn: {
		borderRadius: 2
	}
})

const mapDispatchToProps = dispatch => ({
	loginWithFacebook: token => {
		dispatch(UserActions.loginWithFacebook(token))
	}         
})

export default connect(null, mapDispatchToProps)(LoginPage)