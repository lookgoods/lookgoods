import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { colors } from 'src/constant/mixins'
import { Actions } from 'react-native-router-flux'

export default class LoginPage extends Component {
    constructor (props) {
        super(props)

    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Login with Facebook' 
                    backgroundColor={colors.blue}
                />
            </View>
            <Button
                    title='Go to Homepage'
                    style={ { marginTop: 10 }}
                    onPress={ () => Actions.tabMenu() }
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginTop: 50,
        marginBottom: 10
    }
})