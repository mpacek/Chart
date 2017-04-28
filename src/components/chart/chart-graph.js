import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import * as d3 from "d3";

import ChartGraphDots from './chart-graph-dots';
import ChartGraphGrid from './chart-graph-grid';
import ChartGraphAxis from './chart-graph-axis';

export default class ChartGraph extends React.Component {

    constructor() {
        super();

        this.state = {
            width: 1000,
            height: 250,
            chartId: 'graph-1'
        };
    }

    componentWillMount() {
        var _self = this;

        jQuery(window).on('resize', function() {
            _self._updateSize();
        });

        this.setState({
            width: this.state.width
        });
    }

    componentDidMount() {
        this._updateSize();
    }

    componentWillUnmount() {
        jQuery(window).off('resize');
    }

    render() {
        let data = this.props.weatherData;

        const margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.state.height - (margin.top + margin.bottom);

        const parseDate = d3.timeParse("%Y-%m-%d");

        data.forEach((d) => {
            d.date = parseDate(d.day);
        });

        let x = d3.scaleTime()
            .domain(d3.extent(data, (d) => {
                return d.date;
            }))
            .rangeRound([0, w]);

        let y = d3.scaleLinear()
            .domain([0,d3.max(data, (d) => {
                return d.count+10;
            })])
            .range([h, 0]);

        const line = d3.line()
            .x((d) => {
                return x(d.date);
            })
            .y((d) => {
                return y(d.count);
            });

        let transform='translate(' + margin.left + ',' + margin.top + ')';

        let yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5);

        let xAxis = d3.axisBottom()
           .scale(x)
           .tickValues(data.map((d) => {
               return d.date;
            }))
           .tickFormat(d3.timeFormat("%Y-%m-%d"))
           .ticks(1);

        let yGrid = d3.axisLeft()
           .scale(y)
           .ticks(5)
           .tickSize(-w, 0, 0)
           .tickFormat("");

        return (
            <div className="m-chart-graph__wrapper">
                <svg className="m-chart-graph" id={this.state.chartId} width={this.state.width} height={this.state.height}>
                    <g transform={transform}>
                        <ChartGraphGrid h={h} grid={yGrid} gridType="y"/>
                        <ChartGraphAxis h={h} axis={yAxis} axisType="y"/>
                        <ChartGraphAxis h={h} axis={xAxis} axisType="x"/>
                        <path className="line" d={line(data)} strokeLinecap="round"/>
                        <ChartGraphDots data={data} x={x} y={y}/>
                    </g>
                </svg>
            </div>
        );
    }

    _updateSize() {
        var node = ReactDOM.findDOMNode(this);
        var parentWidth = jQuery(node).width();

        if (this.state.width < parentWidth < this.state.width) {
            this.setState({
                width: parentWidth - 20
            });
        } else {
            this.setState({
                width: this.state.width
            });
        }
    }
}

ChartGraph.propTypes = {
    weatherData: React.PropTypes.array.isRequired
}
