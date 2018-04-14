import React, { Component } from 'react'
import {
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native'

import { colors } from 'src/constants/mixins'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'
import NavBar from 'src/modules/shares/NavBar'

export class ChangeStatusPage extends Component {
	constructor (props) {
		super(props)
		this.state = {
			description: ''
		}
	}

	componentDidMount() {
		if (this.props.currentUser.description) {
			this.setState({ description: this.props.currentUser.description })
		}
	}

	saveButtonClick() {
		this.props.changeUserStatus(this.state.description)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName='Change Status' />
					</View>
				</View>
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
							value={this.state.description}
							onChangeText={(description) => this.setState({ description })}
						/>
					</View>
				</View>
				<View style={styles.toCenter}>
					<View style={styles.buttonContainer}>
						<Button title='Save' color={colors.meat} onPress={() => this.saveButtonClick()}/>
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
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
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

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	changeUserStatus: (description) => {
		dispatch(UserActions.changeUserDescription(description))
	}       
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusPage)