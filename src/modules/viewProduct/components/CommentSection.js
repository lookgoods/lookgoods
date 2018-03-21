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

function countRatingFrequency(comment_list) {
    let rating_frequency_list = [0,0,0,0,0]
    for( const comment of comment_list){
        rating_frequency_list[5-comment.rating]++ 
    }
    return rating_frequency_list
}

function RatingFrequency ({ comment_list }) {
    const rating_frequency_list = countRatingFrequency(comment_list)
    return (
        <View style={styles.ratingFrequencyPanel}>
         { rating_frequency_list.map( (rating_count, index) => (
             <View style={styles.ratingRow}>
                <StarBar rating={5-index} size={20}/>
                <View style={styles.progressBar}>
                    <View style={{ height: 15, width: `${rating_count/(comment_list.length)*100}%`, backgroundColor: colors.darkBlue}}/>
                </View>
                <Text>{rating_count}</Text>
             </View>
         ))}
        </View>
    )
}
    

export default class CommentSection extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { comment_list } = this.props.review
    if(comment_list.length === 0)return <View/>
    return (
        <View>
            <Text style={styles.totalText}>{comment_list.length} Reviews</Text>
            <RatingFrequency comment_list={comment_list}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    totalText: {
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 30
    },
    ratingRow: {
        flexDirection: 'row'
    },
    ratingFrequencyPanel: {
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 20
    },
    progressBar: {
        backgroundColor: colors.lightGray,
        height: 15,
        width: 200,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    }
})