import {
	View,
	Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { APP_FULL_WIDTH } from 'src/constants'

export class EmptySearch extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
				<IconMaterial name="search" size={APP_FULL_WIDTH * 0.5} color={colors.gray2} />
				<Text style={{ color: colors.gray, fontSize: 20, marginTop: 20 }}>No Results</Text>
			</View>
		)
	}
}

export default EmptySearch
