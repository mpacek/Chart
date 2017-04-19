import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-inverse navbar-static-top" role="navigation" aria-label="Main navigation">
                    <div className="container">
                        <h1 className="navbar-header">
                            <a className="navbar-brand" href="/">Chart Testing Project</a>
                        </h1>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/chart" activeClassName="active">Chart</Link>
                                </li>
                                <li>
                                    <Link to="/info" activeClassName="active">Informations</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                {this.props.children}
            </main>
        </div>
    )
  }
}
