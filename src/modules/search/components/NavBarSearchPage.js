import React, { Component } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { colors } from 'src/constants/mixins'

class NavBarSearchPage extends Component {
	render() {
		const {
			searchText,
			isSearch,
			handleSearchText,
			cancelSearch,
			setIsSearch
		} = this.props
		return (
			<View style={styles.navBar}>
				<TouchableOpacity style={styles.boxIcon} onPress={() => Actions.pop()}>
					<IconIonicons
						name={'ios-arrow-back'}
						size={20}
						color={colors.gray}
						style={styles.backgroundTranparent}
					/>
				</TouchableOpacity>
				<View style={styles.searchBox}>
					<IconFontAwesome
						name={'search'}
						size={15}
						color="#fff"
						style={styles.searchIcon}
					/>
					<TextInput
						style={{ flex: 1, marginTop: 5, color: '#FFF', fontSize: 15 }}
						value={searchText}
						autoFocus={isSearch}
						placeholder="Search"
						placeholderTextColor="rgba(255, 255, 255, 0.7)"
						underlineColorAndroid="transparent"
						onChangeText={text => handleSearchText(text)}
						onFocus={() => setIsSearch()}
					/>
					{isSearch && (
						<TouchableOpacity
							style={styles.boxIcon}
							onPress={() => cancelSearch()}
						>
							<IconIonicons
								name={'ios-close-circle'}
								size={16}
								color={colors.white}
								style={styles.backgroundTranparent}
							/>
						</TouchableOpacity>
					)}
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
	backgroundTranparent: {
		backgroundColor: 'transparent'
	},
	searchBox: {
		flex: 1,
		height: 42,
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.16)',
		paddingHorizontal: 15,
		marginHorizontal: 10,
		marginTop: 5
	},
	searchIcon: {
		backgroundColor: 'transparent',
		marginRight: 10
	},
	boxIcon: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default NavBarSearchPage
