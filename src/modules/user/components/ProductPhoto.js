import { Image, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import { colors } from 'src/constants/mixins'

export default class ProductPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				{ this.props.product.image_url ?
					<Image
						source={this.props.product.image_url}
						style={styles.product_image}
						resizeMode='contain'
					/>: <View/> }
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
		height: '100%'
	}
})