import React from 'react';
import jQuery from 'jquery';

import ChartForm from './chart-form';
import Chart from './chart';

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
                <div className="m-chart"></div>

                <div className="m-chart-list">
                    <h2 className="m-chart-list__title">History:</h2>
                    <ul>
                        {charts}
                    </ul>
                </div>
            </div>
        );
    }

    _getCharts() {
        return this.state.charts.reverse().map((chart) => {
            return <Chart
                { ...chart }
                key = { chart.id } />
        });
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
