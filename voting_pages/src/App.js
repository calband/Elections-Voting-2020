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

import TestBallot from './components/test';
import PrdBallot from './components/prd';
import StudBallot from './components/stud';
import ExecSecBallot from './components/execSec';
import DmBallot from './components/dm';
import ChangePw from './components/changePw';

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
									<NavLink to="/dm" activeClassName="selected">
										Drum Major Ballot
									</NavLink>
								</li>
								<li>
									<NavLink to="/stud" activeClassName="selected">
										Student Director Ballot
									</NavLink>
								</li>
								<li>
									<NavLink to="/execSec" activeClassName="selected">
										Executive Secretary Ballot
									</NavLink>
								</li>
								<li>
									<NavLink to="/test" activeClassName="selected">
										Test Ballot
									</NavLink>
								</li>
							</ul>
						</nav>
					</Col>
					<Col xs={8} className="right-col">
						<Switch>
							<Route path="/change_password" component={ChangePw} />
							<Route path="/prd" component={PrdBallot} />
							<Route path="/dm" component={DmBallot} />
							<Route path="/stud" component={StudBallot} />
							<Route path="/execSec" component={ExecSecBallot} />
							<Route path="/test" component={TestBallot} />
						</Switch>
					</Col>
				</Row>
			</Router>
		</Container>
	);
}

export default App;
