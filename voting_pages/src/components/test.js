import React from 'react';

import Disclaimer from './disclaimer';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {Failure, Success} from "./alerts";
import Confirm from './confirm'

import CandidatePhoto1 from '../img/vocaloid_calanfurd.png';
import CandidatePhoto2 from '../img/cute_calanfurd.png';
import CandidatePhoto3 from '../img/ponyo_calanfurd.png';
import CandidatePhoto4 from '../img/haikyuu_calanfurd.png';
import CandidatePhoto5 from '../img/simple_calanfurd.png';

class TestBallot extends React.Component {
    electionType = 'Cutest Couple';
    voteType = 'test';

    candidate1 = 'Vocaloid uwu';
    candidate2 = 'Cute and Simple 🥺';
    candidate3 = 'PONYO';
    candidate4 = 'Haikyuu!! (hq comm represent btw)';
    candidate5 = 'An Artist\'s Masterpiece';

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            submitted: null,
            select: "open"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
        const data = JSON.stringify({
            voterId: document.getElementById('vid').value,
            pwHash: document.getElementById('pwh').value,
            voteType: this.voteType,
            vote: {
                [this.candidate1]: document.getElementById('c1').value,
                [this.candidate2]: document.getElementById('c2').value,
                [this.candidate3]: document.getElementById('c3').value,
                [this.candidate4]: document.getElementById('c4').value,
                [this.candidate5]: document.getElementById('c5').value,
            },
        });

        let resp = await fetch(
            'https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote',
            {
                method: 'POST',
                body: data,
                headers: {
                    'x-api-key': 'CB1pjRpF7S9xAL2Xuchch4LVEGMYDaJo7mMtnNbD',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (resp.status !== 200) {
            resp
                .json()
                .then((respJson) => {
                    console.log(respJson.message);
                    this.setState({
                        error: respJson.message,
                        submitted: null,
                    });
                })
                .catch(() => {
                    this.setState({
                        error: "this isn't supposed to happen LMFAO contact ervin asap",
                        submitted: null,
                    });
                });
        } else {
            resp.json().then((respJson) => {
                this.setState({
                    submitted: respJson.message,
                    error: null,
                });
            });
        }
    };

    render() {
        return (
        	<div>
				<Confirm title="Are You Sure?" description="After you cast your ballot
				you will not be able to change your vote! Please make sure
				that you vote is correct before you submit!">
					{confirm => (
						<Form onSubmit={confirm(this.handleSubmit)}>
							<Disclaimer electionType={this.electionType}/>

							<Form.Group controlId="c1">
								<Form.Label htmlFor="c1">{this.candidate1}</Form.Label>
								<img
									src={CandidatePhoto1}
									alt={this.candidate1}
									className="candidate-img"
								/>
								<Form.Control as="select" id="c1" name="c1">
									<option value="1">First Choice</option>
									<option value="2">Second Choice</option>
									<option value="3">Third Choice</option>
									<option value="4">Fourth Choice</option>
									<option value="5">Fifth Choice</option>
									<option value="A" selected>
										Abstain
									</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="c2">
								<Form.Label htmlFor="c2">{this.candidate2}</Form.Label>
								<img
									src={CandidatePhoto2}
									alt={this.candidate2}
									className="candidate-img"
								/>
								<Form.Control as="select" id="c2" name="c2">
									<option value="1">First Choice</option>
									<option value="2">Second Choice</option>
									<option value="3">Third Choice</option>
									<option value="4">Fourth Choice</option>
									<option value="5">Fifth Choice</option>
									<option value="A" selected>
										Abstain
									</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="c3">
								<Form.Label htmlFor="c3">{this.candidate3}</Form.Label>
								<img
									src={CandidatePhoto3}
									alt={this.candidate3}
									className="candidate-img"
								/>
								<Form.Control as="select" id="c3" name="c3">
									<option value="1">First Choice</option>
									<option value="2">Second Choice</option>
									<option value="3">Third Choice</option>
									<option value="4">Fourth Choice</option>
									<option value="5">Fifth Choice</option>
									<option value="A" selected>
										Abstain
									</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="c4">
								<Form.Label htmlFor="c4">{this.candidate4}</Form.Label>
								<img
									src={CandidatePhoto4}
									alt={this.candidate4}
									className="candidate-img"
								/>
								<Form.Control as="select" id="c4" name="c4">
									<option value="1">First Choice</option>
									<option value="2">Second Choice</option>
									<option value="3">Third Choice</option>
									<option value="4">Fourth Choice</option>
									<option value="5">Fifth Choice</option>
									<option value="A" selected>
										Abstain
									</option>
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="c5">
								<Form.Label htmlFor="c5">{this.candidate5}</Form.Label>
								<img
									src={CandidatePhoto5}
									alt={this.candidate5}
									className="candidate-img"
								/>
								<Form.Control as="select" id="c5" name="c5">
									<option value="1">First Choice</option>
									<option value="2">Second Choice</option>
									<option value="3">Third Choice</option>
									<option value="4">Fourth Choice</option>
									<option value="5">Fifth Choice</option>
									<option value="A" selected>
										Abstain
									</option>
								</Form.Control>
							</Form.Group>
							<hr/>
							<Form.Group controlId="vid" className="voter-info">
								<Form.Label htmlFor="vid">Enter Voter ID</Form.Label>
								<Form.Control id="vid" name="vid" type="email"/>
							</Form.Group>

							<Form.Group controlId="pwh" className="voter-info">
								<Form.Label htmlFor="pwh">Enter Password</Form.Label>
								<Form.Control id="pwh" name="pwh" type="password"/>
							</Form.Group>

							<Button className="vote-btn" type="submit">
								Vote!
							</Button>
							{this.state.error != null && <Failure title="Oh no!" message={this.state.error}/>}
							{this.state.submitted != null && <Success title="Yay!" message={this.state.submitted}/>}
						</Form>
						)
					}
				</Confirm>
			</div>
        );
    }
}

export default TestBallot;
