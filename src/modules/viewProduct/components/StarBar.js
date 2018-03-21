import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constant/mixins'

function checkStar(number, rating) {
    if(number < rating) return 'star'
    return 'star-o'
}

export default class StarBar extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
        <View style={styles.starBar}>
            { Array.apply(null, Array(5)).map( (item, index) => (
            <IconFontAwesome key={index} style={styles.star} name={checkStar(index, this.props.rating)} size={this.props.size} color={colors.yellow}/>
            )) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    starBar: {
        flexDirection: 'row'
      },
      star: {
        marginRight: 5
      },
  
})
