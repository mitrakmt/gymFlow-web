import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// Reducers

const logger = createLogger();
/**
 * @var {function} rootReducer - The result of the combineReducers helper function,
 * which turns an object whose values are different reducing functions into a single reducing
 * function you can pass to createStore.
 */
const rootReducer = combineReducers({});
const initialState = {};

/**
 * Takes the root reducer and initial state, and works
 * with thunk to compose the store.
 */
export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  return store;
}
