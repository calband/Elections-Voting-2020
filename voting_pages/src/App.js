// https://tinyurl.com/ExCommElections2020

import React from 'react';
import {
	BrowserRouter as Router,
	NavLink,
	Route,
	Switch,
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Main from './components/main';
import ChangePw from './components/changePw';
import PrdBallot from './components/prd';
import StudBallot from './components/stud';
import DmBallot from './components/dm';
import ExecSecBallot from './components/execSec';
import TestBallot from './components/test';
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
									<NavLink
										exact
										to="/change_password"
										activeClassName="selected"
									>
										Change Password
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
									<NavLink exact to="/test" activeClassName="selected">
										Test Ballot
									</NavLink>
								</li>
							</ul>
						</nav>
					</Col>
					<Col xs={8} className="right-col">
						<Switch>
							<Route exact path="/" component={Main} />
							<Route exact path="/change_password" component={ChangePw} />
							<Route exact path="/prd" component={PrdBallot} />
							<Route exact path="/dm" component={DmBallot} />
							<Route exact path="/stud" component={StudBallot} />
							<Route exact path="/execSec" component={ExecSecBallot} />
							<Route exact path="/test" component={TestBallot} />
						</Switch>
					</Col>
				</Row>
			</Router>
			<Footer/>
		</Container>
	);
}

export default App;
