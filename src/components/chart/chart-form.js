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
                    <fieldset className="m-form__group">
                        <label for="f-days" className="m-form__label">Days (min 2 - max 10):</label>
                        <input ref={c => this._days = c} id="f-days" className="m-form__input m-form__input--days" type="number" min="2" max="10" placeholder={this.props.days} />
                    </fieldset>
                    <fieldset className="m-form__group">
                        <label for="f-city" className="m-form__label">City:</label>
                        <input ref={c => this._city = c} id="f-city" className="m-form__input" type="text" placeholder={this.props.city} />
                    </fieldset>
                    <button className="m-form__button" type="submit">Show</button>
                </div>
            </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();

        if (this._days.value && this._city.value) {

            this.props.addChart(this._days.value, this._city.value);

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
