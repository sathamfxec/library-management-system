import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import isAuthReducer from './reducers/reducer';
import thunk from 'redux-thunk';
// const middleware = [thunk];
const reducer = combineReducers({isAuth: isAuthReducer});
// const initialState = {
// 	isAuth: {login: 'false'}
// };
const store = applyMiddleware(thunk)(createStore)(reducer);
// const store = createStore(reducer, initialState, compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;