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
	}

	showActionSheet() {	
		this.ActionSheet.show()
	}

	render() {
		const comment_list = this.props.comments
		return (
			this.props.success && (
				<View>
					{comment_list.length === 0 ? <View/> :
						<View>
							<Text onPress={() => this.showActionSheet()}>Open ActionSheet</Text>
							<Divider style={styles.divider} />
							<View>
								<Text style={styles.totalText}>{comment_list.length} Reviews</Text>
								<RatingFrequency comment_list={comment_list}/>
								<View style={styles.commentList}>
									{ comment_list.map((comment, index) => (
										<View key={index} >
											<TouchableOpacity 
												delayLongPress={1000} 
												onLongPress ={() => this.showActionSheet()}>
												<View style={styles.commentItem} >
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
								onPress={(index) => { console.log(index, 'index') }}
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

const mapDispatchToProps = dispatch => ({
	editComment: (comment, review_id, comment_id) => {
		dispatch(CommentActions.editComment(comment, review_id, comment_id))
	},
	deleteComment: (review_id, comment_id) => {
		dispatch(CommentActions.deleteComment(review_id, comment_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection)
