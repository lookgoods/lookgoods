import { Image, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import { colors } from 'src/constants/mixins'
import { PICTURE_GRID_SIZE } from 'src/constants'

export default class ProductPhoto extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.product.picture_thumbnail_url ? (
					<Image
						source={{ uri: this.props.product.picture_thumbnail_url }}
						style={styles.product_image}
						resizeMode="contain"
					/>
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
	product_image: {
		width: PICTURE_GRID_SIZE,
		height: PICTURE_GRID_SIZE
	}
})
