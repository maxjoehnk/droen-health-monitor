import * as React from 'react';

export interface ArtnetConfigurationProps {
    config: {
        port: number;
        universe: number;
    }
}

export const ArtnetConfiguration = ({ config }: ArtnetConfigurationProps) => <>
    <h3>Artnet</h3>
    <p><label>Port</label><span>{config.port}</span></p>
    <p><label>Universe</label><span>{config.universe}</span></p>
</>;

export default ArtnetConfiguration;
