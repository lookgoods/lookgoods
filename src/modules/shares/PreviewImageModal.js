import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Image
} from 'react-native'
import Modal from 'react-native-modal'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'

class PreviewImageModal extends Component {
	render () {
		return (
			<Modal 
				isVisible={this.props.showPreviewImage}
				backdropColor={colors.gray2}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
			>
				<View style={styles.container}>
					<Image
						style={styles.imageStyle}
						source={{ uri: this.props.previewImageUrl }}
						resizeMode='contain'
					/>
				</View>
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
	showPreviewImage: state.imageReducer.showPreviewImage,
	previewImageUrl: state.imageReducer.previewImage
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

export default connect(mapStateToProps, null)(PreviewImageModal)