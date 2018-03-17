import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
  } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBar from 'src/modules/shares/NavBar'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import images from 'src/constant/images'

const CoverPhoto = ({ image_url }) => (
  <View>
    { image_url ? 
      <Image
      style={styles.coverImage}
      source={image_url}
      resizeMode='contain'
    />
  : <View/>}
  </View>
)

export class ViewProductPage extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log(this.props.review, 'review')
    const { picture_cover_url } = this.props.review
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName="ViewProduct"/>
          </View>
        </View>
        <CoverPhoto image_url={picture_cover_url}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  coverImage: {
    width: '100%',
    height: 300
  }
})

const mapStateToProps = state => ({
  review: state.reviewReducer.currentReview
})

export default connect(mapStateToProps, null)(ViewProductPage)