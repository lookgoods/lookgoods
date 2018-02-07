import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux';
import HomePage from '../modules/home/HomePage'
import GlobalPage from '../modules/global/GlobalPage'

const App = () => {
  return(
    <Router>
      <Scene key="root">
        <Scene key="homePage" component={HomePage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical' initial/>
        <Scene key="globalPage" component={GlobalPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
      </Scene>
    </Router>
  );
}

export default App;