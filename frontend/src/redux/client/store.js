import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Asegúrate de tener tus reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
