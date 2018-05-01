import {
	StyleSheet,
	View,
	PixelRatio,
	Text,
	Image
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
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
				<View style={styles.containerImage}>
					<Image
						style={{
							width: 80,
							height: 80,
							resizeMode: 'cover',
							borderRadius: 3
						}}
						source={{ uri: this.props.review.picture_cover_url }}
						resizeMode="cover"
					/>
				</View>
				<View style={{ marginLeft: 13, flex: 1 }}>
					<Text>
						<Text style={styles.textName}>{this.props.user.name}</Text>
						<Text style={{ fontSize: 15, marginBottom: 4, color: colors.gray }}>
							{' '}add a review{' '}
						</Text>
						<Text style={styles.textName}>
							{this.props.review.title}
						</Text>
					</Text>
					<Text style={{ color: colors.gray2, marginBottom: 4, fontSize: 13 }}>
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
		borderWidth: 1 / PixelRatio.get()
	},
	textName: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 4,
		color: colors.gray
	},
	containerImage: {
		alignItems: 'center',
		width: 85
	}	
})

export default NotifyComment

