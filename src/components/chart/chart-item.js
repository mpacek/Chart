import React from 'react';

export default function ChartItem(props) {
    return (
        <li className="m-chart-list__item">
            <span className="m-chart-list__date">{props.startDate}</span>
            <span className="m-chart-list__city">{props.city}</span>
        </li>
    );
}
