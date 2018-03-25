import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import ProductPhoto from 'src/modules/user/components/ProductPhoto'

export default class ProductsGrid extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.product_list ? (
					this.props.product_list.map((product, index) => (
						<View key={index} style={styles.productPhoto}>
							<ProductPhoto key={index} product={product} />
						</View>
					))
				) : (
					<View />
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	productPhoto: {
		paddingVertical: 2,
		paddingHorizontal: 2,
		// width: Dimensions.get('window').width / 3,
		// height: Dimensions.get('window').width / 3
		width: '33%',
		aspectRatio: 1
	}
})
