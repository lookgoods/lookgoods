import {
	Platform,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBarSearch from '../shares/NavBarSearch'
import ReviewList from 'src/modules/home/components/ReviewList'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import ReviewActions from 'src/redux/actions/review'
import UserActions from 'src/redux/actions/user'

export class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
	}

	fetchData() {
		this.props.getReviews()
		this.props.getCurrentUser()
	}

	componentDidMount() {
		this.fetchData()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.currentUser !== nextProps.currentUser) || 
		(this.props.reviews !== nextProps.reviews) || 
		(this.props.currentPage !== nextProps.currentPage)
	}
	
	componentDidUpdate(prevProps, prevState) {
		if ((this.props.currentPage !== prevProps.currentPage) && this.props.currentPage === 'home') {
			this.fetchData()
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
		await this.setState({
			isSearch: false,
			searchText: ''
		})
		Actions.SearchPage()
	}

	render() {
		if (!this.props.currentUser && this.props.success) {
			this.goToLoginPage()
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearch />
					</View>
				</View>
				<ScrollView>
					<View style={styles.body}>
						<ReviewList review_list={this.props.reviews} />
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lightGray
	},
	body: {
		backgroundColor: colors.lightGray
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	reviews: state.reviewReducer.reviews,
	currentPage: state.menuReducer.currentPage
})

const mapDispatchToProps = dispatch => ({
	getReviews: () => {
		dispatch(ReviewActions.getReviews())
	},
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
