import * as React from 'react';
import Card, { CardPrimaryContent } from '@material/react-card';
import TabBar from '@material/react-tab-bar';
import Tab from '@material/react-tab';
import StatusBadge from './StatusBadge';
import { mapHealthyStateToString } from '../store/selectors';
import { GpioNodeConfiguration } from '../../server/config';
import { GpioNodeStatus, HealthyState } from '../../store/reducers/node-status.reducer';
import ArtnetConfiguration from './ArtnetConfiguration';

export interface GpioStatusCardProps {
    status: GpioNodeStatus;
    info: GpioNodeConfiguration;
    config: any;
}

const GpioStatusCardStatusTab = () => <div className='status-card-body'>
</div>;

const GpioStatusCardConfigurationTab = ({ configuration }) => <div className='status-card-body node-configuration'>
    <ArtnetConfiguration config={configuration.artnet}/>
</div>;

export class GpioStatusCard extends React.PureComponent<GpioStatusCardProps> {
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
            {status.status !== HealthyState.Offline &&
            <TabBar activeIndex={activeIndex}
                    handleActiveIndexUpdate={(index) => this.setState({activeIndex: index})}>
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
                return <GpioStatusCardStatusTab/>;
            case 1:
                return <GpioStatusCardConfigurationTab configuration={this.props.config}/>;
        }
    }
}

export default GpioStatusCard;
