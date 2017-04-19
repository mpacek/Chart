import React from 'react';

export default class ChartForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form className="m-form js-form">
                <label for="f-email" className="m-form__label">Email address:</label><span className="m-form__current-email"></span>
                <div className="m-form__form">
                    <span className="m-form__info"></span>
                    <input id="f-email" className="m-form__email" type="email" placeholder="your email..." novalidate />
                    <button className="m-form__button" type="submit">Submit email</button>
                </div>
            </form>
        );
    }
}
