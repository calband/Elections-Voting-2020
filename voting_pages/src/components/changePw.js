import React from "react";

class ChangePw extends React.Component {
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
            "oldPwHash": document.getElementById("pwo").value,
            "newPwHash": document.getElementById("pwn").value,
        });

        let resp = await fetch('https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/register', {
            method: 'PUT',
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
                    submitted: null
                })
            }).catch(() => {
                this.setState({
                    error: "this isn't supposed to happen LMFAO contact ervin asap",
                    submitted: null
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
                <title>Change Password</title>
                <h1>Executive Committee Elections</h1>
                <h2>Change Password Page</h2>
                <p>Hello! Thank you for making democracy a success!</p>
                <p>You are required to change your password to something new before you vote.</p>
                <p>Enter your old and new passwords below in order to facilitate this change</p>
                <li>
                    <label htmlFor="vid">Enter Voter ID</label>
                    <input id="vid" name="vid" type="email"/>
                </li>
                <li>
                    <label htmlFor="pwo">Enter Password</label>
                    <input id="pwo" name="pwo" type="password"/>
                </li>
                <li>
                    <label htmlFor="pwn">Enter Password</label>
                    <input id="pwn" name="pwn" type="password"/>
                </li>
                <button>Vote!</button>
                {this.state.error != null && <p>{this.state.error}</p>}
                {this.state.submitted != null && <p>{this.state.submitted}</p>}
            </form>
        );
    }
}

export default ChangePw;
