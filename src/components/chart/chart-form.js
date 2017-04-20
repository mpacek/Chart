import React from 'react';

export default class ChartForm extends React.Component {
    constructor() {
        super();

        this.state = {
            message: '',
            showMessage: false
        };

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {

        let messageNode;

        if (this.state.showMessage) {
            messageNode = <span className="m-form__info">{this.state.message}</span>;
        }

        return (
            <form onSubmit={this._handleSubmit} className="m-form">
                <div className="m-form__form">
                    {messageNode}
                    <label for="f-date" className="m-form__label">Starting date:</label>
                    <input ref={c => this._date = c} id="f-date" className="m-form__input" type="text" placeholder="yyyy-mm-dd" />
                    <label for="f-city" className="m-form__label">City:</label>
                    <input ref={c => this._city = c} id="f-city" className="m-form__input" type="text" />
                    <button className="m-form__button" type="submit">Show chart</button>
                </div>
            </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();

        if (this._date.value && this._city.value) {

            this.props.addChart(this._date.value, this._city.value);

            this._date.value = '';
            this._city.value = '';

            this.setState({
                message: '',
                showMessage: false
            });

        } else {

            this.setState({
                message: 'All fields are mandatory',
                showMessage: true
            });
        }
    }
}
