import React from 'react';
// import './App.css';

class MyForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
        "voterId": document.getElementById("vid").value,
        "pwHash": document.getElementById("pwh").value,
        "voteType": "test",
        "vote": {
            "Elise Park": document.getElementById('ep').value,
            "Hannah Chea": document.getElementById('hc').value,
            "Raj Dasani": document.getElementById('rd').value,
            "Raymond Sun": document.getElementById('rs').value,
            "Yueyi Che": document.getElementById('yc').value,
        }
    });

    console.log(data);

    let test = fetch('https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote', {
      method: 'POST',
      body: data,
        headers: {
            'x-api-key': 'CB1pjRpF7S9xAL2Xuchch4LVEGMYDaJo7mMtnNbD', //it can be iPhone or your any other attribute
            'Content-Type': 'application/json'
        }
    });
    console.log((await Promise.resolve(test)).json());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <li>
          <label htmlFor="ep">Elise Park: </label>
          <select id="ep" name="ep">
              <option value="1">First Choice</option>
              <option value="2">Second Choice</option>
              <option value="3">Third Choice</option>
              <option value="4">Fourth Choice</option>
              <option value="5">Fifth Choice</option>
              <option value="A" selected>Abstain</option>
          </select>
      </li>
          <li>
              <label htmlFor="hc">Hannah Chea: </label>
              <select id="hc" name="hc">
                  <option value="1">First Choice</option>
                  <option value="2">Second Choice</option>
                  <option value="3">Third Choice</option>
                  <option value="4">Fourth Choice</option>
                  <option value="5">Fifth Choice</option>
                  <option value="A" selected>Abstain</option>
              </select>
          </li>
              <li>
                  <label htmlFor="rd">Raj Dasani: </label>
                  <select id="rd" name="rd">
                      <option value="1">First Choice</option>
                      <option value="2">Second Choice</option>
                      <option value="3">Third Choice</option>
                      <option value="4">Fourth Choice</option>
                      <option value="5">Fifth Choice</option>
                      <option value="A" selected>Abstain</option>
                  </select>
              </li>
                  <li>
                      <label htmlFor="rs">Raymond Sun: </label>
                      <select id="rs" name="rs">
                          <option value="1">First Choice</option>
                          <option value="2">Second Choice</option>
                          <option value="3">Third Choice</option>
                          <option value="4">Fourth Choice</option>
                          <option value="5">Fifth Choice</option>
                          <option value="A" selected>Abstain</option>
                      </select>
                  </li>
                      <li>
                          <label htmlFor="yc">Yueyi Che: </label>
                          <select id="yc" name="yc">
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
                    <input id="vid" name="vid" type="email" />
                                      </li>
                      <li>
                <label htmlFor="pwh">Enter Password</label>
                    <input id="pwh" name="pwh" type="password" />
                                      </li>
<li>
              <button>Vote!</button></li>
      </form>
    );
  }
}

function App() {
  return (
      <body>
      <title>Test Voting 2020</title>
      <h1>Test Election 2020</h1>
      <p>Please select each ranking only ONCE or else the toll troll will get upsetti (except for "Abstain" votes):</p>
      <MyForm></MyForm>
      </body>
    );
}

export default App;
