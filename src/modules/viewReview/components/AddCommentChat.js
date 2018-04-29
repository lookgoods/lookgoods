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

class AddCommentChat extends Component {
	constructor(props) {
		super(props)
		this.socket = SocketIOClient(constants.AppURL)
		this.state = {
			description: '',
			descriptionErr: ''
		}
	}

	async addChat() {
		const descriptionErr = validate(['description'], [this.state.description.trim()])
		await this.setState({ descriptionErr })

		if (!descriptionErr) {
			const chat = {
				description: this.state.description.trim() 
			}
			await this.props.addChat(chat)
			this.notify()
		} else {
			Toast.show('กรุณาแสดงความคิดเห็น', Toast.SHORT)
		}
	}
	
	notify() {
		const user_list = []
		user_list.push(this.props.review.user._id)
		this.props.chats.map((chat) => {
			user_list.push(chat.user._id)
		})

		this.socket.emit('notify', JSON.stringify({ followerList: user_list }))
	}
  
	render() {
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
							<TouchableOpacity style={styles.buttonSend} onPress={() => this.addChat()}>
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
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	chats: state.chatReducer.chats,
	success: state.commentReducer.success,
	review: state.reviewReducer.currentReview
})

export default connect(mapStateToProps, null)(AddCommentChat)
