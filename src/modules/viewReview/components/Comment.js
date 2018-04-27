import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import { colors } from 'src/constants/mixins'
import validate from 'src/services/validate'
import CoverImage from 'src/modules/shares/CoverImage'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { connect } from 'react-redux'
import CommentActions from 'src/redux/actions/comment'
import Toast from 'react-native-simple-toast'

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} uri={image_url}/>
	</View>
)

class Comment extends Component {
	constructor (props) {
		super(props)
		this.state = {
			rating: 0,
			description: '',
			descriptionErr: ''
		}
	}

	async componentDidMount() {
		await this.setState({
			rating: this.props.comment.rating,
			description: this.props.comment.description
		})
	}

	async saveEditComment(rating, comment_id) {
		const descriptionErr = validate(['description'], [this.state.description.trim()])
		await this.setState({ descriptionErr })

		if (!descriptionErr) {
			const comment = {description: this.state.description, rating: rating}
			this.props.editComment(comment, this.props.review._id, comment_id)
			this.props.setEditComment(null)
		} else {
			Toast.show('กรุณาแสดงความคิดเห็น', Toast.SHORT)
		}		
	}

	async handleChangeRating(rating) {
		await this.setState({ rating })
	}
	
	render() {
		const { user, _id } = this.props.comment
		return (
			<View style={styles.container}>
				<ProfilePicture image_url={user.picture_url}/>
				<View style={styles.content}>
					<Text style={styles.username}>{user.name}</Text>
					
					{ _id !== this.props.editCommentId ?
						<View>
							<View style={styles.starBar}>
								<StarBar rating={this.state.rating} size={15} type='view'/>
							</View>
							<Text style={styles.textLabel}>{this.state.description}</Text>
						</View> :
						<View>
							<View style={styles.starBar}>
								<StarBar rating={this.state.rating} handleChangeRating={(rating) => this.handleChangeRating(rating)} size={25} type={'edit'}/>
							</View>
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
							</View>
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
								<View style={{alignItems: 'flex-end', flexDirection: 'row', marginRight: 15 }}>
									<TouchableOpacity style={styles.buttonCancel} onPress={() => this.props.setEditComment(null)}>
										<Text style={styles.fontCancel}>Cancel</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.buttonSave} onPress={() => this.saveEditComment(this.state.rating, _id)}>
										<Text style={styles.fontSave}>Save</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					}
				</View>
			</View>
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
		marginLeft: 5
	},
	username: {
		fontWeight: 'bold'
	},
	starBar: {
		marginTop: 2,
		marginBottom: 2
	},
	textLabel: {
		color: colors.gray6,
		fontSize: 15
	},
	textInput: {
		fontSize: 15,
		color: colors.gray6,
		minHeight: 20,
		paddingTop: 0,
		paddingBottom: 0
	},
	fontCancel: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.gray2
	},
	fontSave: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.blue
	},
	buttonCancel: {
		marginTop: 5,
		marginRight: 10,
		borderRadius: 3
	},
	buttonSave: {
		marginTop: 5,
		marginRight: 0,
		borderRadius: 3
	},
	bodyTextInput: {
		flex: 1,
		marginTop: 5,
		marginRight: 15,
		padding: 5,
		borderColor: '#dfdfdf',
		borderWidth: 1
	}
})
 
const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,   
	editCommentId: state.commentReducer.editCommentId
})

const mapDispatchToProps = dispatch => ({
	editComment: (comment, review_id, comment_id) => {
		dispatch(CommentActions.editComment(comment, review_id, comment_id))
	},
	setEditComment: (comment_id) => {
		dispatch(CommentActions.setEditComment(comment_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
