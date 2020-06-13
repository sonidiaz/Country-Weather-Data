import { createStore, applyMiddleware } from 'redux';
import rootDeducer from '../redux/reducer/';
import thunk from 'redux-thunk';

const store = createStore(
  rootDeducer,
  applyMiddleware(thunk)
);

export default store;