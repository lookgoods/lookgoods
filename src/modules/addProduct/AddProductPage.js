import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import NavBar from 'src/modules/shares/NavBar'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

export default class GlobalPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      name: '',
      price: '',
      categories : '',
      numStar: ['star-o','star-o','star-o','star-o','star-o']
    }
  }

  handleChangeTitle (text) {
    this.setState({ title: text })
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

  setAmountRating(num){
    this.setState({
      numStar: this.state.numStar.map((_,index)=>{
        if(index < num){
          return 'star'
        }
        else{
          return 'star-o'
        }
      })
    })
  }

  render() {
    return (
        <View style={styles.container}>
         <ScrollView 
          showsVerticalScrollIndicator={false} 
          scrollEventThrottle={16} 
          bounces={false}
          style={styles.body}
        >
          {/* <View style={styles.body}> */}
            {/* <Text>AddProduct</Text> */}
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image 
                  style={{
                    flex: 1,
                    height: 200,
                    resizeMode: 'cover',
                    // borderWidth: 1,
                    // borderRadius: 3,
                    // borderColor: '#f1f1f1'
                  }}
                  source={{uri: 'https://goo.gl/XCL6pA'}}
                />
              </View>
              <View>
                <View style={styles.sectionBody}>
                  <Text style={styles.label}>Title</Text>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.title}
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.handleChangeTitle(text)}
                    />
                  </View>
                
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.textBox}>
                    <TextInput
                      style={styles.textInput}
                      value={this.state.name}
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.handleChangeName(text)}
                    />
                  </View>

                
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex : 1, paddingRight : 10 }}>
                      <Text style={styles.label}>Brand</Text>
                      <View style={styles.textBox}>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.name}
                          underlineColorAndroid='transparent'
                          onChangeText={(text) => this.handleChangeName(text)}
                        />
                      </View>
                    </View>
                    <View style={{ flex : 1, paddingLeft : 10 }}>
                      <Text style={styles.label}>Price</Text>
                      <View style={styles.textBox}>
                        <TextInput
                          style={styles.textInput}
                          value={this.state.name}
                          underlineColorAndroid='transparent'
                          onChangeText={(text) => this.handleChangeName(text)}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.label}> 
                    <Text>Rating</Text>
                  </View>
                  <View style={{
                    flex: 1, 
                    marginTop: 10, 
                    flexDirection: 'row'
                  }}>
                    {this.state.numStar.map((item,key) => (
                      <TouchableOpacity key={key} onPress={() => this.setAmountRating(key+1)}>
                        <IconFontAwesome style={{ marginRight : 8 }} name={item} size={35} color='#F8ED5E' />
                      </TouchableOpacity>
                    ))}
                  </View>


                  {/* <View>
                    <View style={{ width: 75, marginTop: 10, marginLeft: 10, marginRight: 10 }}> 
                      <Text>Review</Text>
                    </View>
                  </View>
                  <View style={styles.bodyTextInput}>
                    <TextInput 
                      style={[styles.font15, styles.fontGray, { minHeight: 180, paddingTop: 0, paddingBottom: 0 }]}
                      multiline
                      maxHeight={300}
                      editable={this.state.switchEditAndSent}
                      underlineColorAndroid='transparent'
                      onChangeText={text => this.handleChangeConclude(text)}
                      value={this.state.staticMessage}
                      keyboardType='default'
                    />
                  </View> */}

                {/* <View style={styles.blockSave}>
                    <TouchableOpacity style={styles.buttonAdd}>
                                    <Text style={{ fontSize: 18, color: '#FFF' }}>เพิ่มสินค้า</Text>
                                </TouchableOpacity>
                </View> */}
                </View>
              </View>
            </View>
        {/* </View> */}
        </ScrollView>
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
  label: {
    color: '#5C5C5C', 
    fontSize: 15
    // fontWeight: 'bold'
  },
  sectionBody: {
    backgroundColor: '#FFF', 
    margin: 5, 
    paddingHorizontal: 5, 
    paddingTop: 10, 
    paddingBottom: 10
  },
  textBox: {
    flex: 1, 
    // height: 42, 
    borderRadius: 3, 
    justifyContent: 'center', 
    backgroundColor: '#FFF',
    paddingHorizontal: 10, 
    marginTop: 10, 
    marginBottom: 10, 
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
  bodyTextInput: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    borderColor: '#dfdfdf',
    borderWidth: 1
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    height: 50,
    borderRadius: 3,
    zIndex: 2
  }
})