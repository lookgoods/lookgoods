import {
	Platform,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import { Divider } from 'react-native-elements'
import InfoBar from 'src/modules/user/components/InfoBar'
import ProductsGrid from 'src/modules/user/components/ProductsGrid'
import Tabs from 'src/modules/shares/Tabs'
import NavBar from 'src/modules/shares/NavBar'
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
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	render() {
		if (!this.props.selectedUser) return <View />
		else {
			const {
				name,
				picture_url,
				follower_list,
				following_list,
				description
			} = this.props.selectedUser
			return (
				<View style={styles.container}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						scrollEventThrottle={16}
						bounces={false}
						style={styles.body}
					>
						<View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 10
								}}
							>
								<CoverImage size={110} uri={picture_url} />
								<View
									style={{
										marginLeft: 20
									}}
								>
									<Text style={styles.usernameText}>{name}</Text>
									<TouchableOpacity style={styles.buttonFollow}>
										<Text style={styles.fontFollow}>Follow</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 10
								}}
							>
								<View style={{ width: '80%' }}>
									<Text style={{ lineHeight: 22 }}>{description}</Text>
								</View>
							</View>
							<View style={styles.infoBar}>
								<InfoBar
									review_num={4}
									comment_num={22}
									follower_num={follower_list.length}
									following_num={following_list.length}
								/>
							</View>
							<View style={{ alignItems: 'center' }}>
								<Divider style={styles.divider} />
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
					<View style={styles.header}>
						<View style={styles.platformHeader}>
							<NavBar titleName={name} />
						</View>
					</View>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
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
	infoBar: {
		marginTop: 20
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
	},
	usernameText: {
		fontSize: 18,
		marginTop: 10,
		color: colors.gray,
		fontWeight: 'bold'
	},
	fontFollow: {
		fontSize: 18,
		color: colors.white
	},
	buttonFollow: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
		backgroundColor: colors.orange,
		height: 30,
		borderRadius: 3
	}
})

const mapStateToProps = state => ({
	selectedUser: state.userReducer.selectedUser
})

export default connect(mapStateToProps, null)(ViewUserPage)
