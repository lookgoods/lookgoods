import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { colors } from 'src/constants/mixins'

class NavBar extends Component {
	render () {
		const { titleName } = this.props
		return (
			<View style={styles.navBar} >
				<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row'}} >
					<TouchableOpacity 
						style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
						onPress={
							() => {
								Actions.pop()
							}
						}
					>
						<IconIonicons name='ios-arrow-back' size={30} color={colors.gray} />
					</TouchableOpacity>
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray }}>{ titleName }</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar: { 
		flex: 1,
		justifyContent: 'center', 
		flexDirection: 'row',
		zIndex: 1,
		backgroundColor: colors.white,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 1,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5
	}
})

export default NavBar