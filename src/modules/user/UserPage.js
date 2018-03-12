import { Platform, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { Divider } from 'react-native-elements'

import UserPhoto from 'src/modules/user/components/UserPhoto'
import InfoBar from 'src/modules/user/components/InfoBar'
import { colors } from 'src/constant/mixins'
import Tabs from 'src/modules/shares/Tabs'
import ProductsGrid from 'src/modules/user/components/ProductsGrid'
import images from 'src/constant/images'

const products = [
  { name: 'product1', image_url: images.product4 },
  { name: 'product2', image_url: images.product4 },
  { name: 'product3', image_url: images.product4 },
  { name: 'product4', image_url: images.product4 },
  { name: 'product4', image_url: images.product4 },
  { name: 'product2', image_url: images.product4 },
  { name: 'product3', image_url: images.product3 },
  { name: 'product4', image_url: images.product4 },
  { name: 'product4', image_url: images.product1 },
  { name: 'product4', image_url: images.product2 }
]

const products_save = [
  { name: 'product3', image_url: images.product1 },
  { name: 'product2', image_url: images.product2 },
  { name: 'product4', image_url: images.product3 },
  { name: 'product1', image_url: images.product4 }
]

export default class UserPage extends Component {
    constructor (props) {
      super(props)
    }

    render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.body}>
            <UserPhoto username="Phasin Sarunpornkul" size={120} image_url={images.profile}/>
            <View style={styles.infoBar}>
              <InfoBar review_num={4} comment_num={22} follower_num={30} following_num={12}/>
            </View>
            <View style={{alignItems: 'center'}}>
              <Divider style={styles.divider}/>
            </View>
            <View style={styles.tabsContainer}>
              <Tabs>
                <View title="Reviews">
                  <ProductsGrid product_list={products} />
                </View>
                <View title="Saved">
                  <ProductsGrid product_list={products_save} />
                </View>
              </Tabs>
            </View >
          </View>
        </ScrollView>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white
    },
    body: {
      marginTop: Platform.OS === 'ios' ? 30 : 25
    },
    infoBar: {
      marginTop: 30
    },
    divider: {
      backgroundColor: colors.gray2,
      marginTop: 15,
      height: 1.2,
      width: '100%'
    },
    tabsContainer: {
      marginTop: 20,
      paddingLeft: 12,
      paddingRight: 12
    }
  })