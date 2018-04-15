import {
	Platform,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import ReviewsGrid from 'src/modules/user/components/ReviewsGrid'

export class ViewTagReviewsPage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName={this.props.tagName} />
					</View>
				</View>
				<ScrollView>
					<View style={styles.body}>
						<ReviewsGrid review_list={this.props.tagReviews} page={'GlobalPage'}/>
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
	body: {
		backgroundColor: colors.white
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
	tagReviews: state.reviewReducer.tagReviews,
	tagName: state.reviewReducer.tagName
})

export default connect(mapStateToProps, null)(ViewTagReviewsPage)

