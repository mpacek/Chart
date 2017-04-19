import React from 'react';

export default class InfoPage extends React.Component {
    render() {
        return (
            <div className="container">
                <article className="m-article m-article--info">
                    <h1 className="m-article__title">Informations</h1>
                    <div className="m-article__content c-rich-text">
                        <p>On this page you will find all neccessary information about this project</p>
                    </div>
                </article>
            </div>
        )
    }
}
