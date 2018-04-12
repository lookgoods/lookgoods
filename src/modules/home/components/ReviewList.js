import React, { Component } from 'react'
import {
	StyleSheet,
	View
} from 'react-native'

import ReviewCard from 'src/modules/home/components/ReviewCard'

export default class ReviewList extends Component {
	constructor (props) {
		super(props)
	}
  
	render() {
		return (
			<View style={styles.container}>
				{ this.props.review_list && (
					this.props.review_list.map((review, index) => (
						<View key={index} style={styles.reviewCard}>
							{ review.available && (
								<ReviewCard key={index} review={review} user={this.props.user}/>
							)}
						</View>
					))
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	reviewCard: {
		marginBottom: 10
	}
})