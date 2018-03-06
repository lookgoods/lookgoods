import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import images from 'src/constant/images'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { colors } from 'src/constant/mixins'

const ProfilePicture = ({ image_url }) => {
	return ( 
		<View>
			{ image_url ?
			<Image
				style={styles.profile_image}
				source={image_url}
				resizeMode='cover'
			/> : <View/> }
		</View>
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
			<Image
				style={styles.product_image}
				source={image_url}
				resizeMode='contain'
			/> : <View/> }
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
				<IconMaterial name='attach-money' size={24}/>
				<Text style={styles.productDetailMoney}>{price + ' Baht'}</Text>
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
    return (
      <View style={styles.container}>
        <Header reviewer_name='Sririta Jensan' profile_url={images.profile} time='4 hours ago' isSaved={false} />
		  <Body product_url={images.product1} title='Etude House BB Cream is The best BB Cream' />
		  <Footer rating={5.0} price={500} numberOfComment={100} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	profile_image: {
		width: 55,
		height: 55,
		borderRadius: 90,
		marginLeft: 10
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
	product_image: {
		width: '100%',
		height: 260
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
		marginLeft: 2
	},
	productDetailMoney: {
		marginLeft: -2
	},
	productDetailComment: {
		marginLeft: 6
	}
})