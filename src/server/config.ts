import * as fs from 'fs';
import { promisify } from 'util';
import { safeLoad } from 'js-yaml';

const defaultConfig: Config = {
    nodes: [],
    interval: 500
};

const readFile = promisify(fs.readFile);

export interface Config {
    nodes: NodeConfiguration[];
    interval: number;
}

export type NodeConfiguration = DmxNodeConfiguration | GpioNodeConfiguration;

export interface DmxNodeConfiguration {
    type: 'udmx';
    label: string;
    host: string;
}

export interface GpioNodeConfiguration {
    type: 'gpio';
    label: string;
    host: string;
}

export async function load(path: string): Promise<Config> {
    const fileContent = await readFile(path, 'utf8');

    return {
        ...defaultConfig,
        ...safeLoad(fileContent)
    };
}
