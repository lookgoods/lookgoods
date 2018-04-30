import {
	Platform,
	ScrollView,
	StyleSheet,
	View,
	RefreshControl
} from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBarSearch from '../shares/NavBarSearch'
import ReviewList from 'src/modules/home/components/ReviewList'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import ReviewActions from 'src/redux/actions/review'
import PreviewReviewModal from 'src/modules/shares/PreviewReviewModal'
import PreviewImageModal from 'src/modules/shares/PreviewImageModal'
import MenuActions from 'src/redux/actions/menu'
import Toast from 'react-native-easy-toast'
import NoFollowingReview from 'src/modules/home/components/NoFollowingReview'

export class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
	}

	fetchData() {
		this.props.getFollowingReviews()
	}

	refreshData () {
		this.fetchData()
	}

	componentDidMount() {
		this.props.setCurrentPage('home')
		this.fetchData()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return ((this.props.currentUser !== nextProps.currentUser) || 
		(this.props.reviews !== nextProps.reviews) ||
		(this.props.currentPage !== nextProps.currentPage) ||
		(this.props.loading !== nextProps.loading)) &&
		nextProps.currentPage === 'home'
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
		if (!this.props.currentUser) {
			return <View/>
		}
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearch />
					</View>
				</View>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.props.loading}
							onRefresh={() => this.refreshData()}
						/>
					}
				>
					<View style={styles.body}>
						{ this.props.reviews &&
							<View>
								<ReviewList 
									review_list={this.props.reviews} 
									user={this.props.currentUser}
									toast={this.toast}
								/>
								{ this.props.reviews.length === 0 &&
									<NoFollowingReview/>
								}
							</View>
						}
					</View>
				</ScrollView>
				<PreviewReviewModal />
				<PreviewImageModal />
				<Toast ref={ref => this.toast = ref} position='bottom'/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
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
	reviews: state.reviewReducer.followingReviews,
	currentPage: state.menuReducer.currentPage,
	loading: state.reviewReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getFollowingReviews: () => {
		dispatch(ReviewActions.getFollowingReviews())
	},
	setCurrentPage: (page) => {
		dispatch(MenuActions.setCurrentPage(page))
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
