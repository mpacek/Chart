import React from 'react';

export default class ChartForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form className="m-form">
                <label for="f-email" className="m-form__label">Email address:</label><span className="m-form__current-email"></span>
                <div className="m-form__form">
                    <span className="m-form__info is-active">Error text</span>
                    <input id="f-email" className="m-form__email" type="email" placeholder="Email..." novalidate />
                    <button className="m-form__button" type="submit">Submit email</button>
                </div>
            </form>
        );
    }
}
