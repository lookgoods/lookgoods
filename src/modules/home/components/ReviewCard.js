import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import CoverImage from 'src/modules/shares/CoverImage'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ReviewActions from 'src/redux/actions/review'
import UserActions from 'src/redux/actions/user'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import icons from 'src/constants/icons'
import { APP_FULL_WIDTH } from 'src/constants'
import moment from 'moment'
import { ShareDialog } from 'react-native-fbsdk'


const ProfilePicture = ({ image_url }) => {
	return <CoverImage size={50} uri={image_url} />
}

const BookMark = ({ isActive, clickBookmark }) => {
	return (
		<TouchableOpacity style={styles.bookmark} onPress={clickBookmark}>
			{isActive ? (
				<IconMaterial name="bookmark" color={colors.orage} size={36} />
			) : (
				<IconMaterial name="bookmark-border" size={36} />
			)}
		</TouchableOpacity>
	)
}

function goToUserPage(user, setUser) {
	setUser(user)
	Actions.viewUserPage()
}

function getTimeText(time) {
	if (Math.abs(moment().diff(time)) < 25000) { // 25 seconds before or after now
		return 'Just now'
	}
	return moment(time).fromNow()
}

function Header({ user, time, isSaved, setUser, clickBookmark, showBookmark }) {
	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity
				onPress={() => goToUserPage(user, setUser)}
				style={styles.profilePicture}
			>
				<ProfilePicture image_url={user.picture_url} />
			</TouchableOpacity>
			<View style={styles.headerWrapper}>
				<TouchableOpacity onPress={() => goToUserPage(user, setUser)}>
					<Text style={styles.reviewerName}>{user.name}</Text>
				</TouchableOpacity>
				<Text style={styles.timeText}>{getTimeText(time)}</Text>
			</View>
			{ showBookmark && <BookMark isActive={isSaved} clickBookmark={clickBookmark} /> }
		</View>
	)
}

const ProductPicture = ({ image_url, review, setReview, imageSize }) => {
	return (
		<View style={{ backgroundColor: colors.lightGray2 }}>
			<TouchableOpacity
				onPress={() => {
					setReview(review)
					Actions.viewReviewPage()
				}}
			>
				<Image
					style={styles.productImage}
					source={{ uri: image_url }}
					resizeMode={ imageSize.width > imageSize.height ? 'cover' : 'contain' }
				/>
			</TouchableOpacity>
		</View>
	)
}

function Body({ product_url, title, review, setReview, imageSize }) {
	return (
		<View>
			<ProductPicture
				image_url={product_url}
				review={review}
				setReview={setReview}
				imageSize={imageSize}
			/>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}

function Footer({ rating, price, numberOfComment, numberOfLike, isLove, clickLove, clickShare, setReview, review }) {
	return (
		<View style={styles.footerContainer}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{ flex: 1, flexDirection: 'row', marginLeft: 8 }}>
					{isLove ? (
						<TouchableOpacity onPress={clickLove} style={styles.heartIcon}>
							<Ionicons name="md-heart" color={colors.red} size={30} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={clickLove} style={styles.heartIcon}>
							<Ionicons name="md-heart-outline" color={colors.gray} size={30} />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={clickShare} style={{ marginLeft: 20, marginTop: 3 }}>
						<FontAwesome name="share-alt" color={colors.blue} size={25} />
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', marginRight: 15 }}>
					<View style={styles.productDetail}>
						<IconMaterial name="star-border" color={colors.gray} size={26} />
						<Text style={styles.productDetailRating}>{rating}</Text>
					</View>
					{ (price && price !== '0') ? 
						<View style={styles.productDetail}>
							<Image
								style={styles.bahtImage}
								source={icons.baht}
								resizeMode="cover"
							/>
							<Text style={styles.productDetailMoney}>{price}</Text>
						</View>
						: <View/>
					}
					<TouchableOpacity 
						style={styles.productDetail}
						onPress={() => {
							setReview(review)
							Actions.viewReviewPage({ viewComment: true })
						}}
					>
						<IconMaterial
							style={styles.iconComment}
							name="chat-bubble-outline"
							color={colors.gray}
							size={24}
						/>
						<Text style={styles.productDetailComment}>{numberOfComment}</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<View style={styles.productDetailHeart}>
					{numberOfLike !== 0 && (
						numberOfLike == 1 ? 
							<Text style={styles.productDetailLove}>{numberOfLike} like</Text>
							: <Text style={styles.productDetailLove}>{numberOfLike} likes</Text>
					)}
				</View>
			</View>
		</View>
	)
}

export class ReviewCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLove: false,
			isSaved: false,
			showBookmark: true,
			imageSize: { width: 0, height: 0 }
		}
	}

	componentDidMount() {
		this.checkLove()
		this.checkBookmark()
		this.getImageSize()
	}

	getImageSize() {
		Image.getSize(this.props.review.picture_cover_url, (width, height) => {
			this.setState({ imageSize: { width, height } })
		})
	}

	clickLove() {
		if (this.state.isLove) this.props.unlikeReview(this.props.review._id)
		else this.props.likeReview(this.props.review._id)
		this.setState({
			isLove: !this.state.isLove
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.user && prevProps.user && this.props.review && prevProps.review) { 
			if (this.props.user.saved_post_list !== prevProps.user.saved_post_list) {
				this.checkBookmark()
			}
			if (this.props.review.like_by_list !== prevProps.review.like_by_list) {
				this.checkLove()
			}
		}
	}

	checkBookmark() {
		if (this.props.user.saved_post_list.includes(this.props.review._id)) {
			this.setState({
				isSaved: true
			})
		} else {
			this.setState({
				isSaved: false
			})
		}
		if (this.props.user._id === this.props.review.user._id) {
			this.setState({
				showBookmark: false
			})
		}
	}

	checkLove() {
		if (this.props.review.like_by_list.includes(this.props.user._id)) {
			this.setState({
				isLove: true
			})
		} else {
			this.setState({
				isLove: false
			})
		}
	}

	clickBookmark() {
		if (this.state.isSaved) this.props.unsaveReview(this.props.review._id)
		else this.props.saveReview(this.props.review._id)
		this.setState({
			isSaved: !this.state.isSaved
		})
	}

	shareToFacebook() {
		const shareContent = {
			contentType: 'link',
			// contentUrl: `lookgoods://viewreview/${this.props.review._id}`,
			contentUrl: this.props.review.picture_thumbnail_url,
			contentDescription: this.props.review.title,
			contentTitle: this.props.review.title
			// imageUrl: this.props.review.picture_thumbnail_url
			// photos: [
			// 	{ 	caption: this.props.review.product.name,
			// 		imageUrl: { uri: this.props.review.picture_cover_url },
			// 		userGenerated: false
			// 	}
			// ]
		}
		console.log(this.props.review.picture_cover_url, 'cover url')

		ShareDialog.canShow(shareContent).then((canShow) => {	
			console.log(canShow, 'can show')	
			if (canShow) return ShareDialog.show(shareContent)
		}).then((result) => {
			if (result.isCancelled) console.log('Share is cancelled')
			else console.log('Share successfull')
		},	function(error) { 
			console.log('Share fail with error', error)
		})
	}

	render() {
		const {
			title,
			user,
			picture_cover_url,
			price,
			comment_list,
			rating,
			timestamp,
			like_by_list
		} = this.props.review
		return (
			<View style={styles.container}>
				<Header
					user={user}
					time={timestamp}
					isSaved={this.state.isSaved}
					setUser={this.props.setSelectedUser}
					clickBookmark={() => this.clickBookmark()}
					showBookmark={this.state.showBookmark}
				/>
				<Body
					product_url={picture_cover_url}
					title={title}
					review={this.props.review}
					setReview={this.props.setCurrentReview}
					imageSize={this.state.imageSize}
				/>
				<Footer
					rating={rating}
					price={price}
					numberOfComment={comment_list.length}
					numberOfLike={like_by_list.length}
					isLove={this.state.isLove}
					clickLove={() => this.clickLove()}
					clickShare={() => this.shareToFacebook()}
					review={this.props.review}
					setReview={this.props.setCurrentReview}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white
	},
	headerContainer: {
		flexDirection: 'row',
		marginBottom: 5,
		marginTop: 10
	},
	headerWrapper: {
		flexDirection: 'column',
		marginLeft: 5,
		marginVertical: 5
	},
	profilePicture: {
		marginLeft: 10
	},
	reviewerName: {
		fontWeight: 'bold',
		color: colors.gray,
		fontSize: 12
	},
	timeText: {
		fontSize: 12,
		color: colors.gray2
	},
	bookmark: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 10,
		marginVertical: 5
	},
	productImage: {
		width: APP_FULL_WIDTH,
		height: APP_FULL_WIDTH*0.6
	},
	bahtImage: {
		marginTop: 3,
		width: 22,
		height: 22
	},
	iconComment: {
		marginTop: 3
	},
	titleText: {
		marginLeft: 20,
		marginTop: 12
	},
	footerContainer: {
		flex: 1,
		marginTop: 5,
		marginLeft: 10,
		marginBottom: 20
	},
	productDetail: {
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: 3
	},
	productDetailHeart: {
		flexDirection: 'row',
		marginLeft: 6
	},
	productDetailRating: {
		marginTop: 4,
		marginLeft: 2,
		marginVertical: 1
	},
	productDetailMoney: {
		marginTop: 4,
		marginLeft: 1,
		marginVertical: 1
	},
	productDetailComment: {
		marginTop: 4,
		marginLeft: 6
	},
	productDetailLove: {
		marginTop: 4,
		marginLeft: 6
	},
	heartIcon: {
		marginTop: 2
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentReview: review => {
		dispatch(ReviewActions.setCurrentReview(review))
	},
	setSelectedUser: user => {
		dispatch(UserActions.setSelectedUser(user))
	},
	saveReview: review_id => {
		dispatch(ReviewActions.saveReview(review_id))
	},
	unsaveReview: review_id => {
		dispatch(ReviewActions.unsaveReview(review_id))
	},
	likeReview: review_id => {
		dispatch(ReviewActions.likeReview(review_id))
	},
	unlikeReview: review_id => {
		dispatch(ReviewActions.unlikeReview(review_id))
	}
})

export default connect(null, mapDispatchToProps)(ReviewCard)
