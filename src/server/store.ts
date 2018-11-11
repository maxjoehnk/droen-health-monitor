import reducers from '../store/reducers';
import { createStore } from 'redux';

const store = createStore(reducers);

export default store;
