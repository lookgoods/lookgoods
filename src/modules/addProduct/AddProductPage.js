import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'

import ContentView from 'src/modules/addProduct/components/ContentView'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import ImageCropPicker from 'react-native-image-crop-picker'
import ImagePicker from 'react-native-image-picker'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constants/mixins'
import ReviewActions from 'src/redux/actions/review'
import { connect } from 'react-redux'

export class AddProductPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			name: '',
			price: '',
			brand: '',
			coverImage: '',
			numStar: ['star-o', 'star-o', 'star-o', 'star-o', 'star-o'],
			isAddButton: false,
			isEditButton: false,
			isTagsButton: false,
			tagsList: [{ tags: '' }],
			tagsMessage: [],
			contentMessage: [],
			contentList: [],
			rating: 0
		}
	}

	handleChangeTitle(text) {
		this.setState({ title: text })
	}

	handleChangeName(text) {
		this.setState({ name: text })
	}

	handleChangeBrand(text) {
		this.setState({ brand: text })
	}

	handleChangePrice(text) {
		this.setState({ price: text })
	}

	handleChangeTextBox(property, text) {
		const contact = this.state.contentMessage
		contact[property] = text
		this.setState({ contentMessage: contact })
	}

	handleChangeTags(property, text) {
		const tags = this.state.tagsMessage
		if (text === '') {
			this.setTagsButton(false)
		} else {
			this.setTagsButton(true)
		}
		tags[property] = text
		this.setState({ tagsMessage: tags })
	}

	addCoverImage() {
		const options = {
			title: 'Select Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		}

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				console.log('User cancelled photo picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
			} else {
				console.log('ImagePicker Success: ', response)
				this.setState({ coverImage: response })
			}
		})
		// ImageCropPicker.openPicker({
		// 	width: 370,
		// 	height: 200,
		// 	cropping: true
		// }).then(image => {
		// 	console.log(image)
		// 	this.setState({ coverImage: image.sourceURL })
		// })
	}

	attachPhotos() {
		const options = {
			title: 'Select Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		}

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				console.log('User cancelled photo picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
			} else {
				console.log('ImagePicker Success: ', response)
				const contentArr = this.state.contentList
				contentArr.push({ type: 'picture', value: response })
				this.setState({ contentList: contentArr })
				this.setAddButton()
			}
		})
	}

	setAmountRating(num) {
		this.setState({
			numStar: this.state.numStar.map((_, index) => {
				if (index < num) {
					return 'star'
				} else {
					return 'star-o'
				}
			}),
			rating: num
		})
	}

	setAddButton() {
		this.setState({ isAddButton: !this.state.isAddButton })
	}

	setEditButton() {
		this.setState({ isEditButton: !this.state.isEditButton })
	}

	setTagsButton(bool) {
		this.setState({ isTagsButton: bool })
	}

	addContentBox() {
		const contentArr = this.state.contentList
		contentArr.push({ type: 'text', value: '' })
		this.setState({ contentList: contentArr })
		this.setAddButton()
	}

	async addTagsBox() {
		const tagsArr = this.state.tagsList
		console.log(tagsArr, 'tagsArr')
		tagsArr.push({ tags: '' })
		await this.setState({ tagsList: tagsArr })
	}

	async addReview() {
		const contentMessage = this.state.contentMessage
		const contentList = this.state.contentList.map(
			(content, index) =>
				content.type === 'text'
					? { ...content, value: contentMessage[index] }
					: { ...content, value: content.value }
		)
		await this.setState({ contentList })

		const review = {
			title: this.state.title,
			price: this.state.price,
			brand: this.state.brand,
			tag: this.state.tagsMessage,
			picture_cover: this.state.coverImage,
			content_list: this.state.contentList,
			rating: this.state.rating,
			name: this.state.name
		}

		this.props.addReview(review)
	}

	deleteContentBox(key) {
		const contentList = this.state.contentList
		const contentMessage = this.state.contentMessage
		contentList.splice(key, 1)
		contentMessage.splice(key, 1)
		console.log(contentList, contentMessage, 'deleteContentBox')
		if (contentList.length === 0) {
			this.setState({ isEditButton: !this.state.isEditButton })
		}
		this.setState({ contentList, contentMessage })
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					bounces={false}
					style={styles.body}
				>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'row'
						}}
					>
						{this.state.coverImage === '' ? (
							<TouchableOpacity
								style={{
									flex: 1,
									height: 200,
									backgroundColor: colors.gray3,
									alignItems: 'center',
									justifyContent: 'center'
								}}
								onPress={() => this.addCoverImage()}
							>
								<IconMaterial name="add-a-photo" size={100} />
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={{ flex: 1, height: 200 }}
								onPress={() => this.addCoverImage()}
							>
								<Image
									style={{
										flex: 1,
										height: 200,
										resizeMode: 'cover',
										zIndex: 1
									}}
									source={{ uri: this.state.coverImage.uri }}
								/>
							</TouchableOpacity>
						)}
					</View>
					<View style={styles.sectionBody}>
						<Text style={styles.label}>Title</Text>
						<View style={styles.textBox}>
							<TextInput
								style={styles.textInput}
								value={this.state.title}
								underlineColorAndroid="transparent"
								onChangeText={text => this.handleChangeTitle(text)}
							/>
						</View>

						<Text style={styles.label}>Name</Text>
						<View style={styles.textBox}>
							<TextInput
								style={styles.textInput}
								value={this.state.name}
								underlineColorAndroid="transparent"
								onChangeText={text => this.handleChangeName(text)}
							/>
						</View>

						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, paddingRight: 10 }}>
								<Text style={styles.label}>Brand</Text>
								<View style={styles.textBox}>
									<TextInput
										style={styles.textInput}
										value={this.state.brand}
										underlineColorAndroid="transparent"
										onChangeText={text => this.handleChangeBrand(text)}
									/>
								</View>
							</View>
							<View style={{ flex: 1, paddingLeft: 10 }}>
								<Text style={styles.label}>Price</Text>
								<View style={styles.textBox}>
									<TextInput
										style={styles.textInput}
										value={this.state.price}
										underlineColorAndroid="transparent"
										onChangeText={text => this.handleChangePrice(text)}
									/>
								</View>
							</View>
						</View>

						<Text style={styles.label}>Tags</Text>
						{this.state.tagsList.map((item, key) => (
							<View key={key} style={{ flexDirection: 'row' }}>
								<View style={styles.textBox}>
									<TextInput
										style={styles.textInput}
										value={this.state.tagsMessage[key]}
										underlineColorAndroid="transparent"
										onChangeText={text => this.handleChangeTags(key, text)}
										keyboardType="default"
									/>
								</View>
								{this.state.tagsList.length - 1 === key &&
									this.state.isTagsButton && (
									<TouchableOpacity
										style={styles.buttonAddTag}
										onPress={() => this.addTagsBox()}
									>
										<IconMaterial name="add-circle" size={20} />
									</TouchableOpacity>
								)}
							</View>
						))}

						<Text style={styles.label}>Rating</Text>
						<View
							style={{
								flex: 1,
								marginLeft: 15,
								marginTop: 10,
								marginBottom: 10,
								flexDirection: 'row'
							}}
						>
							{this.state.numStar.map((item, key) => (
								<TouchableOpacity
									key={key}
									onPress={() => this.setAmountRating(key + 1)}
								>
									<IconFontAwesome
										style={{ marginRight: 12 }}
										name={item}
										size={35}
										color={colors.yellow_star}
									/>
								</TouchableOpacity>
							))}
						</View>

						<ContentView
							contentList={this.state.contentList}
							contentMessage={this.state.contentMessage}
							isEditButton={this.state.isEditButton}
							setEditButton={() => this.setEditButton()}
							handleChangeTextBox={(index, text) =>
								this.handleChangeTextBox(index, text)
							}
							deleteContentBox={index => this.deleteContentBox(index)}
						/>

						{this.state.isAddButton && (
							<View style={styles.blockAdd}>
								<TouchableOpacity
									style={styles.buttonAdd}
									onPress={() => this.setAddButton()}
								>
									<IconMaterial name="add-circle" size={40} />
								</TouchableOpacity>
							</View>
						)}

						{!this.state.isAddButton && (
							<View style={styles.blockOption}>
								<TouchableOpacity
									style={styles.buttonOptionLeft}
									onPress={() => this.addContentBox()}
								>
									<IconEntypo name="text" size={40} />
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.buttonOptionRight}
									onPress={() => this.attachPhotos()}
								>
									<IconFontAwesome name="picture-o" size={40} />
								</TouchableOpacity>
							</View>
						)}

						<View style={styles.blockSave}>
							<TouchableOpacity
								style={styles.buttonSave}
								onPress={() => this.addReview()}
							>
								<Text style={{ fontSize: 18, color: '#FFF' }}>ADD REVIEW</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
				<View style={styles.header}>
					<View style={styles.platformHeader}>
						<NavBar titleName="Add Review" />
					</View>
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
	label: {
		color: '#5C5C5C',
		fontSize: 15,
		marginLeft: 15,
		fontWeight: 'bold'
	},
	sectionBody: {
		backgroundColor: '#FFF',
		margin: 5,
		paddingHorizontal: 5,
		paddingTop: 10,
		paddingBottom: 10
	},
	textBox: {
		flex: 1,
		borderRadius: 3,
		justifyContent: 'center',
		backgroundColor: '#FFF',
		paddingHorizontal: 15,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		marginBottom: 10,
		borderColor: '#dfdfdf',
		borderWidth: 1
	},
	textInput: {
		flex: 1,
		color: '#000',
		fontSize: 15,
		height: 35,
		padding: 0
	},
	buttonAdd: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		height: 50,
		borderRadius: 3,
		zIndex: 2,
		borderColor: '#dfdfdf',
		borderWidth: 1
	},
	blockAdd: {
		paddingTop: 20,
		padding: 5
	},
	buttonSave: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: colors.orange,
		height: 50,
		borderRadius: 3,
		zIndex: 2
	},
	blockSave: {
		borderTopColor: '#f1f1f1',
		borderTopWidth: 1,
		shadowColor: '#808080',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		padding: 5
	},
	blockOption: {
		flexDirection: 'row',
		paddingTop: 20,
		padding: 5
	},
	buttonOptionLeft: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.gray2,
		height: 50,
		borderBottomLeftRadius: 3,
		borderTopLeftRadius: 3
	},
	buttonOptionRight: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.gray2,
		height: 50,
		borderBottomRightRadius: 3,
		borderTopRightRadius: 3
	},
	buttonAddTag: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: colors.white,
		height: 35,
		width: 35,
		borderRadius: 3,
		borderColor: '#dfdfdf',
		borderWidth: 1
	}
})

const mapDispatchToProps = dispatch => ({
	addReview: review => {
		dispatch(ReviewActions.addReview(review))
	}
})

export default connect(null, mapDispatchToProps)(AddProductPage)
