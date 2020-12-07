from datetime import datetime
import json
import boto3
import traceback
import hashlib

ddb = boto3.resource("dynamodb")

voters = ddb.Table("CalbandUsers")
votes = ddb.Table("Votes")

required_params = [
    "voterId",
    "pwHash",
    "voteType",
    "vote"
]

valid_vote_types = {
    "prd": "Public Relations Director",
    "stud": "Student Director",
    "dm": "Drum Major",
    "execSec": "Executive Secretary",
    "test": "Cutest Couple"
}

# CHANGE THIS AS YOU GO ALONG
# This makes sure that there is a valid voting window but change is NOT AUTOMATIC (for now, future hack pls change)
# To enable a voting window, simply remove the position from this set
# REMEMBER TO DISABLE THE VOTING WINDOW LATER
disabled_votes = {
    "prd",
    "stud",
    "dm",
    "execSec"
}


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
    body = json.loads(event["body"])

    # Verify that request is valid
    if not verify_request(body):
        return create_response(400, "Missing parameters required to vote or parameters provided are malformed - vote discarded.")

    # Check if election window is open
    vote_type = body["voteType"]
    if vote_type in disabled_votes:
        return create_response(400, f"The voting period for {valid_vote_types[vote_type]} isn't open :(")

    # Check if user is in database
    registered_voter = voters.get_item(
        Key={"email": body["voterId"]}
    )
    if "Item" not in registered_voter:
        return create_response(400, "Incorrect username or password!")
    registered_voter = registered_voter["Item"]

    # Check if password hashes match
    if registered_voter["pwHash"] != create_hash(body["pwHash"]):
        return create_response(400, "Incorrect username or password!")

    # Check if the voter has changed their password
    if not registered_voter["pwChanged"]:
        return create_response(400, "You haven't changed your password yet! You need to change your password first before you can vote.")

    # Check if user has already voted
    if registered_voter[vote_type]:
        return create_response(200, f"You already voted for {valid_vote_types[vote_type]}!")

    # Check if valid vote
    if not verify_vote(body["vote"]):
        return create_response(400, f"Vote for {valid_vote_types[vote_type]} isn't formatted correctly :( Please fix this and try again.")

    # Register vote!
    register_vote(registered_voter, body["vote"], body["voteType"])
    return create_response(200, "You voted successfully! Thank you for making democracy a SUCCESS")


def verify_request(body):
    for param in required_params:
        if param not in body:
            return False

    if body["voteType"] not in valid_vote_types:
        return False

    return True


def verify_vote(vote_json):
    if not isinstance(vote_json, dict):
        return False

    reverse_vote = []

    for key in vote_json.keys():
        if not isinstance(key, str):
            return False
        val = vote_json[key]
        if isinstance(val, str):
            try:
                reverse_vote.append(int(val))
            except ValueError:
                if val != "A":
                    return False
        else:
            return False

    return sorted(reverse_vote) == list(range(1, len(reverse_vote) + 1))  # Check if there is a pure ranked vote


def register_vote(registered_voter, vote_json, vote_type):
    voters.update_item(
        Key={"email": registered_voter["email"]},
        UpdateExpression=f"SET {vote_type} = :{vote_type}",
        ExpressionAttributeValues={f":{vote_type}": True}
    )

    votes.put_item(
        Item={
            # Double hashing ID and adding datetime to obfuscate away the vote from the voter
            "id": create_hash(create_hash(registered_voter["email"], vote_type, datetime.utcnow())),
            "voteType": vote_type,
            "voteRaw": json.dumps(vote_json)
        }
    )


def create_hash(*args):
    arg_string = "".join([str(arg) for arg in args])
    return hashlib.sha256(arg_string.encode()).hexdigest()[:36]


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
