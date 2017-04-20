import React from 'react';

export default class Chart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <li className="m-chart-list__item">
                <span className="m-chart-list__date">{this.props.startDate}</span>
                <span className="m-chart-list__city">{this.props.city}</span>
            </li>
        );
    }
}
