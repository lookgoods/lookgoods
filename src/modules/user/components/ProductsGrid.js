import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { colors } from 'src/constant/mixins'
import ProductPhoto from 'src/modules/user/components/ProductPhoto'

export default class ProductsGrid extends Component {
	constructor (props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				{ this.props.product_list ? this.props.product_list.map( ( product, index ) => (
					<View key={index} style={styles.productPhoto}>
						<ProductPhoto key={index} product={product}/>
					</View>
				) ) : <View/>}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	productPhoto: {
		paddingVertical: 2,
		paddingHorizontal: 2
	}
})