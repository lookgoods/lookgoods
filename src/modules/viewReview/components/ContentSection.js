import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import CoverImage from 'src/modules/shares/CoverImage'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'
import ImageActions from 'src/redux/actions/image'
import UserActions from 'src/redux/actions/user'
import ReviewActions from 'src/redux/actions/review'

function CoverPhoto ({ image_url, imageSize }) {
	if (image_url) {
		return <Image
			style={styles.coverImage}
			source={{ uri: image_url }}
			resizeMode={ imageSize.width > imageSize.height ? 'cover' : 'contain' }
		/>
	}
	return <View />
}

const ProfilePicture = ({ image_url }) => (
	<View style={styles.profileImage}>
		<CoverImage size={70} uri={image_url} />
	</View>
)

function goToUserPage(user, setUser) {
	setUser(user)
	Actions.viewUserPage()
}

function ReviewerBar({ reviewer, rating, setUser }) {
	return (
		<View style={styles.reviewerBar}>
			<TouchableOpacity onPress={() => goToUserPage(reviewer, setUser)}>
				<ProfilePicture image_url={reviewer.picture_url} />
			</TouchableOpacity>
			<View style={styles.reviewTextWrapper}>
				<TouchableOpacity onPress={() => goToUserPage(reviewer, setUser)}>
					<Text style={styles.reviewerName}>{reviewer.name}</Text>
				</TouchableOpacity>
				<View style={styles.starBar}>
					<StarBar rating={rating} size={30} />
				</View>
			</View>
		</View>
	)
}

function getContent(content, index, showPreviewImage, hidePreviewImage) {
	if (content.type === 'picture')
		return (
			<TouchableOpacity 
				key={index} 
				style={styles.contentImageWrapper}
				delayLongPress={200} 
				onLongPress={() => showPreviewImage(content.value)}
				onPressOut={() => hidePreviewImage()}
			>
				<Image
					source={{ uri: content.value }}
					resizeMode="contain"
					style={styles.contentImage}
				/>
			</TouchableOpacity>
		)
	else if (content.type === 'text')
		return <Text key={index} style={styles.contentText}>{content.value}</Text>
	else return <View key={index}/>
}

function Content({ content_list, showPreviewImage, hidePreviewImage }) {
	return (
		<View style={styles.contentList}>
			{content_list.map((content, index) => getContent(content, index, showPreviewImage, hidePreviewImage))}
		</View>
	)
}

const ProductDetail = ({ name, value }) => (
	<View>
		{value && (
			<View style={styles.productDetail}>
				<Text style={styles.productDetailName}>{name}</Text>
				<Text style={{ fontSize: 15, color: colors.gray6 }}>{value}</Text>
			</View>
		)}
	</View>
)

const TagButton = ({ title, viewTagReviews }) => (
	<TouchableOpacity style={styles.buttonTag} onPress={() => viewTagReviews(title)}>
		<Text style={styles.fontTags}>{title}</Text>
	</TouchableOpacity>
)

const TagList = ({ tags, viewTagReviews }) => (
	<View>
		{tags && (
			<View style={styles.productDetail}>
				<Text style={styles.productDetailName}>Tags</Text>
				<View>
					{tags.map((tag, index) => (
						<View key={index} style={styles.tagWrapper}>
							<TagButton title={tag} viewTagReviews={viewTagReviews}/>
						</View>
					))}
				</View>
			</View>
		)}
	</View>
)

export class ContentSection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imageSize: { width: 0, height: 0 }
		}
	}

	componentDidMount() {
		this.getImageSize()
	}

	getImageSize() {
		Image.getSize(this.props.review.picture_cover_url, (width, height) => {
			this.setState({ imageSize: { width, height } })
		})
	}

	render() {
		const {
			picture_cover_url,
			product,
			user,
			rating,
			title,
			content_list,
			price,
			tag
		} = this.props.review
		return (
			<View>
				<View style={{ backgroundColor: colors.lightGray2 }}>
					<CoverPhoto
						image_url={picture_cover_url} 
						imageSize={this.state.imageSize} 
					/>
				</View>
				<ReviewerBar
					reviewer={user}
					rating={rating}
					setUser={this.props.setSelectedUser}
				/>
				<Text style={styles.titleText}>{title}</Text>
				<Content 
					content_list={content_list} 
					showPreviewImage={this.props.showPreviewImage}
					hidePreviewImage={this.props.hidePreviewImage}
				/>
				<View style={{ flexDirection: 'row' }}>
					<ProductDetail name="Price" value={price} />
					<ProductDetail name="Brand" value={product.brand} />
				</View>
				<TagList tags={tag} viewTagReviews={this.props.viewTagReviews}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	coverImage: {
		width: APP_FULL_WIDTH,
		height: 260
	},
	profileImage: {
		marginLeft: 10
	},
	reviewerBar: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	reviewTextWrapper: {
		flexDirection: 'column',
		marginLeft: 2,
		flex: 1
	},
	starBar: {
		marginLeft: 3,
		marginTop: 5
	},
	reviewerName: {
		fontSize: 15,
		fontWeight: 'bold',
		marginTop: 5,
		marginLeft: 5,
		color: colors.gray
	},
	titleText: {
		marginLeft: 20,
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.gray
	},
	contentList: {
		marginTop: 5
	},
	contentImage: {
		width: '90%',
		height: 200
	},
	contentImageWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
		marginTop: 10
	},
	contentText: {
		marginBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		lineHeight: 25,
		fontSize: 15,
		color: colors.gray6
	},
	productDetail: {
		flexDirection: 'row',
		marginBottom: 10,
		marginTop: 10
	},
	productDetailName: {
		marginRight: 40,
		marginLeft: 30,
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.gray
	},
	tagWrapper: {
		marginBottom: 5
	},
	fontTags: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.white
	},
	buttonTag: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: colors.blue,
		height: 25,
		paddingHorizontal: 10,
		borderRadius: 15
	}
})

const mapDispatchToProps = dispatch => ({
	setSelectedUser: user => {
		dispatch(UserActions.setSelectedUser(user))
	},
	showPreviewImage: image_url => {
		dispatch(ImageActions.showPreviewImageModal(image_url))
	},
	hidePreviewImage: () => {
		dispatch(ImageActions.hidePreviewImageModal())
	},
	viewTagReviews: (tag) => {
		dispatch(ReviewActions.viewTagReviews(tag))
	}
})

export default connect(null, mapDispatchToProps)(ContentSection)
