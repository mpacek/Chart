import React from 'react';
import jQuery from 'jquery';

import ChartForm from './chart-form';
import ChartItem from './chart-item';
import ChartGraph from './chart-graph';

export default class ChartBox extends React.Component {
    constructor() {
        super();

        this.state = {
            showCharts: false,
            charts: []
        };

        this._addChart = this._addChart.bind(this);
    }

    componentWillMount() {
        this._fetchCharts();
    }

    render() {
        const charts = this._getCharts();
        return(
            <div>
                <ChartForm addChart={this._addChart}/>
                <div className="u-spacing-top">
                    <h2 className="m-chart__title">Graph:</h2>
                    <ChartGraph/>
                </div>
                <div className="m-chart-list u-spacing-top">
                    <h2 className="m-chart__title">History:</h2>
                    <ul>
                        {charts}
                    </ul>
                </div>
            </div>
        );
    }

    _getCharts() {
        return this.state.charts.map((chart) => {
            return <ChartItem
                { ...chart }
                key = { chart.id } />
        }).reverse();
    }

    _fetchCharts() {
        jQuery.ajax({
            method: 'GET',
            url: this.props.apiUrl,
            success: (charts) => {
                this.setState({
                    charts
                })
            }
        });
    }

    _addChart(chartDate, chartCity) {

        const chart = {
            id: this.state.charts.length + 1,
            startDate: chartDate,
            city: chartCity
        };

        this.setState({
            charts: this.state.charts.concat([chart])
        });
    }
}

ChartBox.propTypes = {
    apiUrl: React.PropTypes.string.isRequired
}
