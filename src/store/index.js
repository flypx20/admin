import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';
// import { createLogger } from 'redux-logger';
import logger from 'redux-logger';


// const logger = createLogger({
//   // ...options
// });
const middleware = [thunk];

if (process.env.NODE_ENV != 'production') {
	middleware.push(logger);
}
const store  = createStore(reducer,applyMiddleware(...middleware));

export default store;