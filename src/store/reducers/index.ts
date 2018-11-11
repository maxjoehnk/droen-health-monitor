import { combineReducers } from 'redux';
import nodeStatusReducer, { NodeStatusState } from './node-status.reducer';

export interface State {
    status: NodeStatusState;
}

const reducers = combineReducers({
    status: nodeStatusReducer
});

export default reducers;
