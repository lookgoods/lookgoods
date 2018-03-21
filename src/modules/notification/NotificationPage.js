import {
	Platform,
	StyleSheet,
	Text,
	View,
	PixelRatio,
	TouchableOpacity,
	Image
} from 'react-native'
import React, { Component } from 'react'
import CoverImage from 'src/modules/shares/CoverImage'
import NavBar from 'src/modules/shares/NavBar'
import images from 'src/constants/images'

export default class NotificationPage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={styles.list}>
						<CoverImage size={80} url={images.profile} />
						<View style={{ marginLeft: 13, flex: 1 }}>
							<View style={{}}>
								{/* <Text style={styles.textName}>Phasin Sarunpornkul </Text> */}
								<Text style={{ fontSize: 15, marginBottom: 4 }}>
									Phasin Sarunpornkul commented on a review HyperX Cloud headset
									สุดยอดหูฟังเเนวหน้าของวงการ
								</Text>
							</View>
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
						<NavBar titleName="NotificationPage" />
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
		paddingTop: Platform.OS === 'ios' ? 25 : 0
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
	// textName: {
	// 	fontSize: 15,
	// 	fontWeight: 'bold',
	// 	marginBottom: 4
	// },
	containerImage: {
		alignItems: 'center',
		width: 85
	}
})
