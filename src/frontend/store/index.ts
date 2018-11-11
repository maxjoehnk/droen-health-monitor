import { createStore } from 'redux';
import reducers from '../../store/reducers';

const store = createStore(reducers, (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__());

if ((<any>module).hot) {
    // Enable Webpack hot module replacement for reducers
    (<any>module).hot.accept('../../store/reducers', () => {
        const nextRootReducer = require('../../store/reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
