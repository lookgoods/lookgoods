import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ReviewPhoto from 'src/modules/user/components/ReviewPhoto'

export default class ReviewsGrid extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.review_list && (
					this.props.review_list.map((review, index) => {
						if (!review.available) return
						else return (
							<View key={index} style={styles.reviewPhoto}>
								<ReviewPhoto key={index} review={review} page={this.props.page}/>
							</View>
						) })
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	reviewPhoto: {
		paddingVertical: 2,
		paddingHorizontal: 1,
		width: '33.33%',
		aspectRatio: 1
	}
})
