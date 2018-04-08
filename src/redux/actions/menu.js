import constants from 'src/redux/constants'

const MenuActions = {
	setCurrentPage: (page) => dispatch => {
		dispatch(actions.setCurrentPage(page))
	}
}

const actions = {
	setCurrentPage: (page) => ({
		type: constants.SET_CURRENT_PAGE,
		payload: page
	})
}

export default MenuActions