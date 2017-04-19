import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <nav className="top-menu" role="navigation" aria-label="Main navigation">
            <ul>
                <li>
                    <Link to="/info" activeClassName="active">Informations</Link>
                </li>
                <li>
                    <Link to="/chart" activeClassName="active">Chart</Link>
                </li>
            </ul>
            {this.props.children}
      </nav>
    )
  }
}
