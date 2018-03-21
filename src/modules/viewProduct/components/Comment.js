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
import StarBar from 'src/modules/viewProduct/components/StarBar'
import { colors } from 'src/constant/mixins'
import images from 'src/constant/images'

const ProfilePicture = ({ image_url }) => (
    <View style={styles.profileImage}>
      <CoverImage size={70} url={image_url}/>
    </View>
)

const Content = ({ username, rating, message }) => (
    <View style={styles.content}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.starBar}>
            <StarBar rating={rating} size={15}/>
        </View>
        <Text>{message}</Text>
    </View>
)

export default class Comment extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { user, description, rating } = this.props.comment
    return(
        <View style={styles.container}>
            <ProfilePicture image_url={user.profile_url}/>
            <Content username={user.name} rating={rating} message={description}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    content: {
        flexDirection: 'column',
        marginLeft: 5
    },
    username: {
        fontWeight: 'bold'
    },
    starBar: {
        marginTop: 2,
        marginBottom: 2
    }
})