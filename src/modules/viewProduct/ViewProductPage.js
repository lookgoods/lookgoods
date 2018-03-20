import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import React, { Component } from 'react'

import { Actions } from 'react-native-router-flux'
import { Button } from 'react-native-elements'
import ContentSection from 'src/modules/viewProduct/components/ContentSection'
import CoverImage from 'src/modules/shares/CoverImage'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constant/mixins'
import { connect } from 'react-redux'

export class ViewProductPage extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log(this.props.review, 'review')
    const { product } = this.props.review
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName={product.name}/>
          </View>
        </View>
        <ScrollView>
          <ContentSection review={this.props.review}/>
        </ScrollView>
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
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    zIndex: 1
  }
})

const mapStateToProps = state => ({
  review: state.reviewReducer.currentReview
})

export default connect(mapStateToProps, null)(ViewProductPage)