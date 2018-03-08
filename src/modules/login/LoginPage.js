import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { colors } from 'src/constant/mixins'
import { Actions } from 'react-native-router-flux'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

const { LoginButton, AccessToken } = FBSDK

export default class LoginPage extends Component {

    constructor (props) {
        super(props)

    }

    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
            if(result.isCancelled) {
                console.log('Loging was cancelled')
            } else {
                console.log('Login was a success' + result.grantedPermissions.toString())
                Actions.tabMenu()
            }
        }, function(error) {
            console.log('an error occured')
        })
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button 
                        title='SIGN IN WITH FACEBOOK' 
                        backgroundColor={colors.blueFacebook}
                        onPress={ () => this._fbAuth() }
                        buttonStyle={styles.signinBtn}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    buttonContainer: {
        marginBottom: 100,
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10
    },
    signinBtn: {
        borderRadius: 2
    }
})