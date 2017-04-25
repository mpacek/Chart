import React from 'react';
import * as d3 from "d3";
import ChartGraphDots from './chart-graph-dots';
import ChartGraphGrid from './chart-graph-grid';
import ChartGraphAxis from './chart-graph-axis';

export default class ChartGraph extends React.Component {

    constructor() {
        super();

        this.state = {
            width: 1100,
            height: 250,
            chartId: 'graph-1'
        };
    }

    render() {
        let data=[
            {day:'02-11-2016',count:36},
            {day:'02-12-2016',count:25},
            {day:'02-13-2016',count:24},
            {day:'02-14-2016',count:18},
            {day:'02-15-2016',count:30},
            {day:'02-16-2016',count:33},
            {day:'02-17-2016',count:35},
            {day:'02-18-2016',count:36}
        ];

        const margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.state.height - (margin.top + margin.bottom);

        const parseDate = d3.timeParse("%m-%d-%Y");

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
           .tickValues(data.map((d,i) => {
               if(i>0)
                   return d.date;
           }).splice(1))
           .ticks(4);

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
                        <ChartGraphAxis h={h} axis={yAxis} axisType="y" />
                        <ChartGraphAxis h={h} axis={xAxis} axisType="x"/>
                        <path className="line" d={line(data)} strokeLinecap="round"/>
                        <ChartGraphDots data={data} x={x} y={y}/>
                    </g>
                </svg>
            </div>
        );
    }
}
