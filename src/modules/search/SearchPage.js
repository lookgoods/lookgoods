import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import ProductsGrid from 'src/modules/user/components/ProductsGrid'
import NavBarSearchPage from 'src/modules/search/components/NavBarSearchPage'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
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
			searchText: ''
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
		this.setState({ searchText: text })
	}

	async cancelSearch() {
		// Keyboard.dismiss()
		await this.setState({
			isSearch: false,
			// overlaySearch: false,
			searchText: ''
		})
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
				<View>
					<ScrollView>
						<ProductsGrid product_list={products} />
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
	}
})

const mapStateToProps = state => ({
	selectedUser: state.userReducer.selectedUser
})

export default connect(mapStateToProps, null)(ViewUserPage)
