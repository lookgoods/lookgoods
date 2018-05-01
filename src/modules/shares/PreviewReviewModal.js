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
import icons from 'src/constants/icons'
import StarBar from 'src/modules/viewReview/components/StarBar'
import CoverImage from 'src/modules/shares/CoverImage'

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
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<View style={{ position: 'absolute', left: 10 }}>
							<CoverImage size={50} uri={this.props.review.user.picture_url}/>
						</View>
						<Text style={styles.productName}>
							{this.props.review.product.name}
						</Text>
					</View>
					<Image
						style={styles.imageStyle}
						source={{ uri: this.props.review.picture_cover_url }}
						resizeMode='cover'
					/>
					<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
						<View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
							<StarBar rating={this.props.review.rating} size={30} type='view'/>
						</View>
						{ this.props.review.price &&
							<View style={{ flexDirection: 'row', marginRight: 10 }}>
								<Text style={{ fontSize: 20, marginRight: 5, color: colors.gray }}>{this.props.review.price}</Text>
								<Image
									source={icons.baht}
									resizeMode="cover"
									style={styles.priceIcon}
								/>
							</View> }
					</View>
				</View>
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
	showPreviewReview: state.imageReducer.showPreviewReview,
	review: state.imageReducer.previewReview
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white, 
		borderRadius: 5 
	},
	imageStyle: {
		width: '100%',
		aspectRatio: 1
	},
	productName: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.gray
	},
	priceIcon: {
		width: 30,
		height: 30
	}
})

export default connect(mapStateToProps, null)(PreviewReviewModal)