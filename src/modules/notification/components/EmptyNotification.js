import {
	View,
	Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import { APP_FULL_WIDTH } from 'src/constants'

export class EmptyNotification extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				<IconMaterial name="notifications-paused" size={APP_FULL_WIDTH * 0.5} color={colors.orange} />
				<Text style={{ color: colors.orange, fontSize: 20, marginTop: 20 }}>No notification !</Text>
			</View>
		)
	}
}

export default EmptyNotification
