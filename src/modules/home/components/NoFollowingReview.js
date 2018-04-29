import {
	View,
	Text,
	TouchableOpacity
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constants/mixins'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'

export class NoFollowingReview extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={{ backgroundColor: colors.white, flexDirection: 'column', alignItems: 'center' }}>
				<Text style={{ color: colors.gray, fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                    Welcome to 
					<Text style={{ color: colors.orange }}> LookGoods</Text>
				</Text>
				<Text style={{ color: colors.gray2, textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
					{'Get started by following other users.\nYou will see thier reviews here.'}
				</Text>
				<TouchableOpacity
					style={{ backgroundColor: colors.orange, borderRadius: 3, marginTop: 30, padding: 10 }}
					onPress={ () => this.props.viewReviewer() }
				>
					<Text style={{ color: colors.white }}>Follow People</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	viewReviewer: () => {
		dispatch(UserActions.viewReviewer())
	}
})

export default connect(null, mapDispatchToProps)(NoFollowingReview)
