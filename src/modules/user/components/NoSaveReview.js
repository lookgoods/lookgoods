import {
	View,
	Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { APP_FULL_WIDTH } from 'src/constants'

export class NoSaveReview extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ backgroundColor: colors.white, flexDirection: 'column', alignItems: 'center' }}>
				<View style={{ marginTop: 20 }}>
					<IconFontAwesome name="bookmark" size={APP_FULL_WIDTH * 0.2} color={colors.gray}/>
				</View>
				<Text style={{ color: colors.gray, textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
					{'You do not save any review.\nYou can save interested review in your feed'}
				</Text>
			</View>
		)
	}
}

export default NoSaveReview
