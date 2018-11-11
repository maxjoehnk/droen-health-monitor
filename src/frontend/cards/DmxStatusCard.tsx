import * as React from 'react';
import Card, { CardPrimaryContent } from '@material/react-card';
import StatusBadge from './StatusBadge';
import { mapHealthyStateToString } from '../store/selectors';
import { DmxNodeStatus, HealthyState } from '../../store/reducers/node-status.reducer';
import { DmxNodeConfiguration } from '../../server/config';
import TabBar from '@material/react-tab-bar';
import Tab from '@material/react-tab';
import ArtnetConfiguration from './ArtnetConfiguration';

export interface DmxStatusCardProps {
    status: DmxNodeStatus;
    info: DmxNodeConfiguration;
    config: any;
}

const DmxStatusCardStatusTab = ({ status }) => <div className='status-card-body'>
    <span>DMX Connection: <StatusBadge status={status.connection ? 'online' : 'offline'}/></span>
</div>;

const DmxStatusCardConfigurationTab = ({ configuration }) => <div className='status-card-body node-configuration'>
    <ArtnetConfiguration config={configuration.artnet}/>
</div>;

export class DmxStatusCard extends React.PureComponent<DmxStatusCardProps> {
    state = {
        activeIndex: 0
    };

    render() {
        const { status, info } = this.props;
        const { activeIndex } = this.state;

        return <Card>
            <h2 className='status-header'>
                <span>{info.label}</span>
                <small>
                    Status: <StatusBadge status={mapHealthyStateToString(status.status)}/>
                </small>
            </h2>
            {status.status !== HealthyState.Offline && <TabBar activeIndex={activeIndex}
                                                               handleActiveIndexUpdate={(index) => this.setState({ activeIndex: index })}>
                <Tab>
                    <span className='mdc-tab__text-label'>Status</span>
                </Tab>
                <Tab>
                    <span className='mdc-tab__text-label'>Configuration</span>
                </Tab>
            </TabBar>}

            {status.status !== HealthyState.Offline && this.renderCardBody(activeIndex)}
        </Card>;
    }

    private renderCardBody(activeIndex: number) {
        switch (activeIndex) {
            case 0:
                return <DmxStatusCardStatusTab status={this.props.status}/>;
            case 1:
                return <DmxStatusCardConfigurationTab configuration={this.props.config}/>;
        }
    }
}

export default DmxStatusCard;
