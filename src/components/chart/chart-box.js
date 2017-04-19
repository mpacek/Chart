import React from 'react';
import ChartForm from './chart-form';

export default class ChartBox extends React.Component {
    constructor() {
        super();
    }

    render() {

        return(
            <div>
                <ChartForm />
                <div className="m-chart"></div>
            </div>
        );
    }
}
