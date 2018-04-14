import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native'
import Modal from 'react-native-modal'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'

class PreviewReviewModal extends Component {
	render () {
		if (!this.props.review) return <View/>
		return (
			<Modal 
				isVisible={this.props.showPreviewReview}
				backdropColor={colors.gray2}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
			>
				<View style={styles.container}>
					<Image
						style={styles.imageStyle}
						source={{ uri: this.props.review.picture_cover_url }}
						resizeMode='contain'
					/>
				</View>
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
	showPreviewReview: state.imageReducer.showPreviewReview,
	review: state.imageReducer.previewItem
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white, 
		borderRadius: 5, 
		alignItems: 'center'
	},
	imageStyle: {
		width: APP_FULL_WIDTH,
		aspectRatio: 1
	}
})

export default connect(mapStateToProps, null)(PreviewReviewModal)