import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, Keyboard, Image, Text, TouchableOpacity } from 'react-native'
import ReviewsGrid from 'src/modules/shares/ReviewsGrid'
import NavBarSearchPage from 'src/modules/search/components/NavBarSearchPage'
import CoverImage from 'src/modules/shares/CoverImage'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import SearchActions from 'src/redux/actions/search'
import { List, ListItem } from 'react-native-elements'
import Tabs from 'src/modules/shares/Tabs'
import images from 'src/constants/images'
import { Actions } from 'react-native-router-flux'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import icons from 'src/constants/icons'

const products = [
	{ name: 'product1', image_url: images.product1 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product4', image_url: images.product4 },
	{ name: 'product5', image_url: images.product5 }
]

export class ViewUserPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: '',
			tabBar: 'title'
		}
	}

	componentDidMount() {
		if (this.props.searchTitle === null) this.props.searchByTitle('')
	}

	setIsSearch() {
		this.setState({ isSearch: true })
	}

	handleSearchText(text) {
		if (text === '') {
			this.setState({ isSearch: false })
		} else {
			this.setState({ isSearch: true })
		}

		switch (this.state.tabBar) {
		case 'product' :
			this.props.searchByProduct(text) 
			break 
		case 'people' : 
			this.props.searchByUser(text) 
			break 
		case 'tag' :
			this.props.searchByTag(text)
			break
		default : 
			this.props.searchByTitle(text)
			break
		}
		this.setState({ searchText: text })
	}

	async cancelSearch() {
		Keyboard.dismiss()
		await this.setState({
			isSearch: false,
			// overlaySearch: false,
			searchText: ''
		})
	}

	goToViewUser(user) {
		this.props.setSelectedUser(user)
		Actions.viewUserPage()
	}

	fetchSearchTitle() {
		this.setState({ tabBar: 'title' })
		if (this.props.searchTitle === null) this.props.searchByTitle(this.state.searchText)
	}

	fetchSearchProduct() {
		this.setState({ tabBar: 'product' })
		if (this.props.searchProduct === null) this.props.searchByProduct(this.state.searchText) 
	}

	fetchSearchPeople() {
		this.setState({ tabBar: 'people' })
		if (this.props.searchUser === null) this.props.searchByUser(this.state.searchText)
	}

	render() {
		console.log(this.props.searchTitle, 'this.props.searchTitle')
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearchPage
							searchText={this.state.searchText}
							isSearch={this.state.isSearch}
							handleSearchText={text => this.handleSearchText(text)}
							setIsSearch={() => this.setIsSearch()}
							cancelSearch={() => this.cancelSearch()}
						/>
					</View>
				</View>
				<View>
					<ScrollView>
						<ReviewsGrid product_list={products} page={'SearchPage'}/>
						<View style={styles.tabsContainer}>
							<Tabs>
								<View title="Review" onSelectedTab={() => this.fetchSearchTitle()}>
									<List containerStyle={{ flex: 1, borderBottomColor: colors.transparent, marginTop: -5 }}>
										{ this.props.searchTitle !== null &&
											this.props.searchTitle.map((review, index) => (
												<ListItem
													avatar={
														<Image
															style={{
																width: 100,
																height: 100,
																resizeMode: 'cover',
																borderWidth: 1,
																borderRadius: 3,
																borderColor: '#f1f1f1'
															}}
															source={{uri: review.picture_thumbnail_url}}
															resizeMode="cover"
														/>
													}
													key={index}
													title={review.title}
													subtitle={
														<View style={{ marginLeft: 15 }}>
															<Text/>
															<Text>{review.user.name}</Text>
															<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
																<View style={{ flexDirection: 'row', marginRight: 15 }}>
																	<View style={styles.productDetail}>
																		<IconMaterial name="star-border" color={colors.gray} size={26} />
																		<Text style={styles.productDetailRating}>{review.rating}</Text>
																	</View>
																	{ review.price && 
																	<View style={styles.productDetailLeft}>
																		<Image
																			style={styles.bahtImage}
																			source={icons.baht}
																			resizeMode="cover"
																		/>
																		<Text style={styles.productDetailMoney}>{review.price}</Text>
																	</View>
																	}
																	<View style={styles.productDetailLeft}>
																		<IconMaterial
																			style={styles.iconComment}
																			name="chat-bubble-outline"
																			color={colors.gray}
																			size={24}
																		/>
																		<Text style={styles.productDetailComment}>{review.comment_list.length}</Text>
																	</View>
																</View>
															</View>
														</View>
													}
													hideChevron={true}
													titleStyle={{ fontWeight: 'bold', color: colors.gray }}
													// onPress={() => this.goToViewUser(user)}
												/>
											))
										}
									</List>
								</View>
								<View title="Product" onSelectedTab={() => this.fetchSearchProduct()}>
									<ReviewsGrid review_list={this.props.searchProduct} page={'SearchPage'}/>
								</View>
								<View title="People" onSelectedTab={() => this.fetchSearchPeople()}>
									<List containerStyle={{ borderBottomColor: colors.transparent, marginTop: -5 }}>
										{ this.props.searchUser !== null &&
											this.props.searchUser.map((user, index) => (
												<ListItem
													avatar={
														<CoverImage size={70} uri={user.picture_url} />
													}
													key={index}
													title={user.name}
													hideChevron={true}
													titleStyle={{ fontWeight: 'bold', color: colors.gray }}
													onPress={() => this.goToViewUser(user)}
												/>
											))
										}
									</List>
								</View>
							</Tabs>
						</View>
					</ScrollView>
				</View>
			</View>
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
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		backgroundColor: 'transparent',
		overflow: 'hidden'
	},
	tabsContainer: {
		marginTop: 20,
		paddingLeft: 12,
		paddingRight: 12
	},
	bahtImage: {
		marginTop: 3,
		width: 22,
		height: 22
	},
	iconComment: {
		marginTop: 3
	},
	productDetail: {
		flexDirection: 'row',
		marginLeft: -5,
		marginTop: 3
	},
	productDetailLeft: {
		flexDirection: 'row',
		marginLeft: 10,
		marginTop: 3
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
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	selectedUser: state.userReducer.selectedUser,
	searchTitle: state.searchReducer.reviews,
	searchProduct: state.searchReducer.products,
	searchUser: state.searchReducer.users
})

const mapDispatchToProps = dispatch => ({
	setSelectedUser: user => {
		dispatch(UserActions.setSelectedUser(user))
	},
	searchByTitle: title => {
		dispatch(SearchActions.searchByTitle(title))
	},
	searchByProduct: product => {
		dispatch(SearchActions.searchByProduct(product))
	},
	searchByUser: user => {
		dispatch(SearchActions.searchByUser(user))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage)
