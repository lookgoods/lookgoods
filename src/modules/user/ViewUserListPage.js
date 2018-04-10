import {
	Platform,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	View
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

export class ViewUserPage extends Component {
	constructor(props) {
		super(props)
	}
    
	goToViewUser(user) {
		console.log(user, 'go to view user')
		this.props.setSelectedUser(user)
		Actions.viewUserPage()
	}


	render() {
		if (!this.props.users || !this.props.title) {
			return <View/>
		}
		else {
			console.log(this.props.users, 'user')
			return (
				<View style={styles.container}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						scrollEventThrottle={16}
						bounces={false}
						style={styles.body}
					>
						<View style={styles.header}>
							<View style={styles.platformHeader}>
								<NavBar titleName={this.props.title} />
							</View>
						</View>
						<List containerStyle={{ borderBottomColor: colors.transparent }}>
							{
								this.props.users.map((user, index) => (
									<ListItem
										avatar={
											<TouchableOpacity onPress={() => this.goToViewUser(user)}>
												<CoverImage size={70} uri={user.picture_url} />
											</TouchableOpacity>
										}
										key={index}
										title={user.name}
										hideChevron={true}
										titleStyle={{ fontWeight: 'bold', color: colors.gray }}
									/>
								))
							}
						</List>
					</ScrollView>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
	body: {
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

const mapDispatchToProps = dispatch => ({
	setSelectedUser: user => {
		dispatch(UserActions.setSelectedUser(user))
	}
})

export default connect(null, mapDispatchToProps)(ViewUserPage)
