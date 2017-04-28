import React from 'react';
import jQuery from 'jquery';

import ChartForm from './chart-form';
import ChartItem from './chart-item';
import ChartGraph from './chart-graph';

export default class Chart extends React.Component {
    constructor() {
        super();

        this.state = {
            showCharts: false,
            charts: [],
            weather: [],
            days: '5',
            city: 'Kraków'
        };

        this._addChart = this._addChart.bind(this);
    }

    componentWillMount() {
        this._fetchCharts();
        this._fetchWeather(this.state.days, this.state.city);
    }

    render() {
        const charts = this._getCharts();

        return(
            <div>
                <ChartForm addChart={this._addChart} days={this.state.days} city={this.state.city}/>
                <div className="u-spacing-top">
                    <h2 className="m-chart__title">Next {this.state.days} days temperature in {this.state.city}:</h2>
                    <ChartGraph weatherData={this.state.weather} />
                </div>
                <div className="m-chart-list u-spacing-top">
                    <h2 className="m-chart__title">Search history:</h2>
                    <ul className="c-rich-text">
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

    _fetchWeather(days, city) {
        jQuery.ajax({
            method: 'GET',
            url:  this.props.weatherApiUrl,
            data: "&q=" + city + "&days=" + days,
            success: (data) => {
                this._buildWeatherModel(data);
            }
        });
    }

    _buildWeatherModel(data) {
        const weatherModel = [];

        data.forecast.forecastday.map((forecastday) => {
            const newDay = {};
            newDay.day = forecastday.date;
            newDay.count = forecastday.day.avgtemp_c;
            weatherModel.push(newDay);
        });

        this.setState({
            weather: weatherModel
        });
    }

    _addChart(chartDays, chartCity) {

        this._fetchWeather(chartDays, chartCity);

        const chart = {
            id: this.state.charts.length + 1,
            days: chartDays,
            city: chartCity
        };

        this.setState({
            charts: this.state.charts.concat([chart]),
            days: chartDays,
            city: chartCity
        });
    }
}

Chart.propTypes = {
    apiUrl: React.PropTypes.string.isRequired,
    weatherApiUrl: React.PropTypes.string.isRequired
}
