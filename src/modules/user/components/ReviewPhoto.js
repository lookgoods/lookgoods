import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
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
							style={styles.review_image}
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
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentReview: review => {
		dispatch(ReviewActions.setCurrentReview(review))
	}
})

export default connect(null, mapDispatchToProps)(ReviewPhoto)
