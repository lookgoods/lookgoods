import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { colors } from 'src/constant/mixins'

export default class ProductPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View>
				{ this.props.product.image_url ?
					<Image
						source={this.props.product.image_url}
						style={styles.product_image}
						resizeMode='cover'
					/>
				: <View/> }
			</View>
		)
	}
}


const styles = StyleSheet.create({
    product_image: {
        width: 125,
		height: 125
    }
})