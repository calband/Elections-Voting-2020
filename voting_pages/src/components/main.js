import React from 'react';

class Main extends React.Component {
	render() {
		return (
		    <div>
				<title>Cal Band Voting System</title>
				<h1>Welcome to the Cal Band voting system!</h1>
				<h2>We're glad you're here :)</h2>
				<p>
                    The bar to the left shows you all possible ballots that you can vote for
                    in addition to a page to change your password.
				</p>
				<p>
					You are required to change your password to something new before you
					can vote. All ballots except for the Test Candidate ballot is only open
                    for a specific time during banquet.
				</p>
				<p>
					Please vote in the Test Candidate ballot first to get a feel for how
                    voting will take place during elections.
				</p>
                <p>
					After a successful vote, you will NOT be able to change your vote no matter
                    what. Please make sure that you are confident in your vote before you submit
                    your ballot!
				</p>
			</div>
		);
	}
}

export default Main;
