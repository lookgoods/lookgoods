import { Image, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

class CoverImage extends Component {

	render () {
		const { size, url, uri } = this.props
		return (
			<View
				style={[
					styles.borderCover,
					{ height: size, width: size },
					{ backgroundColor: '#FFF' }
				]}
			>
				{url !== '' && (
					<Image
						style={{
							height: size - 10,
							width: size - 10,
							borderRadius: (size - 10) / 2
						}}
						source={ url }
						resizeMode='cover'
					/>
				)}

				{uri !== '' && (
					<Image
						style={{
							height: size - 10,
							width: size - 10,
							borderRadius: (size - 10) / 2
						}}
						source={ {uri: uri} }
						resizeMode='cover'
					/>
				)}

				{(url === '' && uri === '') && (
					<IconFontAwesome name='user-o' size={25}/>
				)}
			</View>
		)
	}
}

CoverImage.propTypes = {
	size: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	borderCover: {
		// borderWidth: 1,
		// borderRadius: 36,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CoverImage
