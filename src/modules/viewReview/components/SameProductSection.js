import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import { PICTURE_GRID_SIZE } from 'src/constants'
import { Actions } from 'react-native-router-flux'

const ProductCard = ({ review }) => (
	<TouchableOpacity 
		style={{ marginLeft: 10, width: PICTURE_GRID_SIZE }}
		onPress={ () => {
			Actions.viewReviewPage({ review_id: review._id })
		}}
	>
		<Image 
			source={{ uri: review.picture_thumbnail_url }} 
			resizeMode='cover'
			style={{ width: PICTURE_GRID_SIZE, height: PICTURE_GRID_SIZE, borderRadius: 10 }}
		/>
		<Text style={{ marginLeft: 2, marginTop: 2, color: colors.gray, textAlign: 'left', fontWeight: 'bold' }}>
			{review.title}
		</Text>
		<Text style={{ marginLeft: 2, marginTop: 2, color: colors.gray2, textAlign: 'left', fontSize: 10 }}>
            by {review.user.name}
		</Text>
	</TouchableOpacity>
)

class SameProductSection extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		if (!this.props.reviews || (this.props.reviews && this.props.reviews.length === 0)) return <View/>
		return (
			<View style={styles.container}>
				<Text style={{ fontWeight: 'bold', color: colors.gray, marginLeft: 10, marginBottom: 15 }}>Reviews which same product</Text>
				<ScrollView style={styles.wrapper} horizontal={true}>
					{ this.props.reviews.map((review, index) => {
						if (review.available) return (<ProductCard 
							review={review} 
							key={index} 
						/>)
						else return <View key={index}/>
					})}
				</ScrollView>
				<Divider style={styles.divider} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginRight: 10
	},
	wrapper: {
		flexDirection: 'row',
		marginBottom: 5
	},
	divider: {
		backgroundColor: colors.lightGray,
		marginTop: 5,
		height: 1.2,
		width: '100%'
	}
})

const mapStateToProps = state => ({
	reviews: state.searchReducer.products
})

export default connect(mapStateToProps, null)(SameProductSection)
