import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View, Keyboard } from 'react-native'
import ReviewsGrid from 'src/modules/shares/ReviewsGrid'
import NavBarSearchPage from 'src/modules/search/components/NavBarSearchPage'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import SearchActions from 'src/redux/actions/search'
import Tabs from 'src/modules/shares/Tabs'
import images from 'src/constants/images'

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
			tabBar: 1
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
		case 1 : this.props.searchByTitle(text)
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

	fetchSearchProduct() {
		this.setState({ tabBar: 2 })
	}

	fetchSearchTag() {
		this.setState({ tabBar: 3 })
	}

	fetchSearchPeople() {
		this.setState({ tabBar: 4 })
	}

	render() {
		console.log(this.props.searchTitle, 'searchTitle')
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
								<View title="Review">
									<ReviewsGrid review_list={this.props.searchTitle} page={'SearchPage'}/>
								</View>
								<View title="Product" onSelectedTab={() => this.fetchSearchProduct()}>
									<ReviewsGrid review_list={this.props.saveReviews} page={'SearchPage'}/>
								</View>
								<View title="Tag" onSelectedTab={() => this.fetchSearchTag()}>
									<ReviewsGrid review_list={this.props.saveReviews} page={'SearchPage'}/>
								</View>
								<View title="People" onSelectedTab={() => this.fetchSearchPeople()}>
									<ReviewsGrid review_list={this.props.saveReviews} page={'SearchPage'}/>
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
	}
})

const mapStateToProps = state => ({
	selectedUser: state.userReducer.selectedUser,
	searchTitle: state.searchReducer.reviews,
	searchProduct: state.searchReducer.products,
	searchTag: state.searchReducer.tags,
	searchUser: state.searchReducer.users
})

const mapDispatchToProps = dispatch => ({
	searchByTitle: title => {
		dispatch(SearchActions.searchByTitle(title))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserPage)
