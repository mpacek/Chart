import React from 'react';

export default class VideoPage extends React.Component {
  render() {
    return (
        <div className="container">
            <article className="m-article m-article--chart">
                <h1 className="m-article__title">Chart</h1>
            </article>
            <div className="m-article__content">
                <form className="m-form js-form">
                    <label for="f-email" className="m-form__label">Email address:</label><span className="m-form__current-email"></span>
                    <div className="m-form__form">
                        <span className="m-form__info"></span>
                        <input id="f-email" className="m-form__email" type="email" placeholder="your email..." novalidate />
                        <button className="m-form__button" type="submit">Submit email</button>
                    </div>
                </form>
                <div className="m-chart"></div>
            </div>
        </div>
    )
  }
}
