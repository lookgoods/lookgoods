import {
	Image,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { Component } from 'react'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constants/mixins'

export default class ContentView extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			contentList,
			contentMessage,
			isEditButton,
			setEditButton,
			handleChangeTextBox,
			deleteContentBox
		} = this.props
		return (
			<View>
				<View style={{ marginTop: 15 }}>
					<View style={{ marginBottom: 5, flexDirection: 'row' }}>
						<Text style={styles.label}>
							Content<Text style={styles.fontRed}> *</Text>
						</Text>
						<View style={styles.bodyEditContent}>
							{contentList.length === 0 ? (
								<View style={{ marginLeft: 24, flexDirection: 'row' }}>
									<IconFontAwesome name="edit" color={colors.gray4} size={18} />
									<Text style={[styles.fontTextEdit, {color: colors.gray4}]}>Edit</Text>
								</View>
							) : (
								<TouchableOpacity
									style={{ marginLeft: 24, flexDirection: 'row' }}
									onPress={() => setEditButton()}
								>
									<IconFontAwesome name="edit" size={18} />
									<Text style={styles.fontTextEdit}>
										{isEditButton ? 'Done' : 'Edit'}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>

				{contentList.map((item, key) => (
					<View key={key}>
						{item.type === 'text' && (
							<View>
								{isEditButton && (
									<TouchableOpacity
										style={styles.deleteIcon}
										onPress={() => deleteContentBox(key)}
									>
										<IconMaterial name="cancel" color={colors.red} size={20} />
									</TouchableOpacity>
								)}
								<View style={styles.bodyTextInput}>
									<TextInput
										style={styles.textInputLabel}
										multiline
										maxHeight={300}
										underlineColorAndroid="transparent"
										onChangeText={text => handleChangeTextBox(key, text)}
										value={contentMessage[key]}
										keyboardType="default"
									/>
								</View>
							</View>
						)}

						{item.type === 'picture' && (
							<View>
								{isEditButton && (
									<TouchableOpacity
										style={{}}
										onPress={() => deleteContentBox(key)}
									>
										<IconMaterial name="cancel" color={colors.red} size={20} />
									</TouchableOpacity>
								)}
								<View
									style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
								>
									<Image
										style={{ flex: 1, height: 200, resizeMode: 'contain' }}
										source={{ uri: item.value }}
									/>
								</View>
							</View>
						)}
					</View>
				))}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bodyTextInput: {
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
		padding: 10,
		borderColor: colors.gray4,
		borderWidth: 1
	},
	label: {
		color: '#5C5C5C',
		fontSize: 15,
		marginLeft: 15,
		fontWeight: 'bold'
	},
	fontRed: {
		color: colors.red
	},
	fontTextEdit: {
		fontSize: 15,
		marginLeft: 5,
		marginRight: 15
	},
	deleteIcon: {
		top: 25,
		marginTop: -20,
		alignSelf: 'flex-end',
		right: 6,
		zIndex: 1
	},
	textInputLabel: {
		fontSize: 15,
		color: colors.gray,
		minHeight: 120,
		paddingTop: 0,
		paddingBottom: 0
	},
	bodyEditContent: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		alignItems: 'center'
	}
})
