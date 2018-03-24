import {
	Platform,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'

import AddComment from 'src/modules/viewProduct/components/AddComment'
import CommentSection from 'src/modules/viewProduct/components/CommentSection'
import ContentSection from 'src/modules/viewProduct/components/ContentSection'
import { Divider } from 'react-native-elements'
import NavBar from 'src/modules/shares/NavBar'
import UserActions from 'src/redux/actions/user'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

export class ViewProductPage extends Component {
	constructor (props) {
		super(props)
	}

	componentDidMount() {
		this.props.getCurrentUser()
	}

	render() {
		const { product } = this.props.review
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName={product.name}/>
					</View>
				</View>
				<ScrollView>
					<ContentSection review={this.props.review}/>
					<Divider style={styles.divider}/>
					<CommentSection review={this.props.review}/>
					<AddComment style={styles.addComment} user={this.props.currentUser}/>
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
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.transparent,
		overflow: 'hidden',
		zIndex: 1
	},
	divider: {
		backgroundColor: colors.gray2,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	},
	addComment: {
		marginTop: 10
	}
})

const mapStateToProps = state => ({
	review: state.reviewReducer.currentReview,
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	getCurrentUser: () => {
		dispatch(UserActions.getCurrentUser())
	}       
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewProductPage)