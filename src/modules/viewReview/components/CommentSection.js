import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import Comment from 'src/modules/viewReview/components/Comment'
import StarBar from 'src/modules/viewReview/components/StarBar'
import { colors } from 'src/constants/mixins'

function countRatingFrequency(comment_list) {
	let rating_frequency_list = [0, 0, 0, 0, 0]
	for (const comment of comment_list) {
		rating_frequency_list[5-comment.rating]++ 
	}
	return rating_frequency_list
}

function RatingFrequency ({ comment_list }) {
	const rating_frequency_list = countRatingFrequency(comment_list)
	return (
		<View style={styles.ratingFrequencyPanel}>
			{ rating_frequency_list.map((rating_count, index) => (
				<View style={styles.ratingRow} key={index}>
					<StarBar rating={5-index} size={20}/>
					<View style={styles.progressBar}>
						<View style={{ height: 15, width: `${rating_count/(comment_list.length)*100}%`, backgroundColor: colors.darkBlue}}/>
					</View>
					<Text>{rating_count}</Text>
				</View>
			))}
		</View>
	)
}

const CommentList = ({ comment_list }) => (
	<View style={styles.commentList}>
		{ comment_list.map((comment, index) => (
			<View style={styles.commentItem} key={index}>
				<Comment comment={comment}/>
			</View>
		))}
	</View>
)
    

export default class CommentSection extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		const { comment_list } = this.props.review
		if (comment_list.length === 0) return <View/>
		return (
			<View>
				<Text style={styles.totalText}>{comment_list.length} Reviews</Text>
				<RatingFrequency comment_list={comment_list}/>
				<CommentList comment_list={comment_list}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	totalText: {
		fontWeight: 'bold',
		marginTop: 15,
		marginLeft: 30
	},
	ratingRow: {
		flexDirection: 'row'
	},
	ratingFrequencyPanel: {
		marginTop: 10,
		marginLeft: 20,
		marginBottom: 20
	},
	progressBar: {
		backgroundColor: colors.lightGray,
		height: 15,
		width: 200,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10
	},
	commentList: {
		marginLeft: 20
	},
	commentItem: {
		marginBottom: 20
	}
})