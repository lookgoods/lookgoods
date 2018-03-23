import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Divider } from 'react-native-elements'
import InfoBar from 'src/modules/user/components/InfoBar'
import ProductsGrid from 'src/modules/user/components/ProductsGrid'
import Tabs from 'src/modules/shares/Tabs'
import UserPhoto from 'src/modules/user/components/UserPhoto'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import images from 'src/constants/images'

const products = [
	{ name: 'product1', image_url: images.product5 },
	{ name: 'product2', image_url: images.product5 },
	{ name: 'product3', image_url: images.product5 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product5 },
	{ name: 'product2', image_url: images.product4 },
	{ name: 'product3', image_url: images.product5 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product5 },
	{ name: 'product4', image_url: images.product2 }
]

const products_save = [
	{ name: 'product3', image_url: images.product1 },
	{ name: 'product2', image_url: images.product2 },
	{ name: 'product4', image_url: images.product3 },
	{ name: 'product1', image_url: images.product4 }
]

export class ViewUserPage extends Component {
	constructor (props) {
		super(props)
	}
    
	componentDidMount() {
	}

	render() {
		if (!this.props.selectedUser) return <View />
		else {
			const { name, picture_url, follower_list, following_list } = this.props.selectedUser
			return (
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.body}>
						<UserPhoto username={name} size={120} image_url={picture_url}/>
						<View style={styles.infoBar}>
							<InfoBar review_num={4} comment_num={22} follower_num={follower_list.length} following_num={following_list.length}/>
						</View>
						<View style={{alignItems: 'center'}}>
							<Divider style={styles.divider}/>
						</View>
						<View style={styles.tabsContainer}>
							<Tabs>
								<View title="Reviews">
									<ProductsGrid product_list={products} />
								</View>
								<View title="Saved">
									<ProductsGrid product_list={products_save} />
								</View>
							</Tabs>
						</View>
					</View>
				</ScrollView>
			)
		}
	}
}
  
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white
	},
	body: {
		marginTop: 10
	},
	infoBar: {
		marginTop: 30
	},
	divider: {
		backgroundColor: colors.gray2,
		marginTop: 15,
		height: 1.2,
		width: '100%'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 12,
		paddingRight: 12
	}
})

const mapStateToProps = state => ({
	selectedUser: state.userReducer.selectedUser
})

export default connect(mapStateToProps, null)(ViewUserPage)
