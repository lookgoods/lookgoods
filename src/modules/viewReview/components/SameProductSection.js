import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'
import { colors } from 'src/constants/mixins'
import { connect } from 'react-redux'

    
class SameProductSection extends Component {
	constructor (props) {
		super(props)
	}

	componentDidMount() {
        
	}

	render() {
		return (
			<View style={styles.container}>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	comments: state.commentReducer.comments,
	chats: state.chatReducer.chats,
	successComment: state.commentReducer.success,
	successChat: state.chatReducer.success
})

export default connect(mapStateToProps, null)(SameProductSection)
