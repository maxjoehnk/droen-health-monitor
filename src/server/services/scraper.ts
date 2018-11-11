import { Config, NodeConfiguration } from '../config';
import { NodeStatus } from '../../store/reducers/node-status.reducer';
import * as udmxNodeScraper from '../scraper/udmx-node';
import * as gpioNodeScraper from '../scraper/gpio-node';
import store from '../store';
import { NodeStatusActions } from '../../store/actions/node-status.actions';

export function scrape(config: Config) {
    config.nodes
        .forEach(tryScraping(config));
}

const tryScraping = (config: Config) => {
    return async (node: NodeConfiguration, index: number) => {
        try {
            const { status, config: nodeConfig } = await scrapeNode(node);
            store.dispatch({
                type: NodeStatusActions.UpdateNode,
                payload: {
                    index,
                    status,
                    node,
                    config: nodeConfig
                }
            });
        }catch (err) {
            console.error(err);
        }

        setTimeout(() => tryScraping(config)(node, index), config.interval);
    };
};

async function scrapeNode(node: NodeConfiguration): Promise<{ status: NodeStatus, config?: any }> {
    switch (node.type) {
        case 'udmx':
            return await udmxNodeScraper.scrape(node.host);
        case 'gpio':
            return await gpioNodeScraper.scrape(node.host);
    }
}
