import { Scene, Actions } from 'react-native-router-flux'

import AddReviewPage from 'src/modules/addReview/AddReviewPage'
import EditReviewPage from 'src/modules/editReview/EditReviewPage'
import ChangeStatusPage from 'src/modules/setting/ChangeStatusPage'
import LoginPage from 'src/modules/login/LoginPage'
import React from 'react'
import SettingPage from 'src/modules/setting/SettingPage'
import TabMenu from 'src/modules/shares/TabMenu'
import ViewReviewPage from 'src/modules/viewReview/ViewReviewPage'
import ViewTagReviewsPage from 'src/modules/viewReview/ViewTagReviewsPage'
import ViewUserPage from 'src/modules/user/ViewUserPage'
import ViewUserListPage from 'src/modules/user/ViewUserListPage'
import SearchPage from 'src/modules/search/SearchPage'
import crossroads from 'crossroads'
import LinkedRouter from 'src/routes/LinkedRouter'

const scenes = Actions.create(
	<Scene key="root">
		<Scene key="addReviewPage" component={AddReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="viewReviewPage" component={ViewReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="tabMenu" component={TabMenu} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical' initial/>
		<Scene key="loginPage" component={LoginPage} hideNavBar={1} type="reset" hideTabBar={1} direction='vertical'/>
		<Scene key="settingPage" component={SettingPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="viewUserPage" component={ViewUserPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="changeStatusPage" component={ChangeStatusPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="viewUserListPage" component={ViewUserListPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
		<Scene key="SearchPage" component={SearchPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction="vertical"/>
		<Scene key="editReviewPage" component={EditReviewPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction="vertical"/>
		<Scene key="viewTagReviewsPage" component={ViewTagReviewsPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
	</Scene>
)

crossroads.addRoute('viewreview/{id}', id => Actions.viewReviewPage({ review_id: id }))

export default <LinkedRouter scenes={scenes} scheme="lookgoods"/>
