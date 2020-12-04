import React, {Component} from 'react';
import axios from 'axios';


class Form extends Component {
  state = {
    voterId: '',
      pwHash: '',
      c1: 'A',
      c2: 'A',
      c3: 'A',
      c4: 'A',
      c5: 'A'
  };

/* This is where the magic happens
*/
handleSubmit = event => {
    event.preventDefault();
    const user = {
      voterId: this.state.voterId,
        pwHash: this.state.pwHash,
        voteType: 'test',
        vote: {
            "Person 1": this.state.c1,
            "Person 2": this.state.c2,
            "Person 3": this.state.c3,
            "Person 4": this.state.c4,
            "Person 5": this.state.c5
        }
    };

    const config = {
        headers: {
            "x-api-key": "CB1pjRpF7S9xAL2Xuchch4LVEGMYDaJo7mMtnNbD"
        }
    };

    console.log({ user });
    console.log(config);

    axios.post('https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote', { user }, config)
      .then(res=>{
        console.log(res);
        console.log(res.data);
        window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      })
  };
handleChange = event =>{
    console.log("handling the change!!");
    console.log(event);
    this.setState({ name: event.target.value});
  };
render() {
    return (<form onSubmit={this.handleSubmit}>
      <li>
          <label htmlFor="c1">Elise Park: </label>
          <select id="c1" name="c1">
              <option value="1">First Choice</option>
              <option value="2">Second Choice</option>
              <option value="3">Third Choice</option>
              <option value="4">Fourth Choice</option>
              <option value="5">Fifth Choice</option>
              <option value="A" selected>Abstain</option>
              onChange= {this.handleChange}
          </select>
      </li>
          <li>
              <label htmlFor="c2">Hannah Chea: </label>
              <select id="c2" name="c2">
                  <option value="1">First Choice</option>
                  <option value="2">Second Choice</option>
                  <option value="3">Third Choice</option>
                  <option value="4">Fourth Choice</option>
                  <option value="5">Fifth Choice</option>
                  <option value="A" selected>Abstain</option>
                  onChange= {this.handleChange}
              </select>
          </li>
              <li>
                  <label htmlFor="c3">Raj Dasani: </label>
                  <select id="c3" name="c3">
                      <option value="1">First Choice</option>
                      <option value="2">Second Choice</option>
                      <option value="3">Third Choice</option>
                      <option value="4">Fourth Choice</option>
                      <option value="5">Fifth Choice</option>
                      <option value="A" selected>Abstain</option>
                      onChange= {this.handleChange}
                  </select>
              </li>
                  <li>
                      <label htmlFor="c4">Raymond Sun: </label>
                      <select id="c4" name="c4">
                          <option value="1">First Choice</option>
                          <option value="2">Second Choice</option>
                          <option value="3">Third Choice</option>
                          <option value="4">Fourth Choice</option>
                          <option value="5">Fifth Choice</option>
                          <option value="A" selected>Abstain</option>
                          onChange= {this.handleChange}
                      </select>
                  </li>
                      <li>
                          <label htmlFor="c5">Yueyi Che: </label>
                          <select id="c5" name="c5">
                              <option value="1">First Choice</option>
                              <option value="2">Second Choice</option>
                              <option value="3">Third Choice</option>
                              <option value="4">Fourth Choice</option>
                              <option value="5">Fifth Choice</option>
                              <option value="A" selected>Abstain</option>
                              onChange= {this.handleChange}
                          </select>
                      </li>
                      <li>
                  <label htmlFor="vid">Enter Voter ID</label>
                    <input id="vid" name="vid" type="email" onChange= {this.handleChange}/>
                                      </li>
                      <li>
                <label htmlFor="pwh">Enter Password</label>
                    <input id="pwh" name="pwh" type="password" onChange= {this.handleChange}/>
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
        <title>Drum Major Voting 2020</title>
      <h1>Cal Band Drum Major Elections 2020</h1>
      <p>Please select each ranking only ONCE or else the toll troll will get upsetti (except for "Abstain" votes):</p>
      <Form/>
      </body>
    );
}

export default App;
