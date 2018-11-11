import { NodeStatusActions } from '../actions/node-status.actions';
import { DmxNodeConfiguration, GpioNodeConfiguration } from '../../server/config';

export enum HealthyState {
    Healthy, Unhealthy, Offline
}

export interface DmxNodeStatus {
    status: HealthyState;
    connection: boolean;
}

export interface GpioNodeStatus {
    status: HealthyState;
}

export interface DmxNodeCard {
    info: DmxNodeConfiguration;
    config?: any;
    status: DmxNodeStatus;
}

export interface GpioNodeCard {
    info: GpioNodeConfiguration;
    status: GpioNodeStatus;
    config?: any;
}

export type NodeStatus = DmxNodeStatus | GpioNodeStatus;

export type NodeCard = DmxNodeCard | GpioNodeCard;

export interface NodeStatusState {
    nodes: NodeCard[];
}

const initialState: NodeStatusState = {
    nodes: []
};

export default function nodeStatusReducer(state: NodeStatusState = initialState, action) {
    switch (action.type) {
        case NodeStatusActions.Update:
            return {
                ...state,
                nodes: action.payload.nodes
            };
        case NodeStatusActions.UpdateNode:
            return {
                ...state,
                nodes: [...state.nodes.slice(0, action.payload.index), {
                    info: action.payload.node,
                    status: action.payload.status,
                    config: action.payload.config
                }, ...state.nodes.slice(action.payload.index + 1)]
            };
        default:
            return state;
    }
}
