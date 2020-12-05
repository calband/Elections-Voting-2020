import React from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

import TestBallot from "./components/test";
import PrdBallot from "./components/prd";
import StudBallot from "./components/stud";
import ExecSecBallot from "./components/execSec";
import DmBallot from "./components/dm";
import ChangePw from "./components/changePw";

// import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                exact to="/change_password"
                                activeClassName="selected">
                                Change Password
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact to="/prd"
                                activeClassName="selected">
                                Public Relations Director Ballot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dm"
                                activeClassName="selected">
                                Drum Major Ballot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/stud"
                                activeClassName="selected">
                                Student Director Ballot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/execSec"
                                activeClassName="selected">
                                Executive Secretary Ballot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/test"
                                activeClassName="selected">
                                Test Ballot
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/change_password" component={ChangePw}/>
                    <Route path="/prd" component={PrdBallot}/>
                    <Route path="/dm" component={DmBallot}/>
                    <Route path="/stud" component={StudBallot}/>
                    <Route path="/execSec" component={ExecSecBallot}/>
                    <Route path="/test" component={TestBallot}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
