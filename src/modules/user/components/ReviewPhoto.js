import { StyleSheet, Image, Platform, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import { colors } from 'src/constants/mixins'
import { PICTURE_GRID_SIZE } from 'src/constants'
import ReviewActions from 'src/redux/actions/review'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

export class ReviewPhoto extends Component {
	constructor(props) {
		super(props)
	}

	styleImageGrid(page) {
		if (Platform.OS === 'ios') {
			if (page === 'GlobalPage' || page === 'SearchPage') {
				return styles.review_image_grid
			} else {
				return styles.review_image_grid_user
			}
		} else {
			return styles.review_image
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.review.picture_thumbnail_url ? (
					<TouchableOpacity
						onPress={() => {
							this.props.setCurrentReview(this.props.review)
							Actions.viewReviewPage()
						}}
					>
						<Image
							source={{ uri: this.props.review.picture_thumbnail_url }}
							style={this.styleImageGrid(this.props.page)}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				) : (
					<View />
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	review_image: {
		width: PICTURE_GRID_SIZE,
		height: PICTURE_GRID_SIZE
	},
	review_image_grid: {
		width: PICTURE_GRID_SIZE - 2,
		height: PICTURE_GRID_SIZE - 2
	},
	review_image_grid_user: {
		width: PICTURE_GRID_SIZE - 10,
		height: PICTURE_GRID_SIZE - 10
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentReview: review => {
		dispatch(ReviewActions.setCurrentReview(review))
	}
})

export default connect(null, mapDispatchToProps)(ReviewPhoto)
