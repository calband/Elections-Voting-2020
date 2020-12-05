import React from 'react';

const Disclaimer = (props) => {
	return (
		<div>
			<title>{props.electionType} Ballot 2020</title>
			<h1>{props.electionType} Ballot 2020</h1>
			<p>Please select each ranking only ONCE.</p>
			<p>Choices must begin with "First Choice" and continue one at a time.</p>
			<p>
				Abstain votes mean that you do not like any candidate past any selected
				choices.
			</p>
		</div>
	);
};

export default Disclaimer;
