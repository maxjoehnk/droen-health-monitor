import fetch from 'node-fetch';
import { GpioNodeStatus, HealthyState } from '../../store/reducers/node-status.reducer';

export async function scrape(baseUrl: string): Promise<{ status: GpioNodeStatus, config?: any }> {
    const status = await scrapeStatus(baseUrl);
    if (status.status !== HealthyState.Offline) {
        const config = await scrapeConfig(baseUrl);
        return {
            status,
            config
        };
    }
    return {
        status
    };
}

async function scrapeStatus(baseUrl: string): Promise<GpioNodeStatus> {
    try {
        const res = await fetch(`http://${baseUrl}/health`);
        const body = await res.json();
        return {
            status: body.status ? HealthyState.Healthy : HealthyState.Unhealthy
        };
    }catch (err) {
        return {
            status: HealthyState.Offline
        };
    }
}

async function scrapeConfig(baseUrl: string): Promise<any> {
    const res = await fetch(`http://${baseUrl}/health/config`);
    const body = await res.json();
    return body;
}
