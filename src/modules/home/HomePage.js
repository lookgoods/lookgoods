import {
	Platform,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'

import NavBarSearch from '../shares/NavBarSearch'
import ReviewList from 'src/modules/home/components/ReviewList'
import { connect } from 'react-redux'
import reviewsMock from 'src/mockData/reviews'

export class HomePage extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isSearch: false, 
			searchText: ''
		}
	}
	
	setIsSearch () {
		this.setState({ isSearch: true })
	}
	
	handleSearchText (text) {
		if (text === '') {
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
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, null)(HomePage)