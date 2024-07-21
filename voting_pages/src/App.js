// https://tinyurl.com/ExCommElections2020/
// http://democracy.calband.org/

import React from 'react';
import {BrowserRouter as Router, NavLink, Route, Routes,} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import CalBandLogo from "./img/calband.png";

import Main from './components/main';
import ChangePw from './components/changePw';
import PrdBallot from './components/prd';
import StudBallot from './components/stud';
import DmBallot from './components/dm';
import ExecSecBallot from './components/execSec';
import TestBallot from './components/test';
import NotFound from './components/notFound';
import Footer from './components/footer';

import './App.scss';

function App() {
    return (
        <Container fluid className="App">
            <Router>
                <Row>
                    <Col xs={4} className="left-col">
                        <nav>
                            <ul className="nav">
                                <li>
                                    <NavLink exact to="/">
                                        <img
                                            src={CalBandLogo}
                                            alt="CAL BAND GR8"
                                            height="auto"
                                            width="30%"
                                        />
                                    </NavLink>
                                    <br/>
                                </li>
                                <li>
                                    <NavLink exact to="/test" activeClassName="selected">
                                        Test Ballot
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/prd" activeClassName="selected">
                                        Public Relations Director Ballot
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/dm" activeClassName="selected">
                                        Drum Major Ballot
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/stud" activeClassName="selected">
                                        Student Director Ballot
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/execSec" activeClassName="selected">
                                        Executive Secretary Ballot
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/change_password" activeClassName="selected">
                                        Change Password
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                    <Col xs={8} className="right-col">
                        <Routes>
                            <Route exact path="/" element={<Main />}/>
                            <Route exact path="/change_password" element={<ChangePw />}/>
                            <Route exact path="/prd" element={<PrdBallot />}/>
                            <Route exact path="/dm" element={<DmBallot />}/>
                            <Route exact path="/stud" element={<StudBallot />}/>
                            <Route exact path="/execSec" element={<ExecSecBallot />}/>
                            <Route exact path="/test" element={<TestBallot />}/>
                            <Route exact path="*" element={<NotFound />}/>
                        </Routes>
                    </Col>
                </Row>
            </Router>
            <Footer/>
        </Container>
    );
}

export default App;
