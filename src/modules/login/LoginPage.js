import { AccessToken, LoginManager } from 'react-native-fbsdk'
import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button } from 'react-native-elements'
import UserActions from 'src/redux/actions/user'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import images from 'src/constants/images'
import { APP_FULL_WIDTH, APP_FULL_HEIGHT } from 'src/constants'

export class LoginPage extends Component {
	constructor(props) {
		super(props)
	}

	_fbAuth() {
		var self = this
		LoginManager.logInWithReadPermissions([
			'public_profile',
			'user_friends'
		]).then(
			function(result) {
				if (result.isCancelled) {
					console.log('Loging was cancelled')
				} else {
					console.log(
						'Login was a success' + result.grantedPermissions.toString()
					)
					AccessToken.getCurrentAccessToken().then(data => {
						const token = data.accessToken.toString()
						console.log('token', token)
						self.props.loginWithFacebook(token)
					})
				}
			},
			function(error) {
				console.log('Login had an error occured')
			}
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
					<Image
						source={images.logo}
						style={styles.product_image}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="SIGN IN WITH FACEBOOK"
						backgroundColor={colors.blueFacebook}
						onPress={() => this._fbAuth()}
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
		backgroundColor: colors.orange,
		justifyContent: 'center'
	},
	buttonContainer: {
		paddingLeft: 10,
		paddingRight: 10
	},
	signinBtn: {
		borderRadius: 2
	},
	product_image: {
		height: APP_FULL_HEIGHT*0.7
	}
})

const mapDispatchToProps = dispatch => ({
	loginWithFacebook: token => {
		dispatch(UserActions.loginWithFacebook(token))
	}
})

export default connect(null, mapDispatchToProps)(LoginPage)
