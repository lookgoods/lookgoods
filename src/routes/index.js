import { Router, Scene, ActionConst } from 'react-native-router-flux'

import AddProductPage from 'src/modules/addProduct/AddProductPage'
import ChangeStatusPage from 'src/modules/setting/ChangeStatusPage'
import GlobalPage from 'src/modules/global/GlobalPage'
import HomePage from 'src/modules/home/HomePage'
import LoginPage from 'src/modules/login/LoginPage'
import { Provider } from 'react-redux'
import React from 'react'
import SettingPage from 'src/modules/setting/SettingPage'
import TabMenu from 'src/modules/shares/TabMenu'
import ViewProductPage from 'src/modules/viewProduct/ViewProductPage'
import ViewUserPage from 'src/modules/user/ViewUserPage'
import SearchPage from 'src/modules/search/SearchPage'
import store from 'src/redux/store'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Scene key="root">
					<Scene key="homePage" component={HomePage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="globalPage" component={GlobalPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="addProductPage" component={AddProductPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="viewProductPage" component={ViewProductPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="tabMenu" component={TabMenu} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical' initial/>
					<Scene key="loginPage" component={LoginPage} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
					<Scene key="settingPage" component={SettingPage} title='Settings' panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="viewUserPage" component={ViewUserPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene key="changeStatusPage" component={ChangeStatusPage} title='Change Status' panHandlers={null} hideTabBar={1} direction='vertical'/>
					<Scene
						key="SearchPage"
						// type={ActionConst.REPLACE}
						component={SearchPage}
						hideNavBar={1}
						panHandlers={null}
						hideTabBar={1}
						direction="vertical"
					/>
				</Scene>
			</Router>
		</Provider>
	)
}

export default App
