import React from 'react';

export default class ChartGraphDots extends React.Component {

    constructor() {
        super();
    }

    render() {
        const _self = this;

        //remove last & first point
        const data = this.props.data.splice(1);
        data.pop();

        let circles = data.map((d, i) => {
            return (<circle className="dot" r="7"
                            cx={_self.props.x(d.date)} cy={_self.props.y(d.count)}
                            fill="#ec24d2" stroke="#fff" strokeWidth="5px" key={i} />);
        });

        return (
            <g>
                {circles}
            </g>
        );
    }
}

ChartGraphDots.propTypes = {
    data: React.PropTypes.array,
    x: React.PropTypes.func,
    y: React.PropTypes.func
}
