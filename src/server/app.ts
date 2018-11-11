import { Config } from './config';
import * as express from 'express';
import { createServer } from 'http';
import * as WebSocket from 'ws';
import * as Parcel from 'parcel';
import { NodeStatusActions } from '../store/actions/node-status.actions';
import store from './store';
import { scrape } from './services/scraper';

export function init(config: Config) {
    const bundler = new Parcel('./src/frontend/index.html', {
        hmr: true
    });

    const port = parseInt(process.env.PORT, 10) || 8080;

    const app = express();

    app.use(bundler.middleware());

    const server = createServer(app);

    const wss = new WebSocket.Server({ server });

    function broadcast(data): void {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }

    server.listen(port, () => {
        console.log(`Listening on ${port}`);
    });

    store.subscribe(() => {
        const state = store.getState();

        broadcast(JSON.stringify({
            type: NodeStatusActions.Update,
            payload: {
                nodes: state.status.nodes
            }
        }));
    });

    scrape(config);
}
