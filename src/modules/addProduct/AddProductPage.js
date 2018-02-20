import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBar from 'src/modules/shares/NavBar'

export default class GlobalPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      categories : ''
    }
  }

  handleChangeName (text) {
    this.setState({ name: text })
  }

  handleChangePrice (text) {
    this.setState({ price: text })
  }

  handleChangeCategories (text) {
    this.setState({ categories: text })
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.body}>
            {/* <Text>AddProduct</Text> */}
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image 
                  style={{
                    width: 360,
                    height: 200,
                    resizeMode: 'cover',
                    borderWidth: 1,
                    borderRadius: 3,
                    borderColor: '#f1f1f1'
                  }}
                  source={{uri: 'https://goo.gl/XCL6pA'}}
                />
              </View>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 75, margin: 10 }}> 
                    <Text>Name</Text>
                  </View>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.name}
                      onChangeText={(text) => this.handleChangeName(text)}
                    />
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 75, margin: 10 }}> 
                    <Text>Price</Text>
                  </View>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.price}
                      onChangeText={(text) => this.handleChangePrice(text)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 75, margin: 10 }}> 
                    <Text>Categories</Text>
                  </View>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.categories}
                      onChangeText={(text) => this.handleChangeCategories(text)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 75, margin: 10 }}> 
                    <Text>Rating</Text>
                  </View>
                  {/* <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.categories}
                      onChangeText={(text) => this.handleChangeCategories(text)}
                    />
                  </View> */}
                </View>


              </View>
            </View>
        </View>
        <View style={styles.header}>
          <View style={styles.platformHeader}>
            <NavBar titleName="AddProduct"/>
          </View>
        </View>
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
  coverHeader: {
    height: Platform.OS === 'ios' ? 75 : 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0
  },
  textBox: {
    flex: 1, 
    borderRadius: 3, 
    justifyContent: 'center', 
    backgroundColor: '#FFF',
    paddingHorizontal: 10, 
    // marginTop: 10, 
    // marginBottom: 10, 
    margin: 10,
    borderColor: '#dfdfdf', 
    borderWidth: 1
  },
  textInput: {
    flex: 1,
    color: '#000',
    fontSize: 15,
    height: 35,
    padding: 0
  },
})