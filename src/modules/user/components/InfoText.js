import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import React, { Component } from 'react'
import { colors } from 'src/constant/mixins'

export default class InfoText extends Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.number}>{this.props.number}</Text>
            <Text style={styles.text}>{this.props.title}</Text>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    number: {
        color: colors.meat,
        fontSize: 25
    },
    text: {
        fontSize: 12
    }
  })