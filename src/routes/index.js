import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'

import AddProductPage from 'src/modules/addProduct/AddProductPage'
import GlobalPage from 'src/modules/global/GlobalPage'
import HomePage from 'src/modules/home/HomePage'
import LoginPage from 'src/modules/login/LoginPage'
import { Provider } from 'react-redux'
import TabMenu from 'src/modules/shares/TabMenu'
import ViewProductPage from 'src/modules/viewProduct/ViewProductPage'
import store from 'src/redux/store'

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="homePage" component={HomePage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
          <Scene key="globalPage" component={GlobalPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
          <Scene key="addProductPage" component={AddProductPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
          <Scene key="viewProductPage" component={ViewProductPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
          <Scene key="tabMenu" component={TabMenu} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical' initial/>
          <Scene key="loginPage" component={LoginPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
        </Scene>
      </Router>
    </Provider>
  )
}

export default App