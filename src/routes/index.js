import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import HomePage from 'src/modules/home/HomePage'
import GlobalPage from 'src/modules/global/GlobalPage'
import TabMenu from 'src/modules/shares/TabMenu'

const App = () => {
  return(
    <Router>
      <Scene key="root">
        <Scene key="homePage" component={HomePage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
        <Scene key="globalPage" component={GlobalPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
        <Scene key="tabMenu" component={TabMenu} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical' initial/>
      </Scene>
    </Router>
  );
}

export default App;