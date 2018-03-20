import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import CoverImage from 'src/modules/shares/CoverImage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from 'src/constant/mixins'
import images from 'src/constant/images'

export default class CommentSection extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log(this.props.review, 'review')
    const { picture_cover_url, product, user, rating, title, content_list, product_price, tag_list } = this.props.review
    return (
        <View>
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
  
})
