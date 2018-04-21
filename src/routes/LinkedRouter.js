import React from 'react'
import { Linking } from 'react-native'
import { Router } from 'react-native-router-flux'
import crossroads from 'crossroads'
import store from 'src/redux/store'
import { Provider } from 'react-redux'

export default class LinkedRouter extends React.Component {
	constructor(props) {
		super(props)
		this.handleOpenURL = this.handleOpenURL.bind(this)
	}

	componentDidMount() {
		Linking
			.getInitialURL()
			.then(url => this.handleOpenURL({ url }))
			.catch(err => console.log('initial link error', err))

		Linking.addEventListener('url', this.handleOpenURL)
	}
    
	componentWillMount() {
		Linking.removeEventListener('url', this.handleOpenURL)
	}
    
	handleOpenURL(event) {
		if (event.url && event.url.indexOf(this.props.scheme + '://') === 0) {
			crossroads.parse(event.url.slice(this.props.scheme.length + 3))
		}
	}
    
	render() {
		return (
			<Provider store={store}>
				<Router { ...this.props }/>
			</Provider>
		)
	}
}