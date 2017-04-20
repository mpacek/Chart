import React from 'react';
import ChartBox from '../components/chart/chart-box';

export default class ChartPage extends React.Component {
  render() {
    return (
        <div className="container">
            <article className="m-article m-article--chart">
                <h1 className="m-article__title">Weather chart</h1>
            </article>
            <div className="m-article__content">
                <ChartBox apiUrl="api/chart/charts.json" />
            </div>
        </div>
    )
  }
}
