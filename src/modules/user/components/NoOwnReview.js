import {
	View,
	Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { APP_FULL_WIDTH } from 'src/constants'

export class NoOwnReview extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ backgroundColor: colors.white, flexDirection: 'column', alignItems: 'center' }}>
				<Text style={{ color: colors.gray, textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
					{'You do not have any review yet.\nYou create own review by touch add icon below.'}
				</Text>
				<View style={{ marginTop: 30 }}>
					<IconFontAwesome name="arrow-down" size={APP_FULL_WIDTH * 0.2} color={colors.gray} />
				</View>
			</View>
		)
	}
}

export default NoOwnReview
