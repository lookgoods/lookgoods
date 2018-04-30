import React, { Component } from 'react'
import { Platform, StyleSheet, View, ActivityIndicator } from 'react-native'
import CommentSection from 'src/modules/viewReview/components/CommentSection'
import ContentSection from 'src/modules/viewReview/components/ContentSection'
import NavBarViewReview from 'src/modules/viewReview/components/NavBarViewReview'
import SameProductSection from 'src/modules/viewReview/components/SameProductSection'
import UserActions from 'src/redux/actions/user'
import CommentActions from 'src/redux/actions/comment'
import SearchActions from 'src/redux/actions/search'
import ChatActions from 'src/redux/actions/chat'
import ReviewActions from 'src/redux/actions/review'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Divider } from 'react-native-elements'
import DeletedReview from 'src/modules/viewReview/components/DeletedReview'

export class ViewReviewPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollHeight: 0
		}
	}

	componentDidMount() {
		if (this.props.review_id) {
			this.fetchReview()
		}
		this.props.getCurrentUser()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.review !== prevProps.review) {
			if (this.props.review) {
				this.props.searchByProductExceptMe(this.props.review.product.name, this.props.review._id)	
			}
		}
	}

	componentWillUnmount() {
		this.props.popHistoryReview()
	}

	fetchReview() {
		this.props.getReview(this.props.review_id)
	}

	render() {
		let self = this
		if (!this.props.review) {
			if (this.props.loading) {
				return (<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
				</View>)
			}
			return <View/>
		}
		if (this.props.focus) {
			if (this.props.focus === 'review' && this.props.successComment) {
				setTimeout(() => {
					self.scrollView.scrollToEnd()
				}, 1)
			}
			if (this.props.focus === 'comment' && this.props.successChat) {
				setTimeout(() => {
					self.scrollView.scrollToEnd()
				}, 1)
			}
		}
		if (!this.props.review.available) {
			return <DeletedReview/>
		}
		return (
			<KeyboardAwareScrollView
				style={{ backgroundColor: colors.white }}
				resetScrollToCoords={{ x: 0, y: 0 }}
				scrollEnabled={true}
				ref={ref => this.scrollView = ref}
			>
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
					{ this.props.review && 
							<View>
								<ContentSection review={this.props.review} />
								<Divider style={styles.divider} />
								<SameProductSection />
							</View>
					}
					<CommentSection 
						review={this.props.review}
						addComment={(comment) => this.props.addComment(comment, this.props.review._id)}
						deleteComment={(review_id, comment_id) => this.props.deleteComment(review_id, comment_id)}
						setEditComment={(comment_id) => this.props.setEditComment(comment_id)}
						addChat={(chat) => this.props.addChat(chat, this.props.review._id)}
						deleteChat={(review_id, chat_id) => this.props.deleteChat(review_id, chat_id)}
						setEditChat={(chat_id) => this.props.setEditChat(chat_id)}
						onFocus={ this.props.focus === 'review' ? 1 : 0 }
						getComments={() => this.props.getComments(this.props.review._id)}
						getChats={() => this.props.getChats(this.props.review._id)}
					/>
				</View>
			</KeyboardAwareScrollView>
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
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	}
})

const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,
	currentUser: state.userReducer.currentUser,
	loading: state.reviewReducer.loading,
	successChat: state.chatReducer.success,
	successComment: state.commentReducer.success
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
	},
	searchByProductExceptMe: (product_name, review_id) => {
		dispatch(SearchActions.searchByProductExceptMe(product_name, review_id))
	},
	popHistoryReview: () => {
		dispatch(ReviewActions.popHistoryReview())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviewPage)
