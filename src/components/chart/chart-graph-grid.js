import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

export default class ChartGraphGrid extends React.Component {

    constructor() {
        super();
    }

    componentDidUpdate() {
        this._renderGrid();
    }

    componentDidMount() {
        this._renderGrid();
    }

    _renderGrid() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.grid);
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="y-grid" transform={this.props.gridType=='x'?translate:""}>
            </g>
        );
    }
}

ChartGraphGrid.propTypes = {
    h: React.PropTypes.number,
    grid: React.PropTypes.func,
    gridType: React.PropTypes.oneOf(['x','y'])
}
