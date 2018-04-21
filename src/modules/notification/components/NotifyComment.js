import {
	StyleSheet,
	View,
	PixelRatio,
	Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import CoverImage from 'src/modules/shares/CoverImage'
import moment from 'moment'

export class NotifyComment extends Component {
	constructor(props) {
		super(props)
	}

	getTimeText(time) {
		if (Math.abs(moment().diff(time)) < 25000) {
			return 'Just now'
		}
		return moment(time).fromNow()
	}

	render() {
		return (
			<View style={styles.container}>
				<CoverImage size={80} uri={this.props.user.picture_url} />
				<View style={{ marginLeft: 13, flex: 1 }}>
					<Text>
						<Text style={styles.textName}>{this.props.user.name}</Text>
						<Text style={{ fontSize: 15, marginBottom: 4, color: colors.gray }}>
							{' '}commented on a review{' '}
						</Text>
						<Text style={styles.textName}>
							{this.props.review.title}
						</Text>
					</Text>
					<Text style={[styles.font15, { marginBottom: 4 }]}>
						{ this.getTimeText(this.props.review.timestamp) }
					</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: colors.lightGray2,
		borderWidth: 1 / PixelRatio.get(),
		height: 100
	},
	textName: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 4,
		color: colors.gray
	}	
})

export default NotifyComment

