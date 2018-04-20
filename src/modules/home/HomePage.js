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
import PreviewReviewModal from 'src/modules/shares/PreviewReviewModal'
import PreviewImageModal from 'src/modules/shares/PreviewImageModal'
import PTRView from 'react-native-pull-to-refresh'
import SocketIOClient from 'socket.io-client'
import constants from 'src/redux/constants'

export class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
		this.socket = SocketIOClient(constants.AppURL)

	}

	fetchData() {
		this.props.getFollowingReviews()
	}

	refreshData () {
		this.fetchData()
	}

	componentDidMount() {
		this.fetchData()
		this.openSocket()
	}

	openSocket() {
		if (this.props.currentUser) {
			console.log('send user to socket', this.props.currentUser._id)
			this.socket.emit('authenUser', JSON.stringify({ userId: this.props.currentUser._id }))
		}
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
				<PTRView onRefresh={() => this.refreshData()}>
					<ScrollView>
						<View style={styles.body}>
							<ReviewList review_list={this.props.reviews} user={this.props.currentUser}/>
						</View>
					</ScrollView>
				</PTRView>
				<PreviewReviewModal />
				<PreviewImageModal />
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
	reviews: state.reviewReducer.followingReviews,
	currentPage: state.menuReducer.currentPage,
	loading: state.reviewReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getFollowingReviews: () => {
		dispatch(ReviewActions.getFollowingReviews())
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
