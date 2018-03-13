import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import CoverImage from 'src/modules/shares/CoverImage'
import images from 'src/constant/images'
import icons from 'src/constant/icons'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { colors } from 'src/constant/mixins'
import { Actions } from 'react-native-router-flux'



const ProfilePicture = ({ image_url }) => {
	return ( 
		<CoverImage size={50} url={image_url}/>
	)
}

const BookMark = ({ isActive }) => {
	return (
		<View style={styles.bookmark}> 
			{ isActive ? 
				<IconMaterial name="bookmark" size={36}/>
				: <IconMaterial name="bookmark-border" size={36}/>
			}
		</View>
	)
}

function Header({ reviewer_name, profile_url, time, isSaved }) {
	return (
		<View style={styles.headerContainer}>
			<ProfilePicture image_url={profile_url} />
			<View style={styles.headerWrapper}>
				<Text style={styles.reviewerName}>{reviewer_name}</Text>
				<Text style={styles.timeText}>{time}</Text>
			</View>
			<BookMark isActive={isSaved} />
		</View>
	)
}

const ProductPicture = ({ image_url }) => {
	return ( 
		<View>
			{ image_url ?
			<TouchableOpacity onPress={() => {Actions.addProductPage()}}>
				<Image
					style={styles.productImage}
					source={image_url}
					resizeMode='contain'
				/> 
			</TouchableOpacity>
			: <View/> }
		</View>
	)
}

function Body({ product_url, title }) {
	return (
		<View>
			<ProductPicture image_url={product_url} />
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}

function Footer({ rating, price, numberOfComment}) {
	return (
		<View style={styles.footerContainer}>
			<View style={styles.productDetail}>
				<IconMaterial name='star-border' size={24}/>
				<Text style={styles.productDetailRating}>{rating}</Text>
			</View>
			<View style={styles.productDetail}>
				<Image style={styles.bahtImage} source={icons.baht} resizeMode='cover'/>
				<Text style={styles.productDetailMoney}>{price}</Text>
			</View>
			<View style={styles.productDetail}>
				<IconMaterial name='chat-bubble-outline' size={24}/>
				<Text style={styles.productDetailComment}>{numberOfComment}</Text>
			</View>
		</View>
	)
}

export default class ReviewCard extends Component {

	constructor (props) {
		super(props)
	}
  
	render() {
		const { title, user, picture_cover_url, product, comment_list, rating, timestamp} = this.props.review

		return (
		<View style={styles.container}>
			<Header reviewer_name={user.username} profile_url={user.profile_url} time={timestamp} isSaved={false} />
			<Body product_url={picture_cover_url} title={title} />
			<Footer rating={rating} price={product.price} numberOfComment={comment_list.length} />
		</View>
	)
  }
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	borderCover: {
    // borderWidth: 1,
    // borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		// margin: 1
	},
	headerWrapper: {
		flexDirection: 'column',
		marginLeft: 10,
		marginVertical: 5
	},
	reviewerName: {
		fontWeight: 'bold',
		color: colors.gray,
		fontSize: 12
	},
	timeText: {
		fontSize: 12
	},
	bookmark: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 10,
		marginVertical: 5
	},
	productImage: {
		width: '100%',
		height: 260
	},
	bahtImage: {
		width: 24,
		height: 24
	},
	titleText: {
		marginLeft: 20,
		marginTop: 10
	},
	footerContainer: {
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10
	},
	productDetail: {
		flexDirection: 'row',
		marginLeft: 10
	},
	productDetailRating: {
		marginLeft: 2,
		marginVertical: 1
	},
	productDetailMoney: {
		marginLeft: 1,
		marginVertical: 1
	},
	productDetailComment: {
		marginLeft: 6,
	}
})