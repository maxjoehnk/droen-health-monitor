import * as React from 'react';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import DmxStatusCard from './cards/DmxStatusCard';
import GpioStatusCard from './cards/GpioStatusCard';
import { connect } from 'react-redux';
import { NodeCard } from '../store/reducers/node-status.reducer';
import { State } from '../store/reducers';

interface AppProps {
    cards: NodeCard[];
}

export const App = ({ cards }: AppProps) => <div>
    <TopAppBar title='Health Status'/>
    <TopAppBarFixedAdjust>
        <div className='status-card-list'>
            {cards.map((card, index) => {
                switch (card.info.type) {
                    case 'udmx':
                        return (<DmxStatusCard info={card.info} status={card.status} config={card.config} key={index}/>);
                    case 'gpio':
                        return (<GpioStatusCard info={card.info} status={card.status} config={card.config} key={index}/>);
                }
            })}
        </div>
    </TopAppBarFixedAdjust>
</div>;

const mapStateToProps = (state: State): AppProps => ({
    cards: state.status.nodes
});

export default connect(mapStateToProps)(App);
