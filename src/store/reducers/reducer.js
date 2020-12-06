import {IS_AUTH} from '../actions/actionLogin';
const initialState = {
	isAuth: {login: false}
};
const isAuthReducer = (state = initialState, {type, payload}) => {
	switch(type) {
		case IS_AUTH :
			return {login: payload}
		default :
			return state
	};
};
export default isAuthReducer;