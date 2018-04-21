import { AppRegistry } from 'react-native'
import App from 'src/routes'
import React from 'react'

export default class MainApplication extends React.Component {
	render() {
		return App
	}
}

AppRegistry.registerComponent('LookGoods', () => MainApplication)
