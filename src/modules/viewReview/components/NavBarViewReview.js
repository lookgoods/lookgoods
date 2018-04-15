import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { colors } from 'src/constants/mixins'
import ActionSheet from 'react-native-actionsheet'

class NavBarViewReview extends Component {

	showActionSheet(index) {
		this.ActionSheet.show()
	}

	optionsSelect(index) {
		if (index === 0) {
			Actions.editReviewPage({review: this.props.review})
		} else if (index === 1) {
			this.props.deleteReview(this.props.review._id)
			Actions.pop()
		}
	}

	render () {
		const { name } = this.props.review.product
		return (
			<View style={styles.navBar} >
				<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row'}} >
					<TouchableOpacity 
						style={{ width: 50, alignItems: 'center', justifyContent: 'center'}} 
						onPress={() => Actions.pop()}
					>
						<IconIonicons name='ios-arrow-back' size={30} color={colors.gray} />
					</TouchableOpacity>
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray }}>{ name }</Text>
					</View>
					{ this.props.currentUser._id === this.props.review.user._id &&
						<TouchableOpacity style={{ width: 50, alignItems: 'center', justifyContent: 'flex-end'}} onPress={() => this.showActionSheet()} >
							<IconIonicons name='md-more' size={35} color={colors.gray}/>
						</TouchableOpacity>
					}
					<ActionSheet
						ref={o => this.ActionSheet = o}
						options={['Edit', 'Delete', 'Cancel']}
						cancelButtonIndex={2}
						destructiveButtonIndex={1}
						onPress={(index) => this.optionsSelect(index)}
					/>
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

export default NavBarViewReview