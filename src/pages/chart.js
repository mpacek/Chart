import React from 'react';
import Chart from '../components/chart/chart';

export default class ChartPage extends React.Component {
    render() {
        return (
            <div className="container">
                <article className="m-article m-article--chart">
                    <h1 className="m-article__title">Weather forecast</h1>
                </article>
                <div className="m-article__content">
                    <Chart apiUrl="api/chart/charts.json" />
                </div>
            </div>
        )
    }
}
