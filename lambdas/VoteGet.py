from datetime import datetime, timedelta
import json
import boto3
import traceback

ddb = boto3.resource("dynamodb")

votes = ddb.Table("Votes")

required_params = [
    "voteType"
]

valid_vote_types = {
    "prd": "Public Relations Director",
    "stud": "Student Director",
    "dm": "Drum Major",
    "execSec": "Executive Secretary",
    "test": "Test Vote"
}


class Ballot:
    default_vote = "NO WINNER"
    abstain_vote = "A"

    def __init__(self, vote_dict):
        self.candidates = [None for _ in range(len(vote_dict))]
        highest_index = 0
        for candidate in vote_dict.keys():
            val = vote_dict[candidate]
            if val != self.abstain_vote:
                if int(val) > highest_index:
                    highest_index = int(val)
                self.candidates[int(val) - 1] = candidate
        self.candidates = self.candidates[:highest_index]

    def first_choice(self):
        if not self.candidates:
            return self.default_vote
        else:
            return self.candidates[0]

    def eliminate(self, candidate):
        if candidate != self.default_vote:
            try:
                self.candidates.remove(candidate)
            except ValueError:
                pass


class RankedElection:
    required_margin = 0.5
    tied_race = "TIED RACE"

    def __init__(self, raw_ballots):
        self.rounds = 0
        self.margin = None
        self.winner = None
        self.time = None

        self.ballots = []
        for raw_ballot in raw_ballots:
            self.ballots.append(Ballot(raw_ballot))

        self.total = len(raw_ballots)

    def tabulate(self):
        try:
            self.__tabulate__()
        except RecursionError:
            self.margin = int(self.total / 2)
            self.winner = self.tied_race
            self.time = str(datetime.utcnow() - timedelta(hours=8))

    def __tabulate__(self):
        if not self.total:
            return None

        tally = {}
        for ballot in self.ballots:
            candidate = ballot.first_choice()
            try:
                tally[candidate] = tally[candidate] + 1
            except KeyError:
                tally[candidate] = 1

        potential_winner = max(tally.keys(), key=lambda x: tally[x])
        winning_margin = tally[potential_winner] / self.total

        self.rounds += 1

        if winning_margin <= self.required_margin:
            eliminated_candidate = min(tally.keys(), key=lambda x: tally[x])
            self.eliminate(eliminated_candidate)
            return self.tabulate()
        else:
            self.margin = tally[potential_winner]
            self.winner = potential_winner
            self.time = str(datetime.utcnow() - timedelta(hours=8))
            return potential_winner

    def eliminate(self, candidate):
        for ballot in self.ballots:
            ballot.eliminate(candidate)


def lambda_handler(event, context):
    try:
        return main(event, context)
    except:
        print("-----ERROR. TRACEBACK:-----")
        traceback.print_exc()
        print("-------END TRACEBACK-------")
        # return create_response(500, traceback.format_exc())
        return create_response(500, "OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! The gowden beaws at comp comm are working VEWY HAWD to fix this! Owo")


def main(event, context):
    query = event["queryStringParameters"]

    # Verify that request is valid
    if not verify_request(query):
        return create_response(400, "Missing parameters required to vote or parameters provided are invalid - tabulation cancelled.")

    # Grab ALL votes inside the Votes db
    vote_type = query["voteType"]
    cast_votes = [json.loads(item["voteRaw"]) for item in votes.query(
        KeyConditionExpression="voteType = :voteType",
        ExpressionAttributeValues={
            ":voteType": vote_type
        },
        ProjectionExpression="voteRaw"
    )["Items"]]

    # Run Ranked Choice Voting algorithm
    election = RankedElection(cast_votes)
    election.tabulate()

    payload = {
        "winner": election.winner,
        "position": valid_vote_types[query["voteType"]],
        "margin": election.margin,
        "total": election.total,
        "tabulationTime": election.time,
        "numRounds": election.rounds
    }

    return create_response(200, "Tabulation completed!", payload)


def verify_request(body):
    for param in required_params:
        if param not in body:
            return False

    if body["voteType"] not in valid_vote_types:
        return False

    return True


def create_response(status_code, message, body=None):
    if body is None:
        body = {}

    body["message"] = message

    return {
        "statusCode": status_code,
        "isBase64Encoded": False,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body)
    }
