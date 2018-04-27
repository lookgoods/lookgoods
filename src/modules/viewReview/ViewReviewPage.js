import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import CommentSection from 'src/modules/viewReview/components/CommentSection'
import ContentSection from 'src/modules/viewReview/components/ContentSection'
import NavBarViewReview from 'src/modules/viewReview/components/NavBarViewReview'
import UserActions from 'src/redux/actions/user'
import CommentActions from 'src/redux/actions/comment'
import ChatActions from 'src/redux/actions/chat'
import ReviewActions from 'src/redux/actions/review'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

export class ViewReviewPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollHeight: 0
		}
	}

	async componentDidMount() {
		await this.props.getCurrentUser()
		if (this.props.review_id) {
			await this.fetchReview()
			await this.props.getComments(this.props.review_id)
			await this.props.getChats(this.props.review_id)
		} else {
			await this.props.getComments(this.props.review._id)
			await this.props.getChats(this.props.review._id)
		}
	}

	fetchReview() {
		this.props.getReview(this.props.review_id)
	}

	render() {
		if (!this.props.review) {
			if (this.props.loading) {
				return (<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>)
			}
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarViewReview 
							review={this.props.review}
							currentUser={this.props.currentUser}
							deleteReview={(review_id) => this.props.deleteReview(review_id)}
						/>
					</View>
				</View>
				<ScrollView 
					ref={ref => this.scrollView = ref}
					onContentSizeChange={(contentWidth, contentHeight) => {
						this.setState({ scrollHeight: contentHeight })
					}}
				>
					{ this.props.review && 
						<ContentSection review={this.props.review} />
					}
					<CommentSection 
						review={this.props.review}
						addComment={(comment) => this.props.addComment(comment, this.props.review._id)}
						deleteComment={(review_id, comment_id) => this.props.deleteComment(review_id, comment_id)}
						setEditComment={(comment_id) => this.props.setEditComment(comment_id)}
						addChat={(chat) => this.props.addChat(chat, this.props.review._id)}
						deleteChat={(review_id, chat_id) => this.props.deleteChat(review_id, chat_id)}
					/>
				</ScrollView>
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
		backgroundColor: colors.transparent,
		overflow: 'hidden',
		zIndex: 1
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,
	currentUser: state.userReducer.currentUser,
	loading: state.reviewReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	},
	addComment: (comment, review_id) => {
		dispatch(CommentActions.addComment(comment, review_id))
	},
	getComments: (review_id) => {
		dispatch(CommentActions.getComments(review_id))
	},
	deleteComment: (review_id, comment_id) => {
		dispatch(CommentActions.deleteComment(review_id, comment_id))
	},
	setEditComment: (comment_id) => {
		dispatch(CommentActions.setEditComment(comment_id))
	},
	deleteReview: (review_id) => {
		dispatch(ReviewActions.deleteReview(review_id))
	},
	getReview: (review_id) => {
		dispatch(ReviewActions.getReview(review_id))
	},
	addChat: (chat, review_id) => {
		dispatch(ChatActions.addChat(chat, review_id))
	},
	getChats: (review_id) => {
		dispatch(ChatActions.getChats(review_id))
	},
	deleteChat: (review_id, chat_id) => {
		dispatch(ChatActions.deleteChat(review_id, chat_id))
	},
	setEditChat: (chat_id) => {
		dispatch(ChatActions.setEditChat(chat_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviewPage)
