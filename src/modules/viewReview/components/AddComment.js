import {
	Button,
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

class AddComment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			descriptionErr: '',
			rating: 0,
			stars: ['star-o', 'star-o', 'star-o', 'star-o', 'star-o']
		}
	}

	changeRating(index) {
		var stars = []
		for (let i = 0; i < 5; i++) {
			if (i < index + 1) stars.push('star')
			else stars.push('star-o')
		}

		this.setState({
			rating: index + 1,
			stars: stars
		})
	}

	async addComment() {
		const descriptionErr = validate(['description'], [this.state.description.trim()])
		await this.setState({ descriptionErr })

		if (!descriptionErr) {
			const comment = {
				description: this.state.description.trim(), 
				rating: this.state.rating
			}
			this.props.addComment(comment)
		} else {
			Toast.show('กรุณาแสดงความคิดเห็น', Toast.SHORT)
		}
	}

	checkUserComment(comment_list) {
		const commentsUser = comment_list.filter((item) => item.user._id === this.props.currentUser._id)
		if (commentsUser.length > 0) return true
		return false
	}

	render() {
		const { picture_url } = this.props.currentUser
		return (
			this.props.success && (
				<View>
					{ this.checkUserComment(this.props.comments) ? 
						<View/> :
						<View style={{ marginTop: 10, marginBottom: 50 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								<CoverImage uri={picture_url} size={80} />
							</View>
							<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
								<Text style={{ fontSize: 12, color: colors.gray6 }}>Tap to rate</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: 10
								}}
							>
								<View style={{ flexDirection: 'row' }}>
									{this.state.stars.map((item, index) => (
										<TouchableOpacity
											key={index}
											onPress={() => this.changeRating(index)}
										>
											<IconFontAwesome
												style={styles.star}
												name={this.state.stars[index]}
												size={40}
												color={colors.yellow}
											/>
										</TouchableOpacity>
									))}
								</View>
							</View>
							{this.state.rating !== 0 && (
								<View style={{ flexDirection: 'row', marginTop: 10}}>
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
									<TouchableOpacity style={styles.buttonSend} onPress={() => this.addComment()}>
										<IconIonicons name='md-send' size={30}/>
									</TouchableOpacity>
								</View>
							)}
						</View>
					}
				</View>
			)
		)
	}
}


const styles = StyleSheet.create({
	star: {
		marginRight: 5
	},
	textInput: {
		flex: 1,
		color: colors.gray6,
		fontSize: 15,
		minHeight: 35,
		padding: 0
	},
	buttonSend: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		marginBottom: 3,
		right: 8,
		borderRadius: 3
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		borderColor: '#dfdfdf',
		borderWidth: 1,
		borderRadius: 3,
		justifyContent: 'center',
		backgroundColor: '#FFF',
		paddingHorizontal: 15
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	comments: state.commentReducer.comments,
	success: state.commentReducer.success
})

export default connect(mapStateToProps, null)(AddComment)
