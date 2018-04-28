import { Image, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Icons from 'src/constants/icons'
import { colors } from 'src/constants/mixins'

class CoverImage extends Component {
	render() {
		const { size, url, uri } = this.props
		return (
			<View
				style={[
					styles.borderCover,
					{ height: size, width: size },
					{ backgroundColor: colors.transparent }
				]}
			>
				{url !== undefined && (
					<Image
						style={{
							height: size - 10,
							width: size - 10,
							borderRadius: (size - 10) / 2
						}}
						source={url}
						resizeMode="cover"
					/>
				)}

				{uri !== undefined && (
					<Image
						style={{
							height: size - 10,
							width: size - 10,
							borderRadius: (size - 10) / 2
						}}
						source={{ uri: uri }}
						resizeMode="cover"
					/>
				)}

				{url === undefined &&
					uri === undefined && (
					<Image
						style={{
							height: size - 10,
							width: size - 10,
							borderRadius: (size - 10) / 2
						}}
						source={Icons.user}
						resizeMode="cover"
					/>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	borderCover: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CoverImage
