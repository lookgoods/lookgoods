import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'
import validate from 'src/services/validate'
import CoverImage from 'src/modules/shares/CoverImage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-simple-toast'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import SocketIOClient from 'socket.io-client'
import constants from 'src/redux/constants'

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} uri={image_url}/>
	</View>
)

class AddComment extends Component {
	constructor(props) {
		super(props)
		this.socket = SocketIOClient(constants.AppURL)
		this.state = {
			description: '',
			descriptionErr: ''
		}
	}

	async addComment() {
		const descriptionErr = validate(['description'], [this.state.description.trim()])
		await this.setState({ descriptionErr })

		if (!descriptionErr) {
			const comment = {
				description: this.state.description.trim(), 
				rating: this.state.rating
			}
			await this.props.addComment(comment)
			this.notify()
		} else {
			Toast.show('กรุณาแสดงความคิดเห็น', Toast.SHORT)
		}
	}
  
	render() {
		console.log(this.props.user, 'add comment user')
		const { picture_url, name } = this.props.user
		return (
			this.props.success && (
				<View style={styles.container}>
					<ProfilePicture image_url={picture_url}/>
					<View style={styles.content}>
						<Text style={styles.username}>{name}</Text>
						<View style={{ flex: 1, flexDirection: 'row'}}>
							<View style={styles.bodyTextInput}>
								<TextInput
									style={styles.textInput}
									multiline
									maxHeight={300}
									underlineColorAndroid="transparent"
									onChangeText={description => this.setState({ description })}
									value={this.state.description}
									keyboardType="default"
									onBlur={() => {
										this.setState({
											descriptionErr: validate(['description'], [this.state.description])
										})
									}}
									error={this.state.descriptionErr}
								/>
							</View>
							<TouchableOpacity style={styles.buttonSend}>
								<IconIonicons name='md-send' size={25}/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '95%'
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 5,
		marginLeft: 5
	},
	username: {
		fontWeight: 'bold'
	},
	textInput: {
		fontSize: 15,
		color: colors.gray6,
		minHeight: 15,
		paddingTop: 0,
		paddingBottom: 0
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 5,
		marginRight: 15,
		padding: 5,
		borderColor: '#dfdfdf',
		borderWidth: 1,
		borderRadius: 3
	},
	buttonSend: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginBottom: 5,
		right: 8
	}
	// fontCancel: {
	// 	fontSize: 15,
	// 	fontWeight: 'bold',
	// 	color: colors.gray2
	// },
	// fontSave: {
	// 	fontSize: 15,
	// 	fontWeight: 'bold',
	// 	color: colors.blue
	// },
	// buttonCancel: {
	// 	marginTop: 5,
	// 	marginRight: 10,
	// 	borderRadius: 3
	// },
	// buttonSave: {
	// 	marginTop: 5,
	// 	marginRight: 0,
	// 	borderRadius: 3
	// }
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	comments: state.commentReducer.comments,
	success: state.commentReducer.success,
	review: state.reviewReducer.currentReview
})

export default connect(mapStateToProps, null)(AddComment)
