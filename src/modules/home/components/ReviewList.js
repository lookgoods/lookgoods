import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import ReviewCard from 'src/modules/home/components/ReviewCard'

export default class ReviewList extends Component {
  constructor (props) {
    super(props)
  }
  
  render() {
    return (
      <View style={styles.container}>
			{ this.props.review_list ? this.props.review_list.map( (review, index) => (
					<View key={index} style={styles.reviewCard}>
						<ReviewCard key={index} review={review}/>
					</View>
				) ) : <View/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  reviewCard: {
      marginBottom: 20
  }
})