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
    "execSec": "Executive Secretary"
}


def lambda_handler(event, context):
    try:
        return main(event, context)
    except:
        print("-----ERROR. TRACEBACK:-----")
        traceback.print_exc()
        print("-------END TRACEBACK-------")
        return create_response(500, "OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at comp comm are working VEWY HAWD to fix this! Owo")


def main(event, context):
    body = json.loads(event["body"])

    vote_type = body["voteType"]
    if not verify_request(body):
        return create_response(400, "Missing parameters required to vote or parameters provided are malformed - vote discarded.")

    registered_voter = voters.get_item(
        Key={"id": body["voterId"]}
    )

    # Check if user is in database
    if "Item" not in registered_voter:
        return create_response(400, "Voter ID is not registered - vote discarded.")
    registered_voter = registered_voter["Item"]

    # Check if password hashes match
    if registered_voter["pw_hash"] != body["pwHash"]:
        return create_response(400, "Password hashes do not match - vote discarded.")

    # Check if valid vote
    if not verify_vote(body[vote_type]):
        return create_response(400, f"Vote for {valid_vote_types[vote_type]} is malformed - vote discarded.")

    # Check if user has already voted, and if not, register vote
    if not register_vote(registered_voter, body["vote"], body["voteType"]):
        create_response(500, "Voter has already voted for this position - vote discarded.")

    return create_response(200, "Voted successfully! Thank you for making democracy a SUCCESS")


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
        if not isinstance(val, str):
            try:
                reverse_vote.append(int(val))
            except ValueError:
                if val != "A" and val != "a" and val.lower() != "abstain":
                    return False

    return sorted(reverse_vote) == list(range(1, len(reverse_vote) + 1))  # Check if there is a pure ranked vote


def register_vote(registered_voter, vote_json, vote_type):
    if registered_voter[vote_type]:
        return False

    voters.update_item(
        Key={"id": registered_voter["id"]},
        UpdateExpression=f"SET {vote_type} = :{vote_type}",
        ExpressionAttributeValues={f":{vote_type}": True}
    )

    votes.put_item(
        Item={
            # Double hashing ID and adding datetime to obfuscate away the vote from the voter
            "id": create_hash(create_hash(registered_voter["id"], vote_type, datetime.utcnow())),
            "voteType": vote_type,
            "timestamp": str(datetime.utcnow()),
            "vote_raw": json.dumps(vote_json)
        }
    )

    return True


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
