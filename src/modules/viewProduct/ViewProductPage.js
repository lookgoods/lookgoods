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
import CoverImage from 'src/modules/shares/CoverImage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import NavBar from 'src/modules/shares/NavBar'
import { colors } from 'src/constant/mixins'
import { connect } from 'react-redux'
import images from 'src/constant/images'

const CoverPhoto = ({ image_url }) => (
  <View>
    { image_url ? 
      <Image
        style={styles.coverImage}
        source={image_url}
        resizeMode='contain' />
  : <View/>}
  </View>
)

const ProfilePicture = ({ image_url }) => (
  <View style={styles.profileImage}>
    <CoverImage size={70} url={image_url}/>
  </View>
)

const FollowButton = () => (
  <Button 
        title="Follow" 
        backgroundColor={colors.blue}
        buttonStyle={styles.followBtn}
        fontSize={13}
      />
)

function ReviewerBar({ reviewer, rating }) {
  return (
    <View style={styles.reviewerBar}>
      <ProfilePicture image_url={reviewer.profile_url}/>
      <View style={styles.reviewTextWrapper}>
        <Text style={styles.reviewerName}>{reviewer.name}</Text>
        <StarBar rating={rating}/>
      </View>
      <FollowButton />
    </View>
  )
}

function checkStar(number, rating) {
  if(number < rating) return 'star'
  return 'star-o'
}

function StarBar({ rating }) {
  return (
    <View style={styles.starBar}>
      { Array.apply(null, Array(5)).map( (item, index) => (
        <IconFontAwesome key={index} style={styles.star} name={checkStar(index, rating)} size={30} color={colors.yellow}/>
      )) }
    </View>
  )
}

function getContent(content) {
  if(content.type === 'picture')
    return (
      <View style={styles.contentImageWrapper}>
        <Image source={content.value} resizeMode='contain' style={styles.contentImage}/>
      </View>)
  else if(content.type === 'text')
    return <Text style={styles.contentText}>{content.value}</Text>
  else return <View/>
}

function Content({ content_list }) {
  return (
    <View style={styles.contentList}>
      { content_list.map( (content, index) => (getContent(content)))}
    </View>
  )
}

const ProductDetail = ({ name, value }) => (
  <View>
   { value && 
    <View style={styles.productDetail}>
    <Text style={styles.productDetailName}>{name}</Text>
    <Text>{value}</Text>
    </View> }
  </View>
)

const TagButton = ({ title }) => (
  <Button 
    title={title} 
    backgroundColor={colors.gray2}
    buttonStyle={styles.tagBtn}
    fontSize={13}
  />
)

const TagList = ({ tags }) => (
  <View>
   { tags && 
    <View style={styles.productDetail}>
      <Text style={styles.productDetailName}>Tags</Text>
      <View>
        { tags.map( (tag, index) => (
          <View style={styles.tagWrapper}>
            <TagButton title={tag} />
          </View>
        ))}
      </View>
    </View> }
  </View>
)

export class ViewProductPage extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    console.log(this.props.review, 'review')
    const { picture_cover_url, product, user, rating, title, content_list, product_price, tag_list } = this.props.review
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName={product.name}/>
          </View>
        </View>
        <ScrollView>
          <CoverPhoto image_url={picture_cover_url}/>
          <ReviewerBar reviewer={user} rating={rating}/>
          <Text style={styles.titleText}>{title}</Text>
          <Content content_list={content_list}/>
          <View style={ { flexDirection: 'row' } }>
            <ProductDetail name="Price" value={product_price}/>
            <ProductDetail name="Brand" value={product.brand}/>
          </View>
          <TagList tags={tag_list}/>
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
  },
  coverImage: {
    width: '100%',
    height: 300
  },
  profileImage: {
    marginLeft: 10
  },
  reviewerBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reviewTextWrapper: {
    flexDirection: 'column',
    marginLeft: 2,
    flex: 1
  },
  reviewerName: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: 'bold',
    marginTop: 5
  },
  followBtn: {
    borderRadius: 5,
    height: 35,
    marginRight: 20
  },
  starBar: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5
  },
  star: {
    marginRight: 5
  },
  titleText: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold'
  },
  contentList: {
    marginTop: 5
  },
  contentImage: {
    width: '80%',
    height: 200,
  },
  contentImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  contentText: {
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 25
  },
  productDetail: {
    flexDirection: 'row',
    marginBottom: 10
  },
  productDetailName: {
    marginRight: 40,
    marginLeft: 30,
    fontWeight: 'bold'
  },
  tagBtn: {
    borderRadius: 5,
    height: 35
  },
  tagWrapper: {
    marginBottom: 5
  }
})

const mapStateToProps = state => ({
  review: state.reviewReducer.currentReview
})

export default connect(mapStateToProps, null)(ViewProductPage)