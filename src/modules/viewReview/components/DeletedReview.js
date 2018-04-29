import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'
import NavBar from 'src/modules/shares/NavBar'
import { APP_FULL_HEIGHT, APP_FULL_WIDTH } from 'src/constants'

class DeletedReview extends Component {

	constructor(props) {
		super(props)
	}

	render () {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName='No review found' />
					</View>
				</View>
				<View style={{ flexDirection: 'column', alignItems: 'center'}}>
					<View style={{ marginTop: APP_FULL_HEIGHT*0.1 }}>
						<IconFontAwesome name="exclamation-circle" size={APP_FULL_WIDTH * 0.5} color={colors.gray} />
					</View>
					<Text style={{ color: colors.gray, fontSize: 18, marginTop: 20 }}>
                        This review has already deleted.
					</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: { 
		flex: 1,
		backgroundColor: colors.white
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 0
	},
	header: {
		backgroundColor: colors.white,
		overflow: 'hidden'
	}
})

export default DeletedReview