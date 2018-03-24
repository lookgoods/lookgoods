import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

import CoverImage from 'src/modules/shares/CoverImage'
import { colors } from 'src/constants/mixins'

export default class AddComment extends Component {
	constructor (props) {
		super(props)
		this.state = {
			message: '',
			rating: 0
		}
	}

	render() {
		if (!this.props.user) return <View/>
		else {
			const { picture_url } = this.props.user
			return (
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<CoverImage uri={picture_url} size={80}/>
					</View>
					<Text>Tap to rate</Text>
					<TextInput
						placeholder='Add a comment'
						value={this.state.message}
						onChangeText={(message) => this.setState({ message })}
					/>
					<Text>{this.state.message}</Text>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	
})