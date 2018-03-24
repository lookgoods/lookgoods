import {
	Image,
	PixelRatio,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'

import CoverImage from 'src/modules/shares/CoverImage'
import NavBarSearch from '../shares/NavBarSearch'
import images from 'src/constants/images'

export default class NotificationPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSearch: false,
			searchText: ''
		}
	}

	setIsSearch() {
		this.setState({ isSearch: true })
	}

	handleSearchText(text) {
		if (text === '') {
			this.setState({ isSearch: false })
		} else {
			this.setState({ isSearch: true })
		}
		this.setState({ searchText: text })
	}

	async cancelSearch() {
		// Keyboard.dismiss()
		await this.setState({
			isSearch: false,
			// overlaySearch: false,
			searchText: ''
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={styles.list}>
						<CoverImage size={80} url={images.profile} />
						<View style={{ marginLeft: 13, flex: 1 }}>
							<Text>
								<Text style={styles.textName}>Phasin Sarunpornkul</Text>
								<Text style={{ fontSize: 15, marginBottom: 4 }}>
									{' '}
									commented on a review{' '}
								</Text>
								<Text style={styles.textName}>
									HyperX Cloud headset สุดยอดหูฟังเเนวหน้าของวงการ
								</Text>
							</Text>
							<Text style={[styles.font15, { marginBottom: 4 }]}>
								4 minutes ago
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.list}>
						<View style={styles.containerImage}>
							<Image
								style={{
									width: 85,
									height: 85,
									resizeMode: 'cover',
									borderWidth: 1,
									borderRadius: 3,
									borderColor: '#f1f1f1'
								}}
								source={images.product5}
								resizeMode="cover"
							/>
						</View>
						<View style={{ marginLeft: 13, flex: 1 }}>
							<Text style={[styles.font15, { marginBottom: 4 }]}>
								Phasin Sarunpornkul added a review HyperX Cloud headset
								สุดยอดหูฟังเเนวหน้าของวงการ
							</Text>
							<Text style={[styles.font15, { marginBottom: 4 }]}>
								4 minutes ago
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBarSearch
							overlaySearch={this.state.overlaySearch}
							searchText={this.state.searchText}
							isSearch={this.state.isSearch}
							handleSearchText={text => this.handleSearchText(text)}
							setIsSearch={() => this.setIsSearch()}
							cancelSearch={() => this.cancelSearch()}
						/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	body: {
		marginTop: Platform.OS === 'ios' ? 75 : 60
	},
	platformHeader: {
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		overflow: 'hidden',
		zIndex: 1
	},
	list: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: '#f1f1f1',
		borderWidth: 1 / PixelRatio.get(),
		height: 100
	},
	// coverIcon: {
	// 	height: 30,
	// 	width: 30,
	// 	borderWidth: 1.3,
	// 	borderRadius: 15,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: '#FFF',
	// 	borderColor: '#c8c8c8',
	// 	marginRight: 5
	// },
	textName: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 4
	},
	containerImage: {
		alignItems: 'center',
		width: 85
	}
})
