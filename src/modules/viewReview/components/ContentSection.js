import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import CoverImage from 'src/modules/shares/CoverImage'
import StarBar from 'src/modules/viewReview/components/StarBar'
import UserActions from 'src/redux/actions/user'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

function CoverPhoto ({ image_url }) {
	if (image_url) {
		return <Image
			style={styles.coverImage}
			source={{ uri: image_url }}
			resizeMode="cover"
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

function getContent(content, index) {
	if (content.type === 'picture')
		return (
			<View key={index} style={styles.contentImageWrapper}>
				<Image
					source={{ uri: content.value }}
					resizeMode="contain"
					style={styles.contentImage}
				/>
			</View>
		)
	else if (content.type === 'text')
		return <Text key={index} style={styles.contentText}>{content.value}</Text>
	else return <View key={index}/>
}

function Content({ content_list }) {
	return (
		<View style={styles.contentList}>
			{content_list.map((content, index) => getContent(content, index))}
		</View>
	)
}

const ProductDetail = ({ name, value }) => (
	<View>
		{value && (
			<View style={styles.productDetail}>
				<Text style={styles.productDetailName}>{name}</Text>
				<Text>{value}</Text>
			</View>
		)}
	</View>
)

const TagButton = ({ title }) => (
	<TouchableOpacity style={styles.buttonTag}>
		<Text style={styles.fontTags}>{title}</Text>
	</TouchableOpacity>
)

const TagList = ({ tags }) => (
	<View>
		{tags && (
			<View style={styles.productDetail}>
				<Text style={styles.productDetailName}>Tags</Text>
				<View>
					{tags.map((tag, index) => (
						<View key={index} style={styles.tagWrapper}>
							<TagButton title={tag} />
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
	}

	render() {
		const {
			picture_cover_url,
			product,
			user,
			rating,
			title,
			content_list,
			price
		} = this.props.review
		console.log(picture_cover_url, 'pic url')
		return (
			<View>
				<CoverPhoto image_url={picture_cover_url} />
				<ReviewerBar
					reviewer={user}
					rating={rating}
					setUser={this.props.setSelectedUser}
				/>
				<Text style={styles.titleText}>{title}</Text>
				<Content content_list={content_list} />
				<View style={{ flexDirection: 'row' }}>
					<ProductDetail name="Price" value={price} />
					<ProductDetail name="Brand" value={product.brand} />
				</View>
				<TagList tags={product.tag} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	coverImage: {
		width: '100%',
		height: 250
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
		fontWeight: 'bold'
	},
	contentList: {
		marginTop: 5
	},
	contentImage: {
		width: '80%',
		height: 200
	},
	contentImageWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10
	},
	contentText: {
		marginBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		lineHeight: 25
	},
	productDetail: {
		flexDirection: 'row',
		marginBottom: 10
	},
	productDetailName: {
		marginRight: 40,
		marginLeft: 30,
		fontWeight: 'bold'
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
	}
})

export default connect(null, mapDispatchToProps)(ContentSection)
