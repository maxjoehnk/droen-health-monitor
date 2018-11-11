import { HealthyState } from '../../../store/reducers/node-status.reducer';

export const mapHealthyStateToString = (status: HealthyState) => {
    switch (status) {
        case HealthyState.Healthy:
            return 'healthy';
        case HealthyState.Unhealthy:
            return 'unhealthy';
        case HealthyState.Offline:
            return 'offline';
    }
};
