import { load as loadConfig } from './config';
import { init } from './app';

loadConfig('config.yml')
    .then(config => init(config));
