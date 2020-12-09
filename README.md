# Elections Voting 2020
React frontend stack with a full serverless AWS backend stack. This voting system was built during the Fall 2020 ExComm 
elections. Because voting in person is a major health hazard due to the pandemic occurring at the time, an online voting
system was necessary in order to facilitate a free and fair democratic election in an online setting. This repo 
represents an attempt to facilitate that election. If you see any bugs, feel free to create a new GitHub issue!

The future goal of this repo is to be merged into Members Only in case PR Comm wants to transition from a pure paper
ballot system to a pure electronic system after the pandemic. Usage of this repo past the Fall 2020 ExComm elections
is up to the discretion of future ExComm.

## Frontend Stack
The frontend stack was first written by 🅱️ames 🅱️arquez (Bass Drum '17, jamesamarquez@berkeley.edu) in pure HTML, CSS, 
and JS. The original HTML and CSS was then modified by brvin 

## Backend Stack
The backend stack was written by 🅱️rvin 🅱️accay (Glock '19, ebaccay@berkeley.edu) using the AWS Serverless Model. All code  in the `lambdas` 
directory is stored on a Lambda function on AWS. The Lambda function invocation is through AWS API Gateway and the 
internal database is AWS' NoSQL database DynamoDB.

There are two different databases in play: the `CalbandUsers` 
database which contains all registered voters within Cal Band and the `Votes` database which contains every single vote.

The `CalbandUsers` database has a primary index of `email` and columns `dm`, `execSec`, `prd`, `pwHash`, and `stud`.
The `email` and `pwHash` columns refer to a registered voter's email and password hash respectively as strings whereas 
all other columns are boolean values that indicate whether or not a registered voter has already voted for that 
position. If the voter has already voted for said position, then _no new vote is registered. A registered voter may only
vote for a position once and all votes casted after are discarded._

The `Votes` database has a primary index of `voteType` and a sort index of `id` with column for `voteRaw` The `voteType`
of a vote is the position that the vote is for (`dm`, `execSec`, `prd` or `stud`). The `id` is there to just distinguish
between unique votes. The `voteRaw` column contains the JSON dictionary ranked voting choice of a voter in string form. 
The `id` column is create by hashing together a registered voter's `email`, `pwHash`, and current
UTC datetime to the nearest millisecond of invocation (based off of Amazon's servers) and then hashed again. The hashing
algorithm is a modified SHA-256 in which only the first 36 bytes are used. This gives 16^36 possible combinations and
the probability of collisions is extremely small. _Going backwards from vote `id` to voter is functionally impossible_ 
due to the intractability of going from hash to input and because _finding the exact millisecond of UTC datetime is 
impossible to retrieve_.

tl;dr: _It is practically impossible to connect a vote to a voter._

## Voting
Send a `POST` request to `https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote/` with the a body payload 
specified below to register a vote!

```json
{
    "voterId": "Remy Ratatouille",
    "pwHash": "canjkasejcjkanjeafn",
    "voteType": "dm"|"execSec"|"prd"|"stud",
    "vote": {
        "Oski Bear": "1",
        "Josie Bruin": "2",
        "stanfurd tree": "A",
        ...
    }
}
```

The `vote` parameter can contain as many candidates that you want. Note that there can be any number of abstain votes 
which are marked by the `"A"` but _all ranked votes must count from 1 to `N`_. If any number is skipped or put twice, 
_the vote will be discarded_.

## Tallying
Send a `GET` request to `https://soqgbubrta.execute-api.us-west-1.amazonaws.com/prod/vote/` with the a query string
parameter `voteType` with the value `dm`, `execSec`, `prd`, `stud`, or `test` in order to tabulate the vote for the position 
specified by `voteType`.

### Built with 💙 by Democracy Comm
Last updated: 12/8/2020

© calband, brv, jamz, fun, and DEMOCRACY #democracy 😤
