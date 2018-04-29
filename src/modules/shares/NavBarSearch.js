import React, { Component } from 'react'
import {
	StyleSheet,
	Platform,
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'

class NavBarSearch extends Component {
	render() {
		return (
			<TouchableOpacity onPress={() => Actions.SearchPage()}>
				<View style={Platform.OS === 'ios' ? styles.navBarIOS : styles.navBar}>
					<View
						style={{
							flex: 1,
							height: 42,
							borderRadius: 20,
							flexDirection: 'row',
							alignItems: 'center',
							backgroundColor: colors.orange,
							paddingHorizontal: 15,
							marginHorizontal: 10
						}}
					>
						<IconFontAwesome
							name={'search'}
							size={15}
							color="#fff"
							style={styles.searchIcon}
						/>
						<Text
							style={{ flex: 1, marginTop: 5, color: colors.white, fontSize: 15 }}
						>
							Search
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	navBar: {
		justifyContent: 'center',
		flexDirection: 'row',
		zIndex: 1,
		paddingHorizontal: 5,
		backgroundColor: colors.white,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5
	},
	navBarIOS: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		zIndex: 1,
		paddingHorizontal: 5,
		backgroundColor: colors.white,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 1,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5
	},
	searchIcon: {
		backgroundColor: 'transparent',
		marginRight: 10
	}
})

export default NavBarSearch
