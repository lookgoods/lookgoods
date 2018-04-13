import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'

function checkStar(number, rating) {
	if (number < rating) return 'star'
	return 'star-o'
}

export default class StarBar extends Component {
	constructor (props) {
		super(props)
		this.state = {
			rating: 0
		}
	}

	async selectStar(index) {
		await this.props.handleChangeRating(index+1)
	}

	render() {
		if (this.props.type === 'view') {
			return ( 
				<View style={styles.starBar}>
					{ Array.apply(null, Array(5)).map((item, index) => (
						<IconFontAwesome key={index} style={styles.star} name={checkStar(index, this.props.rating)} size={this.props.size} color={colors.yellow}/>
					)) }
				</View>	
			)
		}
		return ( 
			<View style={styles.starBar}>
				{ Array.apply(null, Array(5)).map((item, index) => (
					<TouchableOpacity key={index} onPress={() => this.selectStar(index)}>
						<IconFontAwesome style={styles.star} name={checkStar(index, this.props.rating)} size={this.props.size} color={colors.yellow}/>
					</TouchableOpacity>
				)) }
			</View>	
		)
	}
}

const styles = StyleSheet.create({
	starBar: {
		flexDirection: 'row'
	},
	star: {
		marginRight: 5
	}
})
