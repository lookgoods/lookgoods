import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import { colors } from 'src/constants/mixins'
import CoverImage from 'src/modules/shares/CoverImage'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { connect } from 'react-redux'
import CommentActions from 'src/redux/actions/comment'

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} uri={image_url}/>
	</View>
)

// const Content = ({ username, rating, message }) => (
// 	<View style={styles.content}>
// 		<Text style={styles.username}>{username}</Text>
// 		<View style={styles.starBar}>
// 			<StarBar rating={rating} size={15}/>
// 		</View>
// 		{/* <Text>{message}</Text> */}
// 		<View style={{ flexDirection: 'row', marginTop: 10 }}>
// 			<View style={styles.bodyTextInput}>
// 				<TextInput
// 					style={styles.textInput}
// 					multiline
// 					maxHeight={300}
// 					underlineColorAndroid="transparent"
// 					onChangeText={description => this.setState({ description })}
// 					value={this.state.description}
// 					keyboardType="default"
// 					// onBlur={() => {
// 					// 	this.setState({
// 					// 		titleErr: validate(['title'], [this.state.title])
// 					// 	})
// 					// }}
// 					// error={this.state.titleErr}
// 				/>
// 			</View>
// 			<TouchableOpacity style={styles.buttonSend} onPress={() => this.addComment()}>
// 				<Text style={styles.fontSend}>Send</Text>
// 			</TouchableOpacity>
// 		</View>
// 	</View>
// )

class Comment extends Component {
	constructor (props) {
		super(props)
		this.state = {
			description: ''
		}
	}

	async componentDidMount() {
		await this.setState({description: this.props.comment.description})
	}

	saveEditComment(rating, comment_id) {
		console.log(this.state.description)
		const comment = {description: this.state.description, rating: rating}
		console.log(comment)
		this.props.editComment(comment, this.props.review._id, comment_id)
		this.props.setEditComment(this.props.review._id, null)
	}

	render() {
		const { user, rating, _id } = this.props.comment
		// console.log(this.props, 'props')
		console.log(this.props.comment, 'comment')
		// console.log(this.props.editCommentId, 'editCommentId')
		return (
			<View style={styles.container}>
				<ProfilePicture image_url={user.picture_url}/>
				<View style={styles.content}>
					<Text style={styles.username}>{user.name}</Text>
					<View style={styles.starBar}>
						<StarBar rating={rating} size={15}/>
					</View>
					{ _id !== this.props.editCommentId ?
						<Text>{this.state.description}</Text> :
						<View>
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
										// onBlur={() => {
										// 	this.setState({
										// 		titleErr: validate(['title'], [this.state.title])
										// 	})
										// }}
										// error={this.state.titleErr}
									/>
								</View>
							</View>
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
								<View style={{alignItems: 'flex-end', flexDirection: 'row', marginRight: 15 }}>
									<TouchableOpacity style={styles.buttonCancel} onPress={() => this.props.setEditComment(this.props.review._id, null)}>
										<Text style={styles.fontCancel}>Cancel</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.buttonSave} onPress={() => this.saveEditComment(rating, _id)}>
										{/* <TouchableOpacity style={styles.buttonSave} onPress={() => this.props.editCommentMessage({ description: this.state.description, rating }, this.props.review._id, _id)}> */}
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
	textInput: {
		fontSize: 15,
		color: colors.black,
		minHeight: 10,
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
	setEditComment: (review_id, comment_id) => {
		dispatch(CommentActions.setEditComment(review_id, comment_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
