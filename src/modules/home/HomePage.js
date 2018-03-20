import { Button, Card, ListItem } from 'react-native-elements'
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import NavBar from 'src/modules/shares/NavBar'
import ReviewList from 'src/modules/home/components/ReviewList'
import { connect } from 'react-redux'
import NavBarSearch from '../shares/NavBarSearch';

const reviewsMock = [
	{
		title: 'Etude House BB Cream is The best BB Cream',
		user: {
			name: 'Phasin Sarunpornkul',
			profile_url: images.profile
		},
		picture_cover_url: images.product1,
		product_price: 500,
		product: {
			name: 'Etude House BB Cream',
			brand: 'Etude'
		},
		comment_list: ['1', '2', '3'],
		rating: 1,
		overall_rating: 4.5,
		timestamp: '4 hours ago',
		content_list: [
			{	type: 'picture',
				value: images.product2
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			},
			{	type: 'picture',
				value: images.product3
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			}
		],
		tag_list: [ "Makeup and Beauty", "Cosmetic"]
	},
	{
		title: 'Skinfood Peach Cotton is The best BB Cream',
		user: {
			name: 'Paiiz Wanchanapon',
			profile_url: images.profile
		},
		picture_cover_url: images.product2,
		product_price: 300,
		product: {
			name: 'Skinfood Peach Cotton',
			brand: 'Skinfood'
		},
		comment_list: ['1', '2', '3', '4'],
		rating: 2,
		overall_rating: 3.5,
		timestamp: '6 hours ago',
		content_list: [
			{	type: 'picture',
				value: images.product2
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			},
			{	type: 'picture',
				value: images.product3
			},
			{	type: 'text',
				value: 'BB Cream formulated with Pearl Powder with an improved adhesive texture to promote moist, radiant looking skin while protecting against UV damage and wrinkles.'
			}
		],
		tag_list: [ "Makeup and Beauty", "Cosmetic"]
	}
]

export class HomePage extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isSearch: false, 
      searchText: '',
		}
	}
	
	setIsSearch () {
      this.setState({ isSearch: true })
	}
	
	handleSearchText (text) {
		if( text === ''){
			this.setState({ isSearch: false })
		} else {
			this.setState({ isSearch: true })
		}
    this.setState({ searchText: text })
	}

	async cancelSearch () {
    // Keyboard.dismiss()
    await this.setState({
      isSearch: false,
      // overlaySearch: false,
      searchText: ''
    })
  }
	
	render() {
		console.log('user', this.props.currentUser)
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.body}>
						<ReviewList review_list={reviewsMock}/>
					</View>
				</ScrollView>
			<View style={styles.header}>
				<View style={styles.platformHeader}>
					<NavBarSearch 
						overlaySearch={this.state.overlaySearch}
						searchText={this.state.searchText}
						isSearch={this.state.isSearch}
            handleSearchText={(text) => this.handleSearchText(text)}
            setIsSearch={() => this.setIsSearch()}
            cancelSearch={() => this.cancelSearch()}
					/>
				</View>
			</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	body: {
		marginTop: Platform.OS === 'ios' ? 75 : 60
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		overflow: 'hidden',
		zIndex: 1
	},
	coverHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 0
	},
	coverFooter: {
		height: 40,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2
	}
})

const mapStateToProps = state => ({
    currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, null)(HomePage)