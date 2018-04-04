import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { Divider } from 'react-native-elements'
import InfoBar from 'src/modules/user/components/InfoBar'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProductsGrid from 'src/modules/user/components/ProductsGrid'
import Tabs from 'src/modules/shares/Tabs'
import UserActions from 'src/redux/actions/user'
import UserPhoto from 'src/modules/user/components/UserPhoto'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import images from 'src/constants/images'
import { LoginManager } from 'react-native-fbsdk'

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

export class UserPage extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.getCurrentUser()
	}

	goToSettingPage() {
		Actions.settingPage()
	}

	goToLoginPage() {
		Actions.loginPage()
	}

	render() {
		console.log('loading user', this.props.success)
		console.log('currentuser', this.props.currentUser)
		if (!this.props.currentUser && this.props.success) {
			this.goToLoginPage()
			return <View/>
		}
		else {
			return (
				<ScrollView contentContainerStyle={styles.container}>
					{ !this.props.success ? 
						<ActivityIndicator size="large" style={styles.loading} />
						: <View style={styles.body}>
							<View style={[styles.settingIconContainer, { right: 10 }]}>
								<MaterialIcons
									name="settings"
									size={25}
									onPress={() => this.goToSettingPage()}
								/>
							</View>
							<UserPhoto
								username={this.props.currentUser.name}
								description={this.props.currentUser.description}
								size={120}
								image_url={this.props.currentUser.picture_url}
							/>
							<View style={styles.infoBar}>
								<InfoBar
									review_num={4}
									comment_num={22}
									follower_num={this.props.currentUser.follower_list.length}
									following_num={this.props.currentUser.following_list.length}
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
					}
				</ScrollView>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingTop: Platform.OS === 'ios' ? 10 : 0
	},
	body: {
		marginTop: 10
	},
	infoBar: {
		marginTop: 20
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 15,
		height: 1.2,
		width: '100%'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 12,
		paddingRight: 12
	},
	settingIconContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	success: state.userReducer.success
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
