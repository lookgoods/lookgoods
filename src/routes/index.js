import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux';
import HomePage from '../modules/home/HomePage'

const App = () => {
  return(
    <Router>
      <Scene key="root">
        <Scene key="home" component={HomePage} initial hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
      </Scene>
    </Router>
  );
}

export default App;