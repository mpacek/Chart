import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

export default class ChartGraphAxis extends React.Component {

    constructor() {
        super();
    }

    componentDidUpdate() {
        this._renderAxis();
    }

    componentDidMount() {
        this._renderAxis();
    }

    _renderAxis() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis); 
    }

    render() {
        const translate = "translate(0,"+(this.props.h)+")";

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }
}

ChartGraphAxis.propTypes = {
    h: React.PropTypes.number,
    axis: React.PropTypes.func,
    axisType: React.PropTypes.oneOf(['x','y'])
}
