//@flow

import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

import CalcTU from './calc-tu.jsx';

export default class Index extends React.Component<{}> {
    render() {
        return (
            <Router>
                <div className="cmp-index">
                    <div className="nav">
                        <h2>Contents</h2>

                        <ul>
                            <li>
                                <Link to="">Home</Link>
                            </li>
                            <li>
                                <Link to="/calc-tu">Turn Undead Calculator</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="main">
                        <Route exact path="" render={() => <h2>Hello!</h2>} />
                        <Route path="/calc-tu" component={CalcTU} />
                    </div>
                </div>
            </Router>
        );
    }
}
