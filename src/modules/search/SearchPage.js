import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, Keyboard, Image, Text, ActivityIndicator } from 'react-native'
import ReviewsGrid from 'src/modules/shares/ReviewsGrid'
import NavBarSearchPage from 'src/modules/search/components/NavBarSearchPage'
import CoverImage from 'src/modules/shares/CoverImage'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import SearchActions from 'src/redux/actions/search'
import { List, ListItem } from 'react-native-elements'
import Tabs from 'src/modules/shares/Tabs'
import { Actions } from 'react-native-router-flux'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import icons from 'src/constants/icons'
import { APP_FULL_HEIGHT } from 'src/constants'
import EmptySearch from 'src/modules/search/components/EmptySearch'

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
		if (this.props.onFocus && this.props.onFocus === 2) {
			this.fetchSearchPeople()
		}
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
			searchText: ''
		})

		switch (this.state.tabBar) {
		case 'product' :
			this.props.searchByProduct(this.state.searchText) 
			break 
		case 'people' : 
			this.props.searchByUser(this.state.searchText) 
			break 
		default : 
			this.props.searchByTitle(this.state.searchText)
			break
		}
	}
	
	replaceMarks(text) {
		const str = text.replace(/ุ|ู|ิ|ี|ึ|ื|่|้|๊|๋|ั|ํ|็/g, '')
		return str
	}
	goToViewReviewPage(review) {
		Actions.viewReviewPage({ review_id: review._id })
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
				<ScrollView>
					<View style={styles.tabsContainer}>
						<Tabs activeTab={this.props.onFocus || 0}>
							<View title="Review" onSelectedTab={() => this.fetchSearchTitle()}>
								<List containerStyle={{ borderColor: colors.transparent, marginTop: -5 }}>
									{ this.props.searchTitle ?
										this.props.searchTitle.length === 0 ?
											<EmptySearch/>
											: this.props.searchTitle.map((review, index) => 
											{
												if (!review.available) return <View/>
												return (
													<ListItem
														avatar={
															<Image
																style={{
																	width: 150,
																	height: 100,
																	borderWidth: 1,
																	borderRadius: 3,
																	borderColor: '#f1f1f1'
																}}
																source={{uri: review.picture_cover_url}}
																resizeMode="cover"
															/>
														}
														containerStyle={{ borderBottomColor: colors.transparent }}
														key={index}
														title={review.title}
														titleStyle={{ fontWeight: 'bold', color: colors.gray }}
														titleNumberOfLines={2}
														subtitle={
															<View style={{ marginLeft: 15, bottom: 0}}>
																<Text></Text>
																{ this.replaceMarks(review.title).length <= 19 &&
																<Text></Text>
																}
																<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
																	<View style={{ flexDirection: 'row', marginRight: 15 }}>
																		<View style={styles.productDetail}>
																			<IconMaterial name="star-border" color={colors.gray} size={26} />
																			<Text style={styles.productDetailRating}>{review.rating}</Text>
																		</View>
																		{ (review.price && review.price !== '0') ? 
																			<View style={styles.productDetailLeft}>
																				<Image
																					style={styles.bahtImage}
																					source={icons.baht}
																					resizeMode="cover"
																				/>
																				<Text style={styles.productDetailMoney}>{review.price}</Text>
																			</View>
																			: <View/>
																		}
																	</View>
																</View>
															</View>
														}
														hideChevron={true}
														onPress={() => this.goToViewReviewPage(review)}
													/>
												)
											})
										: this.props.loading && 
											<View style={styles.loadingContainer}>
												<ActivityIndicator size="large" />
											</View>
									}
								</List>
							</View>
							<View title="Product" style={{ marginBottom: 10 }} onSelectedTab={() => this.fetchSearchProduct()}>
								{ this.props.searchProduct ? 
									this.props.searchProduct.length === 0 ?
										<View style={{ marginTop: -5 }}>
											<EmptySearch/>
										</View>
										:<ReviewsGrid review_list={this.props.searchProduct} page={'SearchPage'}/>
									: this.props.loading && 
									<View style={styles.loadingContainer}>
										<ActivityIndicator size="large" />
									</View>
								}
							</View>
							<View title="People" onSelectedTab={() => this.fetchSearchPeople()}>
								<List containerStyle={{ borderColor: colors.transparent, marginTop: -5 }}>
									{ this.props.searchUser !== null ?
										this.props.searchUser.length === 0 ?
											<EmptySearch/>
											: this.props.searchUser.map((user, index) => {
												if (user._id === this.props.currentUser._id) return <View/>
												return (
													<ListItem
														avatar={
															<CoverImage size={70} uri={user.picture_url} />
														}
														key={index}
														title={user.name}
														// subtitle={`${user.own_post_list.length} reviews`}
														hideChevron={true}
														titleStyle={{ fontWeight: 'bold', color: colors.gray }}
														onPress={() => this.goToViewUser(user)}
														containerStyle={{ borderBottomColor: colors.lightGray }}
													/>
												)
											})
										: this.props.loading && 
												<View style={styles.loadingContainer}>
													<ActivityIndicator size="large" />
												</View>
									}
								</List>
							</View>
						</Tabs>
					</View>
				</ScrollView>
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
		backgroundColor: colors.orange,
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
		color: colors.gray,
		marginTop: 4,
		marginLeft: 2,
		marginVertical: 1
	},
	productDetailMoney: {
		color: colors.gray,
		marginTop: 4,
		marginLeft: 1,
		marginVertical: 1
	},
	loadingContainer: {
		marginTop: APP_FULL_HEIGHT*0.2
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	selectedUser: state.userReducer.selectedUser,
	searchTitle: state.searchReducer.reviews,
	searchProduct: state.searchReducer.products,
	searchUser: state.searchReducer.users,
	loading: state.searchReducer.loading
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
