import * as React from 'react';

const StatusBadge = ({ status }) => <b className={`status-badge status-${status}`}>{status}</b>;

export default StatusBadge;
