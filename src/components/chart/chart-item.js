import React from 'react';

export default function ChartItem(props) {
    return (
        <li className="m-chart-list__item">
            Next <strong>{props.days}</strong> days in <strong>{props.city}</strong>
        </li>
    );
}
