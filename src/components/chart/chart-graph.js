import React from 'react';
import * as d3 from "d3";

export default class ChartGraph extends React.Component {

    constructor() {
        super();

        this.state = {
            width: 800,
            height: 300,
            chartId: 'graph-1'
        };
    }

    render() {
        var data=[
            {day:'02-11-2016',count:180},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ];

        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.state.height - (margin.top + margin.bottom);

        var parseDate = d3.timeParse("%m-%d-%Y");

        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });
        var x = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scaleLinear()
            .domain([0,d3.max(data,function(d){
                return d.count+100;
            })])
            .range([h, 0]);

        var line = d3.line()
            .curve(d3.curveCatmullRomOpen)
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            });

        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div className="m-chart-graph__wrapper">
                <svg className="m-chart-graph" id={this.state.chartId} width={this.state.width} height={this.state.height}>
                    <g transform={transform}>
                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                    </g>
                </svg>
            </div>
        );
    }
}
