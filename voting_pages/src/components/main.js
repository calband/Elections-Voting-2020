import React from 'react';

class Main extends React.Component {
	render() {
		return (
		    <div>
				<title>Cal Band Voting System</title>
				<h1>Welcome to the Cal Band voting system!</h1>
				<h2>We're glad you're here :)</h2>
				<p>
                    The navigation bar to the left shows you all of the possible ballots that you can
					vote for in addition to a page to change your password.
				</p>
				<p>
					You are required to change your password to something new before you
					can vote. All ballots except for the Test Candidate ballot is only open
                    for a specific time during Banquet.
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
				<hr/>
				<p>
					The voting system used for the Cal Band ExComm elections is called
					<a href="https://en.wikipedia.org/wiki/Instant-runoff_voting"> Instant Runoff Voting</a>.&nbsp;
					Also known as the Alternative Vote, the main difference between traditional&nbsp;
					<a href="https://en.wikipedia.org/wiki/First-past-the-post_voting">First Past the Post</a>&nbsp;
					and this voting method is the ranking of candidates. Peep this&nbsp;
					<a href="https://www.youtube.com/watch?v=3Y3jE3B8HsE">cool video</a>&nbsp;
					by CGP Grey to see this voting method in action.
				</p>
			</div>
		);
	}
}

export default Main;
