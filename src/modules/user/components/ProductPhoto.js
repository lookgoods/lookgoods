import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { colors } from 'src/constant/mixins'

export default class ProductPhoto extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={[
				{ justifyContent: 'center', alignItems: 'center' },
				{ height: 110, width: 110 },
				{ backgroundColor: '#FFF' }
			  ]}
			>
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
        width: 110,
		height: 110
    }
})