import React from "react";

class TestBallot extends React.Component {
    electionType = "Test Candidates";
    voteType = "test";

    candidate1 = "Candidate 1";
    candidate2 = "Candidate 2";
    candidate3 = "Candidate 3";
    candidate4 = "Candidate 4";
    candidate5 = "Candidate 5";

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            submitted: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = JSON.stringify({
            "voterId": document.getElementById("vid").value,
            "pwHash": document.getElementById("pwh").value,
            "voteType": this.voteType,
            "vote": {
                [this.candidate1]: document.getElementById('c1').value,
                [this.candidate2]: document.getElementById('c2').value,
                [this.candidate3]: document.getElementById('c3').value,
                [this.candidate4]: document.getElementById('c4').value,
                [this.candidate5]: document.getElementById('c5').value,
            }
        });

        let resp = await fetch('https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote', {
            method: 'POST',
            body: data,
            headers: {
                'x-api-key': 'CB1pjRpF7S9xAL2Xuchch4LVEGMYDaJo7mMtnNbD',
                'Content-Type': 'application/json'
            }
        });

        if (resp.status !== 200) {
            resp.json().then((respJson) => {
                console.log(respJson.message);
                this.setState({
                    error: respJson.message,
                })
            }).catch(() => {
                this.setState({
                    error: "this isn't supposed to happen LMFAO contact ervin ASAP",
                });
            });
        } else {
            resp.json().then((respJson) => {
                this.setState({
                    submitted: respJson.message,
                    error: null
                });
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <title>{this.electionType} Ballot 2020</title>
                <h1>{this.electionType} Ballot 2020</h1>
                <p>Please select each ranking only ONCE.</p>
                <p>Choices must begin with "First Choice" and continue one at a time.</p>
                <p>Abstain votes mean that you do not like any candidate past any selected choices.</p>
                <li>
                    <label htmlFor="c1">{this.candidate1}: </label>
                    <select id="c1" name="c1">
                        <option value="1">First Choice</option>
                        <option value="2">Second Choice</option>
                        <option value="3">Third Choice</option>
                        <option value="4">Fourth Choice</option>
                        <option value="5">Fifth Choice</option>
                        <option value="A" selected>Abstain</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="c2">{this.candidate2}: </label>
                    <select id="c2" name="c2">
                        <option value="1">First Choice</option>
                        <option value="2">Second Choice</option>
                        <option value="3">Third Choice</option>
                        <option value="4">Fourth Choice</option>
                        <option value="5">Fifth Choice</option>
                        <option value="A" selected>Abstain</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="c3">{this.candidate3}: </label>
                    <select id="c3" name="c3">
                        <option value="1">First Choice</option>
                        <option value="2">Second Choice</option>
                        <option value="3">Third Choice</option>
                        <option value="4">Fourth Choice</option>
                        <option value="5">Fifth Choice</option>
                        <option value="A" selected>Abstain</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="c4">{this.candidate4}: </label>
                    <select id="c4" name="c4">
                        <option value="1">First Choice</option>
                        <option value="2">Second Choice</option>
                        <option value="3">Third Choice</option>
                        <option value="4">Fourth Choice</option>
                        <option value="5">Fifth Choice</option>
                        <option value="A" selected>Abstain</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="c5">{this.candidate1}: </label>
                    <select id="c5" name="c5">
                        <option value="1">First Choice</option>
                        <option value="2">Second Choice</option>
                        <option value="3">Third Choice</option>
                        <option value="4">Fourth Choice</option>
                        <option value="5">Fifth Choice</option>
                        <option value="A" selected>Abstain</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="vid">Enter Voter ID</label>
                    <input id="vid" name="vid" type="email"/>
                </li>
                <li>
                    <label htmlFor="pwh">Enter Password</label>
                    <input id="pwh" name="pwh" type="password"/>
                </li>
                <button>Vote!</button>
                {this.state.error != null && <p>{this.state.error}</p>}
                {this.state.submitted != null && <p>{this.state.submitted}</p>}
            </form>
        );
    }
}

export default TestBallot;
