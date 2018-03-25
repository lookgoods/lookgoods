import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'

class NavBarSearch extends Component {
	render() {
		return (
			<View style={styles.navBar}>
				<View
					style={{
						flex: 1,
						height: 42,
						borderRadius: 20,
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.16)',
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
					<Text style={{ flex: 1, marginTop: 5, color: '#FFF', fontSize: 15 }}>
						Search
					</Text>
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
