import store from './store';
import ReconnectingWebSocket from 'reconnecting-websocket';

const ws = new ReconnectingWebSocket(`ws://${window.location.host}`);

ws.addEventListener('message', msg => {
    store.dispatch(JSON.parse(msg.data));
});
