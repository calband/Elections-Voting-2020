import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {Success, Failure} from "./alerts";

class ChangePw extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			submitted: null,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const data = JSON.stringify({
			voterId: document.getElementById('vid').value,
			oldPwHash: document.getElementById('pwo').value,
			newPwHash: document.getElementById('pwn').value,
		});

		let resp = await fetch(
			'https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/register',
			{
				method: 'PUT',
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
			<Form onSubmit={this.handleSubmit}>
				<title>Change Password</title>
				<h1>Change Password</h1>
				<h2>Executive Committee Elections 2020</h2>
				<p>Hello! Thank you for making democracy a success!</p>
				<p>
					You are required to change your password to something new before you
					vote.
				</p>
				<p>
					Enter your old and new passwords below in order to facilitate this
					change.
				</p>
				<hr />
				<Form.Group controlId="vid" className="voter-info">
					<Form.Label htmlFor="vid">Enter Voter ID</Form.Label>
					<Form.Control id="vid" name="vid" type="email" />
				</Form.Group>

				<Form.Group controlId="pwo" className="voter-info">
					<Form.Label htmlFor="pwo">Enter Old Password</Form.Label>
					<Form.Control id="pwo" name="pwo" type="password" />
				</Form.Group>

				<Form.Group controlId="pwn" className="voter-info">
					<Form.Label htmlFor="pwn">Enter New Password</Form.Label>
					<Form.Control id="pwn" name="pwn" type="password" />
				</Form.Group>

				<Button className="vote-btn" type="submit">
					Change Password
				</Button>
				{this.state.error != null && <Failure title = "Oh no!" message = {this.state.error} />}
				{this.state.submitted != null && <Success title = "Yay!" message = {this.state.submitted}/>}
			</Form>
		);
	}
}

export default ChangePw;
