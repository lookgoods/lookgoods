import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import Comment from 'src/modules/viewReview/components/Comment'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import CommentActions from 'src/redux/actions/comment'

function countRatingFrequency(comment_list) {
	let rating_frequency_list = [0, 0, 0, 0, 0]
	for (const comment of comment_list) {
		rating_frequency_list[5-comment.rating]++ 
	}
	return rating_frequency_list
}

function RatingFrequency ({ comment_list }) {
	const rating_frequency_list = countRatingFrequency(comment_list)
	return (
		<View style={styles.ratingFrequencyPanel}>
			{ rating_frequency_list.map((rating_count, index) => (
				<View style={styles.ratingRow} key={index}>
					<StarBar rating={5-index} size={20}/>
					<View style={styles.progressBar}>
						<View style={{ height: 15, width: `${rating_count/(comment_list.length)*100}%`, backgroundColor: colors.darkBlue}}/>
					</View>
					<Text>{rating_count}</Text>
				</View>
			))}
		</View>
	)
}
    
class CommentSection extends Component {
	constructor (props) {
		super(props)
		this.state = {
			comment_list: [],
			indexComment: -1
		}
	}

	async componentWillReceiveProps(nextProps) {
		console.log(nextProps)
		await this.setState({comment_list: nextProps.comments})
	}

	async showActionSheet(index) {
		await this.setState({ indexComment: index})
		this.ActionSheet.show()
	}
	// editComment={(comment, review_id, comment_id) => this.props.editComment(comment, review_id, comment_id)} 
	// deleteComment={(review_id, comment_id) => this.props.deleteComment(review_id, comment_id)}
	optionsSelect(index) {
		const comment_list = this.props.comments
		if (index === 0) {
			// this.props.editComment(comment, this.props.review._id, comment_id)
		} else if (index === 1) {
			// console.log(this.state.indexComment)
			// console.log(this.props.review._id, comment_list[this.state.indexComment], '<3 <3 <3')
			this.props.deleteComment(this.props.review._id, comment_list[this.state.indexComment]._id)
		}
	}

	render() {
		console.log(this.state.comment_list, 'comment_list')
		return (
			this.props.success && (
				<View>
					{this.state.comment_list.length <= 0 ? <View/> :
						<View>
							<Divider style={styles.divider} />
							<View>
								<Text style={styles.totalText}>{this.state.comment_list.length} Reviews</Text>
								<RatingFrequency comment_list={this.state.comment_list}/>
								<View style={styles.commentList}>
									{ this.state.comment_list.map((comment, index) => (
										<View key={index}>
											<TouchableOpacity 
												delayLongPress={1000} 
												onLongPress = {() => this.showActionSheet(index)}>
												<View style = {styles.commentItem} >
													<Comment comment={comment}/>
												</View>
											</TouchableOpacity>
										</View>
									))}
								</View>
							</View> 
							<ActionSheet
								ref={o => this.ActionSheet = o}
								options={['Edit', 'Delete', 'Cancel']}
								cancelButtonIndex={2}
								destructiveButtonIndex={1}
								onPress={(index) => this.optionsSelect(index)}
							/>
						</View>
					}
				</View>
			)
		)
	}
}

const styles = StyleSheet.create({
	totalText: {
		fontWeight: 'bold',
		marginTop: 15,
		marginLeft: 30
	},
	ratingRow: {
		flexDirection: 'row'
	},
	ratingFrequencyPanel: {
		marginTop: 10,
		marginLeft: 20,
		marginBottom: 20
	},
	progressBar: {
		backgroundColor: colors.lightGray,
		height: 15,
		width: 200,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10
	},
	commentList: {
		marginLeft: 20
	},
	commentItem: {
		marginBottom: 20
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	comments: state.commentReducer.comments,
	success: state.commentReducer.success
})

export default connect(mapStateToProps, null)(CommentSection)
